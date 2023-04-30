import os
from typing import Any, Optional

from dotenv import load_dotenv
from flask import Flask, redirect, render_template
from mastodon import Mastodon

load_dotenv()

app = Flask(__name__)

mastodon = Mastodon(
    client_id=os.environ["MASTODON_CLIENT_ID"],
    client_secret=os.environ["MASTODON_CLIENT_SECRET"],
    api_base_url="https://hachyderm.io",
)
mastodon.log_in("johnturner@me.com", os.environ["MASTODON_PASSWORD"], scopes=["read"])

running_timeline = []


@app.route("/timeline")
def timeline() -> str:
    global running_timeline
    last_checked = running_timeline[0] if len(running_timeline) > 0 else None
    tl = mastodon.timeline_home(since_id=last_checked)
    running_timeline = tl + running_timeline
    return render_template("timeline.html", toots=running_timeline)


@app.template_global("get_content")
def get_content(toot) -> str:
    if toot.reblog is not None:
        return toot.reblog.content
    return toot.content


@app.template_global("is_reply")
def is_reply(toot):
    return toot.in_reply_to_id is not None


@app.template_global("get_in_reply_to")
def get_in_reply_to(toot):
    original_author_id = toot.in_reply_to_account_id
    original_author = mastodon.account(original_author_id)
    return original_author.display_name


@app.route("/")
def index() -> Any:
    return redirect("/timeline", code=302)
