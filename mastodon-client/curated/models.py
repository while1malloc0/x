from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class PluginMetadata(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    namespace = db.Column(db.String)
    name = db.Column(db.String)
    description = db.Column(db.Text)
    type = db.Column(db.String)

    __table_args__ = (db.Index("unique_ns_and_name", namespace, name, unique=True),)
