from os.path import dirname
from os import makedirs

from bs4 import BeautifulSoup
import requests
from urllib.parse import urlparse, urljoin

visited_urls = set()


def download_html(url):
    response = requests.get(url)
    html = response.text
    path = urlparse(url).path
    disk_path = f'out/site/andersonfamilyrecipes/{path.replace("/site/andersonfamilyrecipes/", "")}.html'
    dir = dirname(disk_path)
    makedirs(dir, exist_ok=True)
    with open(disk_path, "w") as f:
        f.write(html)
    return html


def extract_links(html):
    soup = BeautifulSoup(html, "html.parser")
    links = set()
    for link in soup.find_all("a"):
        href = link.get("href")
        if href is not None:
            links.add(href)
    return links


def download_site(url, path_prefix=None):
    if path_prefix and path_prefix not in url:
        print(f"{url} does not start with {path_prefix}. Skipping")
        return
    try:
        print(f"Downloading {url}...")
        html = download_html(url)
    except Exception as e:
        print(f"Error getting {url}: {e}...")
        print("Skipping")
        return
    visited_urls.add(url)
    links = extract_links(html)
    for link in links:
        if urlparse(link).netloc == "":
            link = urljoin(url, link)
        if link not in visited_urls:
            download_site(link, path_prefix=path_prefix)


if __name__ == "__main__":
    base_url = "https://sites.google.com/site/andersonfamilyrecipes"
    starting_url = f"{base_url}/Home"
    download_site(starting_url, path_prefix=base_url)
