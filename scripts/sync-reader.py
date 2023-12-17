import os

from ruamel.yaml import YAML
import requests

def represent_none(self, data):
    return self.represent_scalar(u'tag:yaml.org,2002:null', u'null')

yaml = YAML()
yaml.default_flow_style = False
yaml.width = 4096 # avoid line wrap
yaml.representer.add_representer(type(None), represent_none)

READWISE_TOKEN = os.getenv("READWISE_TOKEN")

if not READWISE_TOKEN:
    print("READWISE_TOKEN missing")
    exit(1)

DATA_FILE = "src/data/books.yml"

READER_STATE_URL = "https://readwise.io/api/v3/list/"

def get_reading_progress(id):
    url = f"{READER_STATE_URL}?id={id}"
    r = requests.get(url, headers={'Authorization': f"Token {READWISE_TOKEN}", "User-Agent": "Reader Book Progress Sync <github.com/marcus-crane/utf9k>"})
    if not r.ok:
        print(f"Got status code {r.status_code} from Readwise")
        exit(1)
    resp = r.json()
    print(resp)
    if resp['count'] == 1:
        return resp['results'][0].get('reading_progress', False)
    return False

with open("src/data//books.yml", "r") as file:
    data = yaml.load(file.read())

current_year = data[0]['books']

queryable_books = []

for idx, book in enumerate(current_year):
    if 'reader_id' in book.keys() and book['date_finished'] is None:
        queryable_books.append((idx, book['reader_id']))

if len(queryable_books) == 0:
    print("No books to update")
    exit(0)

for book in queryable_books:
    idx = book[0]
    rid = book[1]
    progress = get_reading_progress(rid)
    if progress:
        fmt_progress = int(progress * 100)
        if data[0]['books'][idx]['progress'] != 100:
            data[0]['books'][idx]['progress'] = fmt_progress
        print(f"Updated progress for {data[0]['books'][idx]['title']}")
    else:
        print('no progress')

with open("src/data/books.yml", "w") as file:
    yaml.dump(data, file)