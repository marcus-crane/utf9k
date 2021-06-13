const thanksURL = "https://gunslinger.utf9k.net/api/v1/thanks"

function sayThanksAnonymously() {
  const currentPage = window.location.href || document.location.href
  const headers = new Headers({
    "Content-Type": "application/json",
    "User-Agent": "WeDontNeedToKnow" // This unfortunately has no effect as far as I can tell :(
  })
  const credentials = "omit" // This site has no cookies but lets omit them anyway, just in case!
  const body = JSON.stringify({ "liked_url": currentPage })
  fetch(thanksURL, { method: "POST", headers, body, credentials  })
    .then(res => res.json())
    .then(resp => {
      const thanksParagraph = document.querySelector("#plusone")
      thanksParagraph.innerText = resp.data
    })
    .catch(err => {
      console.log(err)
    })
}

const thanksButton = document.querySelector('a#saythanks')
console.log(thanksButton)
thanksButton.addEventListener('click', sayThanksAnonymously)
