const livePlayer = document.querySelector("#liveplayer")

const action = document.querySelector("#action")
const cover = document.querySelector("#cover")
const title = document.querySelector("#title")
const subtitle = document.querySelector("#subtitle")
const elapsed = document.querySelector("#elapsed")
const duration = document.querySelector("#duration")
const progressArea = document.querySelector("#progress")

const rotatingBorder = document.querySelector("#rotating-border")

const gamingVerb = "🕹 I'm currently playing"
const gamingVerbPastTense = "🕹 I was recently playing"

const musicVerb = "🎧 I'm currently listening to"
const musicVerbPastTense = "🎧 I was recently listening to"

const tvVerb = "📺 I'm currently watching"
const tvVerbPastTense = "📺 I was recently watching"

const readingVerb = "📚 I'm currently reading"
const readingVerbPastTense = "📚 I was recently reading"

// Because the eventSource clears itself with each update (we only care about the latest event)
// a user may hit the side in between updates at which point, there are no events sent to them
// until the server state changes. This can take a while or maybe even never if nothing
// is playing. We'll do an initial population of the site before calling out event source
// and pretty quickly get brought up to date by the event stream
fetch("https://gunslinger.utf9k.net/api/v3/playing")
  .then(res => res.json())
  .then(data => renderLivePlayer(data))
  .catch(err => console.error(`Failed to initialise player state: ${err}`))

const eventSource = new EventSource("https://gunslinger.utf9k.net/events?stream=playback")

eventSource.onmessage = function (event) {
  const data = JSON.parse(event.data)
  if (data.started_at < 0) {
    // Sometimes the endpoint is empty, which is meant to be impossible but need to do some bug fixing so
    // in the meantime, we'll just bail out and the user won't know
    throw ("Encountered a bug so we won't render the live player")
  }
  const previousTitle = title.innerText
  renderLivePlayer(data)
  if (data.is_active && data.title !== previousTitle) {
    // If a track is already active but changes to inactive, the re-rendered state will match what already exists
    // If a track hasn't changed but is just getting a progression update, we also want to skip re-rendering
    fetchHistory()
  }
}

function formatMangaTitle(title) {
  if (title.includes(" - ")) {
    return `Chapters ${title.replace("-", "through")}`
  }
  return `Chapter ${title}`
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
  return parts.map(s => String(s).padStart(2, "0")).join(":")
}

function renderLivePlayer(data) {
  clearInterval(window.currentInterval)
  let progression = data.elapsed_ms
  let currentDuration = data.duration_ms
  let showProgression = false
  rotatingBorder.className = "rotating-border-hidden"
  switch (data.category) {
  case "manga":
    data.title = formatMangaTitle(data.title)
    if (data.is_active) {
      action.innerText = readingVerb
    } else {
      action.innerText = readingVerbPastTense
    }
    break
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

  if (data.dominant_colours && data.is_active) {
    rotatingBorder.className = "rotating-border-hidden"
    rotatingBorder.style = ""
    buildAnimatedBorder(data.dominant_colours)
    rotatingBorder.className = ""
  }

  if (showProgression) {
    elapsed.innerText = formatMsToHumanTimestamp(progression)
    duration.innerText = formatMsToHumanTimestamp(currentDuration)
    progressArea.style.display = "block"
  } else {
    progressArea.style.display = "none"
  }

  title.innerText = data.title
  subtitle.innerText = data.subtitle

  cover.src = "https://gunslinger.utf9k.net" + data.image
  cover.alt = `Cover art for the ${data.category} ${data.title} by ${data.subtitle}`

  livePlayer.style.opacity = 1

  if (showProgression) {
    // Time is linear so we just pretend the track keeps playing and refresh one second after the end, only to rinse and repeat
    window.currentInterval = setInterval(function () {
      if (progression <= currentDuration) {
        // It can take a bit to refresh so don't increment once at the end
        progression += 1000
      }
      elapsed.innerText = formatMsToHumanTimestamp(progression)
      if (progression >= currentDuration) {
        clearInterval(window.currentInterval)
        progression = currentDuration
        console.log("The track should have finished. Refreshing shortly!")
      }
    }, 1000)
  }
}

function buildAnimatedBorder(dominantColours) {
  const fullColours = [...dominantColours, ...dominantColours, ...dominantColours]
  const gradientLen = dominantColours.length * 3
  const stepInterval = 1 / gradientLen
  let previousStep = 0.0
  let gradientVal = "conic-gradient("
  for (const colour of fullColours) {
    gradientVal += `${colour} ${previousStep}turn ${previousStep + stepInterval}turn,`
    previousStep += stepInterval
  }
  gradientVal += ")"
  gradientVal = gradientVal.replace(",)", ")") // Lazy
  rotatingBorder.style.setProperty("--border-bg", gradientVal)
}

/* History */
const playerHistory = document.querySelector("#played-items")

function fetchHistory() {
  fetch("https://gunslinger.utf9k.net/api/v3/history")
    .then(res => res.json())
    .then(data => renderHistory(data))
    .catch(err => console.error(`Failed to initialise player history: ${err}`))
}

function renderHistory(data) {
  if (playerHistory.textContent.trim() !== "") {
    playerHistory.textContent = ""
  }
  let count = 0
  for (const item of data) {
    if (item.category === "manga") {
      item.title = formatMangaTitle(item.title)
    }
    // We only want to skip the newest history entry if it happens to match what is in the live player
    // or else we'll skip items where I've played something many times in a row
    if (item.title === title.innerText && count == 0) continue
    let startingFontSize = 10
    if (count === 0) {
      startingFontSize = 0
    }

    let emoji = ""
    switch (item.category) {
    case "gaming":
      emoji = "🕹"
      break
    case "episode":
      emoji = "📺"
      break
    case "movie":
      emoji = "🎬"
      break
    case "track":
      emoji = "🎧"
      break
    case "manga":
      emoji = "📚"
      break
    default:
      emoji = ""
    }
    playerHistory.insertAdjacentHTML("beforeend", `<li class="history-entry" style="font-size: ${startingFontSize}px;">${emoji} ${item.title} - ${item.subtitle}</li>`)
    count += 1
  }
  if (count === 0) return // Nothing to animate
  // Give the user enough time to grok what is happening (or else the animation will fly by too quickly)
  setTimeout(() => playerHistory.children[0].style = "font-size: 10px;", 1000)
  if (count < 6) return // We have no items we want to hide yet
  setTimeout(() => playerHistory.children[playerHistory.children.length - 1].style = "font-size: 0px;", 3000)
}

fetchHistory()