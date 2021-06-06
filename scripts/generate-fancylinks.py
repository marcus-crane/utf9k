import json
import os
from pathlib import Path
import re

from bs4 import BeautifulSoup
import requests

CUR_DIR = os.path.dirname(os.path.realpath(__file__))

DATA_FILE = f"{CUR_DIR}/../data/fancylinks.json"
CONTENT_FILES = f"{CUR_DIR}/../content"
FANCYLINK_SHORTCODE = "{% previewlink"
SHORTCODE_REGEX = r"{{% previewlink ?(.*?) ?%}}(https?:\/\/.*){{% \/previewlink %}}"

def main():
    markdown_files = walk_content_folder(CONTENT_FILES, ".md")
    files_with_shortcodes = []
    links_to_scan = []
    link_metadata = {}
    for file in markdown_files:
        if check_for_preview_links(file):
            files_with_shortcodes.append(file)
    for file in files_with_shortcodes:
        links_found = get_link_instances(file)
        links_to_scan.extend(links_found)
    for link in links_to_scan:
        meta = get_link_metadata(link)
        link_metadata[link] = meta
    with open(DATA_FILE, 'w') as link_file:
        meta_content = json.dumps(link_metadata, sort_keys=True, indent=2)
        link_file.write(meta_content)

def walk_content_folder(path: str, ext: str):
    matches = set()
    for dir, _, files in os.walk(path):
        for file in files:
            if Path(file).suffix == ext:
                file_path = str(Path(dir, file))
                matches.add(file_path)
    return matches

def check_for_preview_links(file_path:str):
    with open(file_path, 'r') as file:
        contents = file.read()
        if FANCYLINK_SHORTCODE in contents:
            return True
        return False

def get_link_instances(file_path):
    links = []
    with open(file_path, 'r') as file:
        contents = file.read()
        r = re.findall(SHORTCODE_REGEX, contents)
        for match in r:
            links.append(match[1])
    return links

def get_link_metadata(url):
    headers = {"User-Agent": "utf9k.net (crawler@utf9k.net)"}
    try:
        r = requests.get(url, headers=headers)
        soup = BeautifulSoup(r.text, 'html.parser')
        opengraph = get_open_graph_metadata(soup)
        if opengraph['description'] is None:
            meta_desc = soup.find("meta", {"name": "description"})
            if meta_desc is not None:
                opengraph['description'] = meta_desc.attrs.get('content')
        if opengraph['title'] is None:
            opengraph['title'] = soup.head.title.text
        if opengraph['favicon_url'] is not None and 'http://' in opengraph['favicon_url']:
            upgraded_favicon_url = opengraph['favicon_url'].replace('http://', 'https://')
            if requests.get(upgraded_favicon_url, headers=headers).ok:
                opengraph['favicon_url'] = upgraded_favicon_url
        if opengraph['favicon_url'] is None:
            r = requests.get(f"{url}/favicon.ico", headers=headers)
            if r.ok:
                opengraph['favicon_url'] = f"{url}/favicon.ico"
        return opengraph
    except Exception as ex:
        print(ex)
        return {
            "description": None,
            "title": None,
            "favicon_url": None
        }

def get_open_graph_metadata(soup):
    description = soup.head.find(property="og:description")
    if description is not None:
        description = description.attrs.get("content", None)
    title = soup.head.find(property="og:title")
    if title is not None:
        title = title.attrs.get("content", None)
    image = soup.head.find(property="og:image")
    if image is not None:
        image = image.attrs.get("content", None)
    return {
        "description": description,
        "title": title,
        "favicon_url": image
    }

def extract_links_from_shortcode(file: str):
    return True

def build_link_entry(domain: str, **kwargs):
    return { domain: kwargs }

main()
