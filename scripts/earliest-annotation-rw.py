import os
import sys

import pendulum
import requests

rw_token = os.environ.get("READWISE_TOKEN", False)

if not rw_token:
    print("Please set READWISE_TOKEN")
    sys.exit(1)

book_id = input("Please enter book ID: ")
url = f"https://readwise.io/api/v2/highlights/?book_id={book_id}"
r = requests.get(url, headers={"Authorization": f"Token {rw_token}"})
data = r.json()
count = data.get("count", 0)
earliest_highlight = 0
earliest_text = ""
if count != 0:
    results = data.get("results", [])
    for result in results:
        highlighted_at = result['highlighted_at']
        if earliest_highlight == 0 or earliest_highlight > highlighted_at:
            earliest_highlight = highlighted_at
            earliest_text = result['text']
    earliest_date = pendulum.parse(earliest_highlight, tz="Pacific/Auckland").to_date_string()
    print(f"{earliest_date}: {earliest_text}")
