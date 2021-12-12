const livePlayer = document.querySelector("#liveplayer")

const action = document.querySelector("#action")
const cover = document.querySelector("#cover")
const category = document.querySelector("#category")
const source = document.querySelector("#source")
const title = document.querySelector("#title")
const synopsis = document.querySelector("#synopsis")
const elapsed = document.querySelector("#elapsed")
const duration = document.querySelector("#duration")
const progressBar = document.querySelector("#progress")
const playback = document.querySelector("#playback")

const gamingColor = "#003087"
const gamingVerb = "Currently playing 🕹"

const spotifyColor = "#1DB954"
const spotifyVerb = "Currently listening 🎧"

const traktColor = "#C47828"
const traktVerb = "Currently watching 📺"


function queryGames() {
  return new Promise((resolve, reject) => {
    fetch("https://gunslinger.utf9k.net/api/v1/videogames")
      .then(res => res.json())
      .then(games => {
        const data = games.data
        if (!data || !data.title) return resolve("I'm not currently playing anything.")
        return resolve({ "provider": "gaming", data })
      })
      .catch(err => reject(err))
  })
}

function querySpotify() {
  return new Promise((resolve, reject) => {
    fetch("https://gunslinger.utf9k.net/api/v1/audio")
      .then(res => res.json())
      .then(audio => {
        const data = audio.data
        if (!data || !data.is_playing) return resolve("I'm not currently listening to anything.")
        return resolve({ "provider": "spotify", data })
      })
      .catch(err => reject(err))
  })
}

function queryTrakt() {
  return new Promise((resolve, reject) => {
    fetch("https://gunslinger.utf9k.net/api/v1/media")
      .then(res => res.json())
      .then(media => {
        const data = media.data
        if (data.type === "") return resolve("I'm not currently watching anything.")
        return resolve({ "provider": "trakt", data })
      })
      .catch(err => reject(err))
  })
}

function refreshData() {
  Promise.all([queryGames(), querySpotify(), queryTrakt()])
    .then(values => {
      for (let value of values) {
        console.log(value)
        if (typeof(value) === "string") continue
        switch(value.provider) {
        case "gaming":
          return renderGamingData(value.data)
        case "spotify":
          return renderSpotifyData(value.data)
        case "trakt":
          return renderTraktData(value.data)
        default:
          return
        }
      }
    })
}

refreshData()

// Adapted from https://stackoverflow.com/questions/21294302/converting-milliseconds-to-minutes-and-seconds-with-javascript
function formatMsToHumanTimestamp(ms) {
  const minutes = Math.floor(ms / 60000)
  const seconds = ((ms % 60000) / 1000).toFixed(0)
  return (
    seconds == 60 ?
      (minutes + 1) + ":00" :
      minutes + ":" + (seconds < 10 ? "0" : "") + seconds
  )
}

function renderGamingData(data) {
  livePlayer.className = "transition-opacity duration-1000"
  progressBar.className += " hidden"
  playback.className += " hidden"
  synopsis.className += " hidden"
  category.className = "hidden"
  source.className = "hidden"
  action.innerText = gamingVerb

  title.innerText = data.title

  cover.src = data.cover.image_url
  cover.width = data.cover.width
  cover.className += " w-48 sm:w-36"

  livePlayer.style.opacity = 1
}

function renderSpotifyData(data) {
  action.innerText = spotifyVerb

  const listeningType = data.currently_playing_type
  const currentDuration = data.item.duration_ms
  let firstPaintComplete = false
  let category_type = null

  if (listeningType === "episode") {
    source.innerText = data.item.show.name
  } else {
    source.innerText = data.item.album.artists[0].name
  }

  let progression = data.progress_ms

  title.innerText = data.item.name

  elapsed.innerText = formatMsToHumanTimestamp(progression)

  duration.innerText = formatMsToHumanTimestamp(currentDuration)

  if (listeningType === "episode") {
    category_type = data.item.show
  } else {
    category_type = data.item.album
  }

  cover.src = category_type.images[0].url
  cover.height = 96
  cover.width = 96

  livePlayer.style.opacity = 1

  // Time is linear so we just pretend the track keeps playing and refresh one second after the end, only to rinse and repeat
  const interval = setInterval(function() {
    if (progression >= currentDuration) {
      clearInterval(interval)
      progression = currentDuration
      console.log("The track should have finished. Refreshing shortly!")
      setTimeout(function() {
        // API should have refreshed after 1 second
        return refreshData()
      }, 1500)
      return
    }
    if (progression <= currentDuration) {
      // It can take a bit to refresh so don't increment once at the end
      progression += 1000
    }
    elapsed.innerText = formatMsToHumanTimestamp(progression)
  }, 1000)
}

function renderTraktData(data) {
  livePlayer.className = "transition-opacity duration-1000"
  progressBar.className += " hidden"
  playback.className += " hidden"
  action.innerText = traktVerb

  if (data.type === "movie") {
    title.innerText = `${data.movie.title} (${data.movie.year})`
    category.className = "hidden"
    source.className = "hidden"

    cover.src = data.movie.movie_posters[0].file_path
    cover.width = data.movie.movie_posters[0].width
    cover.className += " w-48 sm:w-36"

    synopsis.className = "text-xs pt-4"
    synopsis.innerText = data.movie.overview
  }

  if (data.type === "episode") {
    title.innerText = data.episode.title
    category.innerText = `Season ${data.episode.season}, Episode ${data.episode.number}`
    source.innerText = data.show.title

    cover.src = data.episode.season_posters[0].file_path
    cover.width = 250
    cover.height = 375

    synopsis.className = "text-xs pt-4"
    synopsis.innerText = data.show.overview
  }

  livePlayer.style.opacity = 1
}
