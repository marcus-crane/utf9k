const liveStatusBar = document.querySelector(".prose header h1 #statusbar")
const livePlayer = document.querySelector(".prose #liveplayer")

const cover = document.querySelector(".prose #cover")
const album = document.querySelector(".prose #album")
const artist = document.querySelector(".prose #artist")
const track = document.querySelector(".prose #track")
const elapsed = document.querySelector(".prose #elapsed")
const duration = document.querySelector(".prose #duration")
const progressBar = document.querySelector(".prose #progress")

const spotifyColor = "#1DB954"

function querySpotify() {
  return new Promise((resolve, reject) => {
    fetch("https://gunslinger.utf9k.net/api/v1/audio")
      .then(res => res.json())
      .then(audio => {
        const data = audio.data
        if (!data || !data.is_playing) return resolve("I'm not currently listening to anything.")
        return resolve({ 'provider': 'spotify', data })
      })
      .catch(err => reject(err))
  })
}

function refreshData() {
  Promise.all([querySpotify()])
    .then(values => {
      for (let value of values) {
        console.log(value)
        if (typeof(value) === "string") continue
        switch(value.provider) {
          case 'spotify':
            return renderSpotifyData(value.data)
            break
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

function renderSpotifyData(data) {
  liveStatusBar.style.background = spotifyColor
  livePlayer.className += "transition-opacity duration-1000"
  progressBar.style.transition = "width 1s"

  const listeningType = data.currently_playing_type
  const timestamp = data.timestamp
  const playing = data.item.is_playing
  const currentDuration = data.item.duration_ms
  let firstPaintComplete = false

  if (listeningType === 'episode') {
    artist.innerText = data.item.show.name
  } else {
    artist.innerText = data.item.album.artists[0].name
  }

  let progression = data.progress_ms

  track.innerText = data.item.name
  album.innerText = data.item.album.name

  elapsed.innerText = formatMsToHumanTimestamp(progression)

  duration.innerText = formatMsToHumanTimestamp(currentDuration)
  progressBar.ariaValueMax = currentDuration

  cover.src = data.item.album.images[0].url
  cover.height = data.item.album.images[0].height
  cover.width = data.item.album.images[0].width

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
      console.log("The track should have finished. Refreshing in 6 seconds")
      setTimeout(function() {
        // API should have refreshed after 5 seconds
        return refreshData()
      }, 5500)
    }
  }, 1000)
}
