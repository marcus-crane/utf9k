import json
import os

import requests

from common import CUR_DIR

TOKEN = os.getenv("ANILIST_TOKEN")

DATA_FILE = "_data/manga.json"

manga = []

# There is no guarantee that the first staff member is the mangaka but we assume this for now
# If needed in future, we can assert staff.nodes[0].primaryOccupations[0] == "Mangaka"
query = """query {
  MediaListCollection(userName: "utf9k", type: MANGA, status: CURRENT) {
    lists {
      entries {
        progress
        media {
          title {
            userPreferred
          }
          siteUrl
          chapters
          status
          coverImage {
            extraLarge
            color
          }
          staff(page: 1, perPage: 1) {
						nodes {
							name {
								full
							}
						}
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
        'cover': result['media']['coverImage']['extraLarge'],
        'color': result['media']['coverImage']['color'],
        'status': result['media']['status'],
        'url': result['media']['siteUrl'],
        'author': result['media']['staff']['nodes'][0]['name']['full']
    })

manga = sorted(manga, key=lambda x: x['title'])

with open('_data/manga.json', 'w') as file:
    json.dump(manga, file, indent=2, sort_keys=True)

print("~ Manga synced locally")