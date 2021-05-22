const liveSentence = document.querySelector("#livesentence")
const contentName = document.querySelector('#contentname')
const contentSource = document.querySelector('#contentsource')
const liveStatusBar = document.querySelector(".prose header h1 #statusbar")
const verb = document.querySelector('#verb')

const traktColor = "#C47828"
const traktVerb = "watching"

const spotifyColor = "#1DB954"
const spotifyVerb = "currently listening to"

const traktPromise = new Promise((resolve, reject) => {
  fetch("/.netlify/functions/currently_watching")
    .then(res => res.json())
    .then(data => {
      if (Object.values(data).length == 0) return resolve('Not watching anything')
      return resolve({ 'provider': 'trakt', data })
    })
    .catch(err => reject(err))
})

const spotifyPromise = new Promise((resolve, reject) => {
  fetch("/.netlify/functions/currently_listening")
    .then(res => {
      if (res.status === 204) return resolve('Not listening to anything')
      return res.json()
    })
    .then(data => {
      if (!data || !data.is_playing) return resolve('Not listening to anything')
      return resolve({ 'provider': 'spotify', data })
    })
    .catch(err => reject(err))
})

Promise.all([spotifyPromise, traktPromise])
  .then(values => {
    for (let value of values) {
      if (typeof(value) === "string") continue
      switch(value.provider) {
        case 'spotify':
          renderSpotifyData(value.data)
          break
        case 'trakt':
          renderTraktData(value.data)
          break
        default:
          return
      }
    }
  })

function renderSpotifyData(data) {
  const timestamp = data.timestamp
  const progressPercent = (data.progress_ms / data.item.duration_ms * 100).toFixed(2)
  const duration = data.item.duration_ms
  const artistName = data.item.album.artists[0].name
  const artistLink = data.item.album.artists[0].external_urls.spotify
  const songName = data.item.name
  const songLink = data.item.external_urls.spotify

  verb.innerText = spotifyVerb
  liveStatusBar.style.background = spotifyColor

  contentName.innerHTML = `<a rel="noopener noreferrer" target="_blank" href="${songLink}">${songName}</a> by`
  contentSource.innerHTML = `<a rel="noopener noreferrer" target="_blank" href="${artistLink}">${artistName}</a>`

  liveSentence.style.opacity = 1
}

function renderTraktData(data) {
  console.log(data)
  verb.innerText = traktVerb
  liveStatusBar.style.background = traktColor

  if (data.type == "movie") {
    const movieName = data['movie']['title']
    const movieYear = data['movie']['year']
    const movieSlug = data['movie']['ids']['slug']

    contentSource.innerText = ''
    contentName.innerHTML = `<a rel="noopener noreferrer" target="_blank" href="https://trakt.tv/movies/${movieSlug}/">${movieName} (${movieYear})</a>`
  }

  if (data.type == "episode") {
    const seasonNumber = data['episode']['season']
    const episodeNumber = data['episode']['number']
    const episodeSlug = data['episode']['ids']['slug']
    const show = data['show']['title']
    const showYear = data['show']['year']
    const showSlug = data['show']['ids']['slug']

    contentName.innerHTML = `<a rel="noopener noreferrer" target="_blank" href="https://trakt.tv/shows/${showSlug}/seasons/${seasonNumber}/episodes/${episodeNumber}/">S${seasonNumber}E${episodeNumber}</a> of`
    contentSource.innerHTML = `<a rel="noopener noreferrer" target="_blank" href="https://trakt.tv/shows/${showSlug}/">${show} (${showYear})</a>`
  }

   liveSentence.style.opacity = 1
}
