import os

from flask import Flask
from mastodon import Mastodon

from .models import db


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

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
db.init_app(app)
