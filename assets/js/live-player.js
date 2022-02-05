const livePlayer = document.querySelector("#liveplayer")

const action = document.querySelector("#action")
const cover = document.querySelector("#cover")
const title = document.querySelector("#title")
const subtitle = document.querySelector("#subtitle")
const elapsed = document.querySelector("#elapsed")
const duration = document.querySelector("#duration")
const progressArea = document.querySelector("#progress")

const gamingColor = "#003087"
const gamingVerb = "🕹 I'm currently playing"
const gamingVerbPastTense = "🕹 I was recently playing"

const spotifyColor = "#1DB954"
const spotifyVerb = "🎧 I'm currently listening to"
const spotifyVerbPastTense = "🎧 I was recently listening to"

const traktColor = "#C47828"
const traktVerb = "📺 I'm currently watching"
const traktVerbPastTense = "📺 I was recently watching"

function refreshData() {
  return fetch("https://gunslinger.utf9k.net/api/v3/playing")
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
  let showProgression = false
  switch(data.category) {
    case "tv":
    case "movie":
      if (data.is_active) {
        action.innerText = traktVerb
      } else {
        action.innerText = traktVerbPastTense
      }
      break
    case "track":
      if (data.is_active) {
        action.innerText = spotifyVerb
        showProgression = true
      } else {
        action.innerText = spotifyVerbPastTense
      }
      break
    default:
      break
  }
  livePlayer.className = "transition-opacity duration-1000"

  if (showProgression) {
    elapsed.innerText = formatMsToHumanTimestamp(progression)
    duration.innerText = formatMsToHumanTimestamp(currentDuration)
  } else {
    progressArea.style.display = 'none'
  }

  title.innerText = data.title
  subtitle.innerText = data.subtitle

  cover.src = data.image

  livePlayer.style.opacity = 1

  if (showProgression) {
    // Time is linear so we just pretend the track keeps playing and refresh one second after the end, only to rinse and repeat
    const interval = setInterval(function() {
      if (progression <= currentDuration) {
        // It can take a bit to refresh so don't increment once at the end
        progression += 1000
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
