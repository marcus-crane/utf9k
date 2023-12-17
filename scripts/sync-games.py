from ruamel.yaml import YAML

import requests
from PIL import ImageFile

def represent_none(self, data):
    return self.represent_scalar(u'tag:yaml.org,2002:null', u'null')

yaml = YAML()
yaml.default_flow_style = False
yaml.width = 4096 # avoid line wrap
yaml.representer.add_representer(type(None), represent_none)

DATA_FILE = "src/data/games.yml"

url = "https://howlongtobeat.com/api/user/495/games/list"

payload = {
    "user_id": 495,
    "lists": ["playing", "backlog", "custom", "completed", "retired"],
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

lists = [
    {
        'list': 'Playing',
        'games': []
    },
    {
        'list': 'Stalled',
        'games': []
    },
    {
        'list': 'Completed',
        'games': []
    },
    {
        'list': 'Backlog',
        'games': [],
    },
    {
        'list': 'Retired',
        'games': []
    }
]

games = data['data']['gamesList']

for game in games:
    idx = 2
    if game['list_playing']:
        idx = 0
    if game['list_backlog']:
        idx = 3
    if game['list_custom']:
        idx = 1
    if game['list_retired']:
        idx = 4
    cover_url = f"https://howlongtobeat.com/games/{game['game_image']}"
    headers = {'Range': 'bytes=0-2000000', **headers}
    r = requests.get(cover_url, stream=True, headers=headers)

    p = ImageFile.Parser()
    p.feed(r.content)
    width, height = p.image.size

    lists[idx]['games'].append({
        'id': game['id'],
        'title': game['custom_title'],
        'link': f"https://howlongtobeat.com/game/{game['game_id']}",
        'platform': game['platform'],
        'cover': cover_url,
        'cover_width': width,
        'cover_height': height,
        'replay': True if game['play_count'] > 1 else False,
        'notes': game['play_notes'],
        'updated': game['date_updated'],
        'completed': game['date_complete']
    })

lists[0]['games'] = sorted(lists[0]['games'], key=lambda x: x['updated'], reverse=True)
lists[1]['games'] = sorted(lists[1]['games'], key=lambda x: x['updated'], reverse=True)
lists[2]['games'] = sorted(lists[2]['games'], key=lambda x: x['completed'], reverse=True)
lists[3]['games'] = sorted(lists[3]['games'], key=lambda x: x['updated'], reverse=True)
lists[4]['games'] = sorted(lists[4]['games'], key=lambda x: x['updated'], reverse=True)

with open("src/data/games.yml", "w") as file:
    yaml.dump(lists, file)

print("~ Games synced locally")