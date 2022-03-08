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

const musicColor = "#1DB954"
const musicVerb = "🎧 I'm currently listening to"
const musicVerbPastTense = "🎧 I was recently listening to"

const tvColor = "#C47828"
const tvVerb = "📺 I'm currently watching"
const tvVerbPastTense = "📺 I was recently watching"

const eventSource = new EventSource("https://gunslinger.utf9k.net/events")

eventSource.onmessage = function(event) {
  const data = JSON.parse(event)
  if (data.started_at < 0) {
    // Sometimes the endpoint is empty, which is meant to be impossible but need to do some bug fixing so
    // in the meantime, we'll just bail out and the user won't know
    throw ("Encountered a bug so we won't render the live player")
  }
  renderLivePlayer(data)
}

// Adapted from https://stackoverflow.com/a/69126766
function formatMsToHumanTimestamp(ms) {
  const d = new Date(Date.UTC(0, 0, 0, 0, 0, 0, ms))
  const parts = [
    d.getUTCHours(),
    d.getUTCMinutes(),
    d.getUTCSeconds()
  ]
  if (d.getUTCHours() === 0) {
    parts.shift()
  }
  return parts.map(s => String(s).padStart(2, '0')).join(":")
}

function renderLivePlayer(data) {
  let progression = data.elapsed_ms
  let currentDuration = data.duration_ms
  let showProgression = false
  switch (data.category) {
    case "gaming":
      if (data.is_active) {
        action.innerText = gamingVerb
      } else {
        action.innerText = gamingVerbPastTense
      }
      break
    case "episode":
    case "movie":
      if (data.is_active) {
        action.innerText = tvVerb
        showProgression = true
      } else {
        action.innerText = tvVerbPastTense
      }
      break
    case "track":
      if (data.is_active) {
        action.innerText = musicVerb
        showProgression = true
      } else {
        action.innerText = musicVerbPastTense
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
