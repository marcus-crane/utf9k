import json
import os

import requests

from common import CUR_DIR

TOKEN = os.getenv("ANILIST_TOKEN")

DATA_FILE = "data/manga.json"

manga = []

query = """query {
  MediaListCollection(userName: "utf9k", type: MANGA, status: CURRENT) {
    lists {
      entries {
        progress
        media {
          title {
            userPreferred
          }
          chapters
          coverImage {
            extraLarge
          }
        }
      }
    }
  }
}"""

r = requests.post("https://graphql.anilist.co", json={'query': query})
results = r.json()['data']['MediaListCollection']['lists'][0]['entries']

for result in results:
    manga.append({
        'progress': result['progress'],
        'title': result['media']['title']['userPreferred'],
        'chapters': result['media']['chapters'],
        'cover': result['media']['coverImage']['extraLarge']
    })

with open('data/manga.json', 'w') as file:
    json.dump(manga, file, indent=2)

print("~ Manga synced locally")