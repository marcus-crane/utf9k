const API_ENDPOINT = "https://api.trakt.tv/users/sentry/watching"

exports.handler = async function(event, context) {
  const clientID = process.env.CLIENT_ID

  headers = {
    "Content-Type": "application/json",
    "trakt-api-version": 2,
    "trakt-api-key": clientID
  }

  let response
  try {
    response = await fetch(API_ENDPOINT, headers=headers)
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({
        error: err.message
      })
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      data: response
    })
  }
}
