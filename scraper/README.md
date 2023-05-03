# scraper.py

A web scraper mostly written by ChatGPT.

The purpose of this scraper is to scrape a particular site and all pages in it for archive purposes.

## Requirements

- Python3 (written with Python 3.10.8)

## Quickstart

1. Create a new virtual environment: `python3 -m virtualenv venv`
1. Install dependencies: `pip install -r requirements.txt`
1. Run `python scraper.py`
1. Go make some coffee, a sandwich, whatever you're in the mood for (it's a naive single threaded scraper, it takes a while)
1. Once it finishes, the `out` directory should contain all of the HTML files

To serve:

1. Switch to the `out` directory: `cd out`
1. Start an HTTP server `python3 -m http.server`
1. Navigate to `http://localhost:8000/site/andersonfamilyrecipes/Home.html`

> Note: the Python HTTP server does not automatically add .html to paths, so you'll have to add that yourself most of the time.