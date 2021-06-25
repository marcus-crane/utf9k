// Inspired by https://palant.info/2020/06/04/the-easier-way-to-use-lunr-search-with-hugo
// Adapted to have no dependency on lunr.js though
// It works good enough for now
window.addEventListener("DOMContentLoaded", function(event) {
  let lookup = null
  let query = null

  const form = document.getElementById("search")
  const input = document.getElementById("search-input")

  if (lookup === null) {
    fetch("/search.json")
      .then(res => res.json())
      .then(pages => {
        lookup = pages
      })
      .catch(err => console.error(
        `Oh no, there was an error getting the search index: ${err}`)
      )
  }

  form.addEventListener("submit", function(event) {
    event.preventDefault()
    return
  })

  function resetQuestionVisibility() {
    const questions = document.querySelectorAll('.question')
    for (let question of questions) {
      question.className = 'question'
    }
  }

  function checkTagContent(tags, searchTerm) {
    if (tags.length === 0) return
    for (let tag of tags) {
      if (tag.toLowerCase().includes(searchTerm)) {
        return true
      }
    }
    return false
  }

  function handleInput(event) {
    const searchTerm = input.value.trim().toLowerCase()
    if (!searchTerm) {
      resetQuestionVisibility()
      return
    }
    for (let page of lookup) {
      const question = document.getElementById(`${page.slug}`)
      if (
        page.content.toLowerCase().includes(searchTerm) ||
        checkTagContent(page.tags, searchTerm) ||
        page.title.toLowerCase().includes(searchTerm) ||
        page.slug.toLowerCase().includes(searchTerm)
      ) {
        question.className = "question"
      } else {
        question.className = "question hidden"
      }
    }
  }

  input.oninput = handleInput
}, false)