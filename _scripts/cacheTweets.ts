import { join } from "https://deno.land/std@0.208.0/path/mod.ts";

const tweetCachePath = join(new URL('.', import.meta.url).pathname, '../_data/tweets.json')

const tweets = [
    "https://twitter.com/bepsays/status/1408348824083615745",
    "https://twitter.com/jack/status/1367460921937817602",
    "https://twitter.com/plexamp/status/1489024846033915908",
    "https://twitter.com/plexamp/status/1491494752327372801",
    "https://twitter.com/sentreh/status/1436092048914796545",
    "https://twitter.com/TwitterEng/status/1437857022444138496"
];

const tweetCache: Record<string, object> = {};

for (const tweet of tweets) {
    const resp = await fetch(`https://publish.twitter.com/oembed?url=${tweet}`);
    const data = await resp.json()
    const cacheKey = tweet.replace("https://twitter.com/", "").replace("status/", "")
    tweetCache[cacheKey] = data
}

try {
    Deno.writeTextFileSync(tweetCachePath, JSON.stringify(tweetCache))
} catch (e) {
    console.log(`Failed to generate tweet cache: ${e.message}`)
}

export { };
