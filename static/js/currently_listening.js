const musicNode = document.querySelector('#music')
// const tvNode = document.querySelector('#tv')
const showMusicNode = (res) => {
  musicNode.style.display = "inline-block"
  musicNode.innerHTML = ` // 🎵I'm currently listening to <a href=${res.album_link} target="_blank" rel="noreferrer">${res.track}</a> by <a href=${res.artist_link} target="_blank" rel="noreferrer">${res.artist}</a>`
}
// const showTVNode = (res) => {
//   tvNode.style.display = "inline-block"
//   tvNode.innerHTML = ` // 📺I'm currently watching <a href=${res.title_link}>Season ${res.season}, Episode ${res.number}</a> of <a href=${res.show_link}>${res.show}</a>`
// }
const hideMusicNode = () => musicNode.style.display = "none"
// const hideTVNode = () => tvNode.style.display = "none"

const wasScrobbling = "last scrobbled"

// function get_current_show_or_movie() {
//   const url = "http://localhost:4000/api/current_show_or_movie"
//   fetch(url)
//     .then(data => data.json())
//     .then(res => {
//       if (!res.active) {
//         hideTVNode()
//       } else {
//         showTVNode(res)
//       }
//     })
// }

function get_current_song() {
  // Before you freak out at this being a raw IP, it's a kube cluster
  // that I haven't put a domain name in front of yet!
  const url = "http://157.230.63.234:31225/api/current_track"
  fetch(url)
    .then(data => data.json())
    .then(res => {
      console.log(res)
      if (!res.active) {
        hideMusicNode()
      } else {
        showMusicNode(res)
      }
    })
}

get_current_song()
// get_current_show_or_movie()

setInterval(get_current_song, 10000)
// setInterval(get_current_show_or_movie, 10000)