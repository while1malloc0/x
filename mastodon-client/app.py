from curated import app
from curated.models import db

if __name__ == "__main__":
    db.create_all()
    app.run(debug=True)
