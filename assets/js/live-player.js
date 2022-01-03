const liveStatusBar = document.querySelector(".prose header h1 #statusbar")
const livePlayer = document.querySelector(".prose #liveplayer")

const action = document.querySelector(".prose #action")
const cover = document.querySelector(".prose #cover")
const title = document.querySelector(".prose #title")
const subtitle = document.querySelector(".prose #subtitle")
const elapsed = document.querySelector(".prose #elapsed")
const duration = document.querySelector(".prose #duration")
const progressBar = document.querySelector(".prose #progress")
const playback = document.querySelector(".prose #playback")

const gamingColor = "#003087"
const gamingVerb = "I'm currently playing"
const gamingVerbPastTense = "I was recently playing"

const spotifyColor = "#1DB954"
const spotifyVerb = "I'm currently listening to"
const spotifyVerbPastTense = "I was recently listening to"

const traktColor = "#C47828"
const traktVerb = "I'm currently watching"
const traktVerbPastTense = "I was recently watching"

function refreshData() {
  return fetch("https://gunslinger.utf9k.net/api/v2/playing")
      .then(res => res.json())
      .then(data => {
        if (data.started_at < 0) {
          // Sometimes the endpoint is empty, which is meant to be impossible but need to do some bug fixing so
          // in the meantime, we'll just bail out and the user won't know
          throw("Encountered a bug so we won't render the live player")
        }
        return data
      })
      .then(data => renderLivePlayer(data))
      .catch(err => console.log(err))
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

function renderLivePlayer(data) {
  let progression = data.elapsed_ms
  let currentDuration = data.duration_ms
  let enableProgressBar = false
  switch(data.category) {
    case "tv":
    case "movie":
      liveStatusBar.style.background = traktColor
      if (data.is_active) {
        action.innerText = traktVerb
      } else {
        action.innerText = traktVerbPastTense
      }
      break
    case "music":
    case "podcast":
      liveStatusBar.style.background = spotifyColor
      if (data.is_active) {
        action.innerText = spotifyVerb
        enableProgressBar = true
      } else {
        action.innerText = spotifyVerbPastTense
      }
      break
    default:
      break
  }
  livePlayer.className = "transition-opacity duration-1000"
  if (!enableProgressBar) {
    progressBar.className += " hidden"
    playback.className += " hidden"
  }

  let firstPaintComplete = false

  if (enableProgressBar) {
    progressBar.style.transition = "width 1s"
    elapsed.innerText = formatMsToHumanTimestamp(progression)

    duration.innerText = formatMsToHumanTimestamp(currentDuration)
    progressBar.ariaValueMax = currentDuration
  }

  title.innerText = data.title
  subtitle.innerText = data.subtitle

  cover.src = data.images[0].url
  cover.width = data.images[0].width
  cover.height = data.images[0].height

  livePlayer.style.opacity = 1
  
  if (enableProgressBar) {
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
}