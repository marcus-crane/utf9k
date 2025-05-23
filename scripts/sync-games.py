from urllib.parse import urljoin

from bs4 import BeautifulSoup
import requests
from ruamel.yaml import YAML

def represent_none(self, data):
    return self.represent_scalar(u'tag:yaml.org,2002:null', u'null')

yaml = YAML()
yaml.default_flow_style = False
yaml.width = 4096 # avoid line wrap
yaml.representer.add_representer(type(None), represent_none)

PLAYING_URL = "https://www.backloggd.com/u/utf9k/playing/"
COMPLETED_URL = "https://www.backloggd.com/u/utf9k/games/added/type:played;game_status:completed/"
SHELVED_URL = "https://www.backloggd.com/u/utf9k/games/added/type:played;game_status:shelved/"
BACKLOGGED_URL = "https://www.backloggd.com/u/utf9k/games/added/type:backlog/"

headers = {
    "User-Agent": "utf9k Personal Game Sync <https://github.com/marcus-crane/utf9k>"
}

lists = [
    {
        'list': 'Playing',
        'games': []
    },
    {
        'list': 'Backlog',
        'games': [],
    },
    {
        'list': 'Completed',
        'games': []
    },
    {
        'list': 'Shelved',
        'games': []
    },
]

def _iterate_list_page(url, list_idx, page=1):
    page_url = f"{url}?page={page}"
    r = requests.get(page_url, headers=headers)
    soup = BeautifulSoup(r.text, 'html.parser')
    games = soup.find(id="game-lists").find_all("div", {"class": "card"})
    print(page_url)
    for game in games:

        _id = int(game.attrs['game_id'])
        title = game.find('div', {"class": "game-text-centered"}).text.strip()
        link = game.find('a', {"class": "cover-link"}).attrs.get('href')
        image = game.find('img').get('src').replace('cover_big', '720p')

        lists[list_idx]['games'].append({
            'id': _id,
            'title': title,
            'link': urljoin('https://www.backloggd.com', link),
            'cover': {
                'url': image,
                'width': 720,
                'height': 540
            },
        })

    has_next_page = len(soup.select('span.next.disabled')) == 0
    if has_next_page:
        _iterate_list_page(url, list_idx, page=page+1)

_iterate_list_page(PLAYING_URL, 0)
_iterate_list_page(BACKLOGGED_URL, 1)
_iterate_list_page(COMPLETED_URL, 2)
_iterate_list_page(SHELVED_URL, 3)

with open("_data/games.yml", "w") as file:
    yaml.dump(lists, file)

print("~ Games synced locally")