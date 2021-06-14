const liveSentence = document.querySelector("#livesentence")
const contentName = document.querySelector('#contentname')
const contentSource = document.querySelector('#contentsource')
const liveStatusBar = document.querySelector(".prose header h1 #statusbar")
const verb = document.querySelector('#verb')

const traktColor = "#C47828"
const traktVerb = "currently watching"

const spotifyColor = "#1DB954"
const spotifyVerb = "currently listening to"

const gamingColor = "#003087"
const gamingVerb = "currently playing"

const traktPromise = new Promise((resolve, reject) => {
  fetch("https://gunslinger.utf9k.net/api/v1/media")
    .then(res => res.json())
    .then(media => {
      const data = media.data
      if (data.type === "") return resolve("I'm not currently watching anything")
      return resolve({ 'provider': 'trakt', data })
    })
    .catch(err => reject(err))
})

const spotifyPromise = new Promise((resolve, reject) => {
  fetch("https://gunslinger.utf9k.net/api/v1/audio")
    .then(res => res.json())
    .then(audio => {
      const data = audio.data
      if (!data || !data.is_playing) return resolve("I'm not currently listening to anything.")
      return resolve({ 'provider': 'spotify', data })
    })
    .catch(err => reject(err))
})

const videogamePromise = new Promise((resolve, reject) => {
  fetch("https://gunslinger.utf9k.net/api/v1/videogames")
    .then(res => res.json())
    .then(game => {
      const data = game.data
      if (!data.title) return resolve("I'm not currently playing any videogames.")
      return resolve({ 'provider': 'gaming', data })
    })
    .catch(err => reject(err))
})

Promise.all([spotifyPromise, traktPromise, videogamePromise])
  .then(values => {
    for (let value of values) {
      console.log(value)
      if (typeof(value) === "string") continue
      switch(value.provider) {
        case 'gaming':
          renderGamingData(value.data)
          break
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

function renderGamingData(data) {
  const title = data.title
  const url = data.url

  verb.innerText = gamingVerb
  liveStatusBar.style.background = gamingColor

  contentSource.innerText = ''
  contentName.innerHTML = `<a rel="noopener noreferrer" target="_blank" href="${url}">${title}</a>`

  liveSentence.style.opacity = 1
}

function renderSpotifyData(data) {
  const listeningType = data.currently_playing_type
  const timestamp = data.timestamp
  const progressPercent = data.percent_done.toFixed(2)
  const duration = data.item.duration_ms
  let artistName = ''
  let artistLink = ''
  
  if (listeningType === 'episode') {
    artistName = data.item.show.name
    artistLink = data.item.show.external_urls.spotify
  } else {
    artistName = data.item.album.artists[0].name
    artistLink = data.item.album.artists[0].external_urls.spotify
  }

  const songName = data.item.name
  const songLink = data.item.external_urls.spotify

  verb.innerText = spotifyVerb
  liveStatusBar.style.background = spotifyColor

  contentName.innerHTML = `<a rel="noopener noreferrer" target="_blank" href="${songLink}">${songName}</a> by`
  contentSource.innerHTML = `<a rel="noopener noreferrer" target="_blank" href="${artistLink}">${artistName}</a>`

  liveSentence.style.opacity = 1
}

function renderTraktData(data) {
  verb.innerText = traktVerb
  liveStatusBar.style.background = traktColor

  if (data.type === "movie") {
    const movieName = data.movie.title
    const movieYear = data.movie.year
    const movieSlug = data.movie.ids.slug

    contentSource.innerText = ''
    contentName.innerHTML = `<a rel="noopener noreferrer" target="_blank" href="https://trakt.tv/movies/${movieSlug}/">${movieName} (${movieYear})</a>`
  }

  if (data.type === "episode") {
    const seasonNumber = data.episode.season
    const episodeNumber = data.episode.number
    const episodeSlug = data.episode.ids.slug
    const show = data.show.title
    const showYear =  data.show.year
    const showSlug = data.show.ids.slug

    contentName.innerHTML = `<a rel="noopener noreferrer" target="_blank" href="https://trakt.tv/shows/${showSlug}/seasons/${seasonNumber}/episodes/${episodeNumber}/">S${seasonNumber}E${episodeNumber}</a> of`
    contentSource.innerHTML = `<a rel="noopener noreferrer" target="_blank" href="https://trakt.tv/shows/${showSlug}/">${show} (${showYear})</a>`
  }

   liveSentence.style.opacity = 1
}
