import json
import re
import os

import requests

from common import CUR_DIR

DATA_FILE = "_data/links.json"
DATA_FILE_NO_HEADERS = "_data/links-noheaders.json"
STATIC_SITE = f"{CUR_DIR}/../content"
URL_RE = r"((?<=[^a-zA-Z0-9])(?:https?\:\/\/|[a-zA-Z0-9]{1,}\.{1}|\b)(?:\w{1,}\.{1}){1,5}(?:com|org|edu|gov|uk|net|ca|de|jp|fr|au|us|ru|ch|it|nl|se|no|es|mil|iq|io|ac|ly|sm|nz|ai){1}(?:\/[a-zA-Z0-9-_.]{1,})*)"
include = set(['js', 'content', '_includes'])

LINKS = {}
LINKS_NO_HEADERS = {}

for folder in include:
    for root, dirs, files in os.walk(folder, topdown=True):
        path = root.split(os.sep)
        for entry in files:
            full_path = f"{'/'.join(path)}/{entry}"
            try:
                with open(full_path, 'r') as file:
                    data = file.read()
            except UnicodeDecodeError as Exception:
                print(f"Skipping {full_path} which is probably a binary file like an image or PDF")
                continue
            matches = re.finditer(URL_RE, data, re.MULTILINE)
            for num, match in enumerate(matches, start=1):
                url = match.group()
                if url in LINKS.keys():
                    LINKS[url]['sources'].append(full_path)
                    LINKS[url]['sources'].sort()
                    LINKS_NO_HEADERS[url]['sources'].append(full_path)
                    LINKS_NO_HEADERS[url]['sources'].sort()
                    continue
                if 'http' not in url or 'utf9k' in url:
                    # don't scan my own subdomains plus check that something seems URLish
                    continue
                results = {
                    'sources': [full_path],
                    'url': url
                }
                results_no_headers = {
                    'sources': [full_path],
                    'url': url
                }
                try:
                    r = requests.get(url, headers={'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) WebKit/8610 (KHTML, like Gecko) Mobile/18C66 [FBAN/FBIOS;FBDV/iPhone13,4;FBMD/iPhone;FBSN/iOS;FBSV/14.3;FBSS/3;FBID/phone;FBLC/en_US;FBOP/5]'})
                    results['alive'] = r.ok
                    results_no_headers['alive'] = r.ok
                    results['status'] = r.status_code
                    results_no_headers['status'] = r.status_code
                    results['headers'] = dict(r.headers)
                except requests.exceptions.ConnectionError as Exception:
                    results['alive'] = False
                    results_no_headers['alive'] = False
                    results['status'] = 000
                    results_no_headers['alive'] = 000
                    results['headers'] = {}
                LINKS[url] = results
                LINKS_NO_HEADERS[url] = results_no_headers
                
                print(f"{url} at {full_path}")

with open(DATA_FILE, 'w') as file:
    json.dump(LINKS, file, indent=2, sort_keys=True)

with open(DATA_FILE_NO_HEADERS, 'w') as file:
    json.dump(LINKS_NO_HEADERS, file, indent=2, sort_keys=True)

print("~ URLs validated")
