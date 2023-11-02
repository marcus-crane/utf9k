import { resolve } from "path"

const file = Bun.file(resolve(import.meta.dir + '/../data/manga.json'))
const token = process.env.TOKEN

type Manga = {
  Author: string;
  Chapters: number | null;
  Color: string;
  Cover: string;
  Progress: number;
  Status: string;
  Title: string;
  URL: string;
};

type RequestBody = {
  MediaListCollection: MediaListCollection;
};

type MediaListCollection = {
  lists: [List];
}

type List = {
  entries: Manga[];
}

const response = await fetch("https://graphql.anilist.co", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    query: `
      query {
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
      }
    `
  })
})

const data: RequestBody = await response.json();

const results = data.MediaListCollection.lists[0].entries

const manga = []Manga