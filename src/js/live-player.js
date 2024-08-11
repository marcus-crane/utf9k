const livePlayer = document.querySelector("#liveplayer")

const action = document.querySelector("#action")
const cover = document.querySelector("#cover")
const title = document.querySelector("#title")
const subtitle = document.querySelector("#subtitle")
const elapsed = document.querySelector("#elapsed")
const duration = document.querySelector("#duration")
const progressArea = document.querySelector("#progress")

const sun = document.querySelector("#sun")

const PODCAST = 'podcast_episode'
const MANGA = 'manga'
const GAMING = 'gaming'
const EPISODE = 'episode'
const MOVIE = 'movie'
const TRACK = 'track'

const gamingVerb = "🕹 I'm currently playing"
const gamingVerbPastTense = "🕹 I was recently playing"

const audioVerb = "🎧 I'm currently listening to"
const audioVerbPastTense = "🎧 I was recently listening to"

const tvVerb = "📺 I'm currently watching"
const tvVerbPastTense = "📺 I was recently watching"

const readingVerb = "📚 I'm currently reading"
const readingVerbPastTense = "📚 I was recently reading"

// Not all categories are able to support "live" statuses so
// for example, there's no use in inferring active changes
// for say; manga so when that changes, we want to re-fetch
// history instead of deferring
const liveliness = {
  PODCAST: true,
  MANGA: false,
  GAMING: false,
  EPISODE: true,
  MOVIE: true,
  TRACK: true
}

// Because the eventSource clears itself with each update (we only care about the latest event)
// a user may hit the side in between updates at which point, there are no events sent to them
// until the server state changes. This can take a while or maybe even never if nothing
// is playing. We'll do an initial population of the site before calling out event source
// and pretty quickly get brought up to date by the event stream
function initPlayer() {
  fetch("https://gunslinger.utf9k.net/api/v4/playing")
    .then(res => res.json())
    .then(data => renderLivePlayer(data))
    .then(_ => fetchHistory()) // We load history only once the live player is rendered to ensure the playing track is filtered from history
    .catch(err => console.error(`Failed to initialise player state: ${err}`))
}

// Call this once on startup + anytime we are the active tab again
initPlayer()

// This seems pointless but we want to disconnect + reconnect the source depending on tab focus so we respect the user's browsing resources
function initEventSource() {
  return new EventSource("https://gunslinger.utf9k.net/events?stream=playback")
}

let eventSource = initEventSource()

eventSource.onmessage = function (event) {
  const data = JSON.parse(event.data)
  if (data.started_at < 0) {
    // Sometimes the endpoint is empty, which is meant to be impossible but need to do some bug fixing so
    // in the meantime, we'll just bail out and the user won't know
    throw ("Encountered a bug so we won't render the live player")
  }
  const previousTitle = title.innerText
  renderLivePlayer(data)
  // If a track is already active but changes to inactive, the re-rendered state will match what already exists
  // If a track hasn't changed but is just getting a progression update, we also want to skip re-rendering
  // Lastly, not all categories have live updates so we should take any update as a hint to update history
  // in order to properly show the effect of the current item dropping out of the player and into the history queue
  const shouldUpdateHistory = !liveliness[data.category] || data.is_active
  if (
    shouldUpdateHistory &&
    data.title !== previousTitle
  ) {
    fetchHistory()
  }
}

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    // The user has gone to do something else so no point showing our fancy effect
    eventSource.close()
  } else {
    // Give our source a wee bit of time to catch up + instant refresh of the player
    initPlayer()
    eventSource = initEventSource()
  }
})

function normaliseCategoryName(category) {
  switch (category) {
    case PODCAST:
      return "podcast episode"
    default:
      return category
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
  if (data.length == 0) {
    return
  }
  // We should always have one item
  data = data[0]
  clearInterval(window.currentInterval)
  let progression = data.elapsed_ms
  let currentDuration = data.duration_ms
  let showProgression = false
  sun.className = "sun-hidden"
  switch (data.category) {
  case MANGA:
    data.title = formatMangaTitle(data.title)
    if (data.is_active) {
      action.innerText = readingVerb
    } else {
      action.innerText = readingVerbPastTense
    }
    break
  case GAMING:
    if (data.is_active) {
      action.innerText = gamingVerb
    } else {
      action.innerText = gamingVerbPastTense
    }
    break
  case EPISODE:
  case MOVIE:
    if (data.is_active) {
      action.innerText = tvVerb
      showProgression = true
    } else {
      action.innerText = tvVerbPastTense
    }
    break
  case PODCAST:
  case TRACK:
    if (data.is_active) {
      action.innerText = audioVerb
      showProgression = true
    } else {
      action.innerText = audioVerbPastTense
    }
    break
  default:
    break
  }
  livePlayer.className = "transition-opacity duration-1000"

  if (data.dominant_colours && data.is_active) {
    buildAnimatedBorder(data.dominant_colours)
    sun.className = ""
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



  cover.src = "https://gunslinger.utf9k.net/static/" + data.id.replaceAll(":", ".") + ".jpeg"
  cover.alt = `Cover art for the ${normaliseCategoryName(data.category)} ${data.title} by ${data.subtitle}`

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
  const fullColours = [...dominantColours, ...dominantColours, ...dominantColours, ...dominantColours, ...dominantColours, ...dominantColours]
  const gradientLen = dominantColours.length * 6
  const stepInterval = 1 / gradientLen
  let previousStep = 0.0
  let gradientVal = "conic-gradient("
  for (const colour of fullColours) {
    gradientVal += `${colour} ${previousStep}turn ${previousStep + stepInterval}turn,`
    previousStep += stepInterval
  }
  gradientVal += ")"
  gradientVal = gradientVal.replace(",)", ")") // Lazy
  sun.style.setProperty("--border-bg", gradientVal)
}

/* History */
const playerHistory = document.querySelector("#played-items")

function fetchHistory() {
  fetch("https://gunslinger.utf9k.net/api/v4/history")
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
    if (item.category === MANGA) {
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
    case GAMING:
      emoji = "🕹"
      break
    case EPISODE:
      emoji = "📺"
      break
    case MOVIE:
      emoji = "🎬"
      break
    case TRACK:
      emoji = "🎧"
      break
    case MANGA:
      emoji = "📚"
      break
    case PODCAST:
      emoji = "🎤"
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