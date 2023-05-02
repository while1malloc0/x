import os
from typing import Union, List, Any
from logging import info as log_info

from dotenv import load_dotenv
from flask import Flask, redirect, render_template, request
from mastodon import Mastodon
from werkzeug.wrappers import Response

load_dotenv()

app = Flask(__name__)

mastodon = Mastodon(
    client_id=os.environ["MASTODON_CLIENT_ID"],
    client_secret=os.environ["MASTODON_CLIENT_SECRET"],
    api_base_url="https://hachyderm.io",
)
mastodon.log_in(
    "johnturner@me.com",
    os.environ["MASTODON_PASSWORD"],
    scopes=["read", "write:statuses", "write:favourites", "write:bookmarks"],
)

running_timeline: List[Any] = []


@app.route("/timeline")
def timeline() -> str:
    global running_timeline
    last_checked = running_timeline[0] if len(running_timeline) > 0 else None
    tl = mastodon.timeline_home(since_id=last_checked)
    running_timeline = tl + running_timeline
    return render_template("timeline.html", toots=running_timeline)


@app.post("/reply/<post_id>")
def reply_to_post(post_id) -> Union[str, Response]:
    original = mastodon.status(post_id)
    reply_text = request.form["content"]
    replied = mastodon.status_reply(original, reply_text)
    log_info(replied)
    if request.headers.get("Hx-Request", None):
        return '<div id="reply-modal"></div>'
    return redirect("/timeline")


@app.post("/posts")
def post_to_mastodon() -> Response:
    content = request.form["content"]
    mastodon.status_post(content)
    return redirect("/timeline")


@app.post("/reblog/<post_id>")
def reblog_post(post_id) -> Union[str, Response]:
    status = mastodon.status_reblog(post_id)
    log_info(status)
    if request.headers.get("Hx-Request", None):
        return "<button disabled>Reblogged</button>"
    return redirect("/timeline")


@app.post("/favorite/<post_id>")
def favorite_post(post_id) -> Union[str, Response]:
    status = mastodon.status_favourite(post_id)
    log_info(status)
    if request.headers.get("Hx-Request", None):
        return "<button disabled>Favorited</button>"
    return redirect("/timeline")


@app.post("/bookmark/<post_id>")
def bookmark_post(post_id) -> Union[str, Response]:
    status = mastodon.status_bookmark(post_id)
    log_info(status)
    if request.headers.get("Hx-Request", None):
        return "<button disabled>Bookmarked</button>"
    return redirect("/timeline")


@app.template_global("get_content")
def get_content(toot) -> str:
    if toot.reblog is not None:
        return toot.reblog.content
    return toot.content


@app.template_global("is_reply")
def is_reply(toot) -> bool:
    return toot.in_reply_to_id is not None


@app.template_global("is_reblog")
def is_reblog(toot) -> bool:
    return toot.reblog is not None


@app.template_global("get_in_reply_to")
def get_in_reply_to(toot) -> Any:
    original_author_id = toot.in_reply_to_account_id
    original_author = mastodon.account(original_author_id)
    return original_author.display_name


@app.route("/")
def index() -> Response:
    return redirect("/timeline", code=302)
