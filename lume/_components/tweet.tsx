import * as queryString from "https://deno.land/x/querystring@v1.0.2/mod.js";

export default async ({ user, id }) => {
    const tweetUrl = `https://twitter.com/${user}/status/${id}`
    const url = `https://publish.twitter.com/oembed?${queryString.stringify({ url: tweetUrl })}`
    const resp = await fetch(url)
    const body = await resp.json()
    return body.html
}