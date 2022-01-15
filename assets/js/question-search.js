// Inspired by https://palant.info/2020/06/04/the-easier-way-to-use-lunr-search-with-hugo
// Adapted to have no dependency on lunr.js though
// It works good enough for now
window.addEventListener("DOMContentLoaded", function() {
  let lookup = null

  const form = document.getElementById("search")
  const input = document.getElementById("search-input")
  const errorMsg = document.getElementById("error-output")

  function getNextSuggestion(tags) {
    let newSuggestion = getRandomSearchSuggestion(tags)
    while (newSuggestion === input.placeholder) {
      // We'll likely get the same item twice or more so reroll
      newSuggestion = getRandomSearchSuggestion(tags)
    }
    animatePlaceholderInput(newSuggestion, tags)
  }

  function getRandomSearchSuggestion(tags) {
    const randomIndex = Math.floor(
      Math.random() * tags.length
    )
    return tags[randomIndex]
  }

  async function animatePlaceholderInput(word, tags) {
    input.placeholder = ""
    let contents = ""
    const chars = word.split("")
    for (let char of chars) {
      await new Promise(r => setTimeout(r, 100))
      contents += char
      input.placeholder = contents
    }
    await new Promise(r => setTimeout(r, 2000))
    for (let char of contents) {  // eslint-disable-line
      await new Promise(r => setTimeout(r, 100))
      contents = contents.slice(0, -1)
      input.placeholder = contents
    }
    getNextSuggestion(tags)
  }

  if (lookup === null) {
    fetch("/search.json")
      .then(res => res.json())
      .then(pages => {
        lookup = pages
        input.disabled = false
        input.className = "search-input"
        getNextSuggestion(getTags(lookup))
      })
      .catch(err => {
        console.error(`Error fetching search index: ${err}`)
        errorMsg.innerText = "Hmm, something broke trying to load search!"
      })
  }

  form.addEventListener("submit", function(event) {
    event.preventDefault()
    return
  })

  function resetQuestionVisibility() {
    const questions = document.querySelectorAll(".question")
    for (let question of questions) {
      question.style.display = "list-item"
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

  function getTags(lookup) {
    let tags = []
    for (let page of lookup) {
      tags = [...page.tags, ...tags]
    }
    return tags
  }

  function handleInput() {
    if (lookup === null) return
    const searchTerm = input.value.trim().toLowerCase()
    console.log(!searchTerm)
    if (!searchTerm) {
      console.log('reset')
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
        question.style.display = "list-item"
      } else {
        question.style.display = "none"
      }
    }
  }

  input.oninput = handleInput
}, false)