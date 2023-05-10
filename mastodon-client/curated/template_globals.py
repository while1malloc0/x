from typing import Any

from . import app, mastodon


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
