from logging import info as log_info
from typing import List, Union, Any

from flask import render_template, request, redirect
from werkzeug.wrappers import Response

from . import app, mastodon


running_timeline: List[Any] = []


@app.route("/timeline")
def timeline() -> str:
    global running_timeline
    last_checked = running_timeline[0] if len(running_timeline) > 0 else None
    tl = mastodon.timeline_home(since_id=last_checked)
    # plugins = db.session.execute(db.select(Plugin.))
    # for plugin in Plugins.instance():
    #     tl = plugin(tl)
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


@app.get("/settings")
def settings() -> str:
    return render_template("settings.html")


@app.route("/")
def index() -> Response:
    return redirect("/timeline", code=302)
