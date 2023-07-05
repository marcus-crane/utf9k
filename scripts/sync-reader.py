import os

from ruamel.yaml import YAML
import requests

def represent_none(self, data):
    return self.represent_scalar(u'tag:yaml.org,2002:null', u'null')

yaml = YAML()
yaml.default_flow_style = False
yaml.width = 4096 # avoid line wrap
yaml.representer.add_representer(type(None), represent_none)

RWSESSIONID = os.getenv("RWSESSIONID")

if not RWSESSIONID:
    print("rwsessionid missing")
    exit(1)

DATA_FILE = "data/books.yml"

# This could be cut right down with timestamp querying but I'm being lazy for now
READER_STATE_URL = "https://readwise.io/reader/api/state/?schemaVersion=6"

r = requests.get(READER_STATE_URL, headers={'Cookie': f"rwsessionid=7yllllti3oq9s9pzjlwkg2zgjv8k6dce", "User-Agent": "Reader Book Progress Sync <github.com/marcus-crane/utf9k>"})
if not r.ok:
    print(f"Got status code {r.status_code} from Readwise")
    exit(1)
state = r.json()

with open("data/books.yml", "r") as file:
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
    if state['documents'].get(rid, {}).get('readingPosition', {}).get('scrollDepth', False):
        progress = state['documents'][rid]['readingPosition']['scrollDepth']
        fmt_progress = int(progress * 100)
        if data[0]['books'][idx]['progress'] != 100:
            data[0]['books'][idx]['progress'] = fmt_progress
        print(f"Updated progress for {data[0]['books'][idx]['title']}")

with open("data/books.yml", "w") as file:
    yaml.dump(data, file)