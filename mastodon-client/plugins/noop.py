from typing import List

from mastodon.utility import AttribAccessDict


def block_all(unfiltered: List[AttribAccessDict]) -> List[AttribAccessDict]:
    inserted: AttribAccessDict = {
        "content": "All posts have been blocked",
        "in_reply_to_id": None,
        "in_reply_to_account_id": None,
        "reblog": None,
        "account": {},
    }
    return [AttribAccessDict(inserted)]
