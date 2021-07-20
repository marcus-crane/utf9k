const liveStatusBar = document.querySelector(".prose header h1 #statusbar")
const livePlayer = document.querySelector(".prose #liveplayer")

const action = document.querySelector(".prose #action")
const cover = document.querySelector(".prose #cover")
const category = document.querySelector(".prose #category")
const source = document.querySelector(".prose #source")
const title = document.querySelector(".prose #title")
const synopsis = document.querySelector(".prose #synopsis")
const elapsed = document.querySelector(".prose #elapsed")
const duration = document.querySelector(".prose #duration")
const progressBar = document.querySelector(".prose #progress")
const playback = document.querySelector(".prose #playback")

const gamingColor = "#003087"
const gamingVerb = "I'm currently playing:"

const spotifyColor = "#1DB954"
const spotifyVerb = "I'm currently listening to:"

const traktColor = "#C47828"
const traktVerb = "I'm currently watching:"


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
  liveStatusBar.style.background = gamingColor
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
  liveStatusBar.style.background = spotifyColor
  livePlayer.className = "transition-opacity duration-1000"
  progressBar.style.transition = "width 1s"
  category.className = "hidden"
  action.innerText = spotifyVerb

  const listeningType = data.currently_playing_type
  const currentDuration = data.item.duration_ms
  let firstPaintComplete = false

  if (listeningType === "episode") {
    source.innerText = data.item.show.name
  } else {
    source.innerText = data.item.album.artists[0].name
  }

  let progression = data.progress_ms

  title.innerText = data.item.name

  elapsed.innerText = formatMsToHumanTimestamp(progression)

  duration.innerText = formatMsToHumanTimestamp(currentDuration)
  progressBar.ariaValueMax = currentDuration

  if (listeningType === "episode") {
    category_type = data.item.show
  } else {
    category_type = data.item.album
  }

  cover.src = category_type.images[0].url
  cover.height = category_type.images[0].height
  cover.width = category_type.images[0].width
  cover.className += " w-24 h-24"

  livePlayer.style.opacity = 1

  // Time is linear so we just pretend the track keeps playing and refresh one second after the end, only to rinse and repeat
  const interval = setInterval(function() {
    if (progression <= currentDuration) {
      // It can take a bit to refresh so don't increment once at the end
      progression += 1000
    }
    progressBar.style.width = `${(progression / currentDuration * 100).toFixed(2)}%`
    progressBar.ariaValueNow = progression
    if (firstPaintComplete) {
      progressBar.style.transition = "none"
    } else {
      firstPaintComplete = true
    }
    elapsed.innerText = formatMsToHumanTimestamp(progression)
    if (progression >= currentDuration) {
      clearInterval(interval)
      progression = currentDuration
      console.log("The track should have finished. Refreshing shortly!")
      setTimeout(function() {
        // API should have refreshed after 1 second
        return refreshData()
      }, 1500)
    }
  }, 1000)
}

function renderTraktData(data) {
  liveStatusBar.style.background = traktColor
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
    cover.width = data.episode.season_posters[0].width
    cover.className += " w-48 sm:w-36"

    synopsis.className = "text-xs pt-4"
    synopsis.innerText = data.show.overview
  }

  livePlayer.style.opacity = 1
}
