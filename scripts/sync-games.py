import requests

from pprint import pprint

url = "https://howlongtobeat.com/api/user/495/games/list"

payload = {
    "user_id": 495,
    "lists": ["playing", "backlog", "custom", "completed"],
    "set_playstyle": "comp_all",
    "name": "",
    "platform": "",
    "storefront": "",
    "sortBy": "",
    "sortFlip": 0,
    "view": "",
    "random": 0,
    "limit": 1000,
    "currentUserHome": True
}
headers = {
    "content-type": "application/json",
    "user-agent": "utf9k Personal Game Sync <https://github.com/marcus-crane/utf9k>"
}

r = requests.post(url, json=payload, headers=headers)
data = r.json()

pprint(data)