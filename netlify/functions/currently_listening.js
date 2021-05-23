const fetch = require("node-fetch")
const { URLSearchParams } = require("url")

const REFRESH_ENDPOINT = "https://accounts.spotify.com/api/token"
const PLAYER_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing?market=NZ&additional_types=episode"
const USER_AGENT = "Now Playing/1.0 (utf9k.net)"

exports.handler = async function(event, context) {
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN
  const refreshAuthHeader = process.env.SPOTIFY_REFRESH_BASIC_AUTH

  const params = new URLSearchParams()
  params.append("grant_type", "refresh_token")
  params.append("refresh_token", refreshToken)

  const refreshHeaders = {
    "Authorization": `Basic ${refreshAuthHeader}`,
    "Content-Type": "application/x-www-form-urlencoded",
    "User-Agent": USER_AGENT
  }

  try {
    const tokenResponse = await fetch(REFRESH_ENDPOINT, { method: 'POST', body: params, headers: refreshHeaders })
    const tokenData = await tokenResponse.json()

    if (!Object.keys(tokenData).includes("access_token")) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Access token not found?!" })
      }
    }

    const playerHeaders = {
      "Authorization": `Bearer ${tokenData.access_token}`,
      "User-Agent": USER_AGENT
    }

    const playerResponse = await fetch(PLAYER_ENDPOINT, { headers: playerHeaders })

    if (playerResponse.status == 204) {
      return {
        statusCode: 204,
        body: JSON.stringify({})
      }
    }

    const playerData = await playerResponse.json()

    return {
      statusCode: 200,
      body: JSON.stringify(playerData)
    }
  } catch(error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    }
  }
}
