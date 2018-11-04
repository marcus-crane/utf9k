tippy('.nztdef', {
  'animation': 'fade',
  'arrow': true
})

const template = document.querySelector('#template')
const initialText = template.textContent

const tip = tippy('.lastcommit', {
  'animation': 'shift-toward',
  'arrow': true,
  'html': '#template',
  'interactive': true,
  onShow() {
    const content = this.querySelector('.tippy-content')

    if (tip.loading || content.innerHTML !== initialText) return

    tip.loading = true

    fetch('https://api.github.com/repos/marcus-crane/utf9k/branches/master')
    .then(res => res.json())
    .then(data => {
      const link = data.commit.html_url
      const message = data.commit.commit.message
      const tooltip = `<i class="fab fa-github-alt link"></i> <a class="light-blue link" target="_blank" rel="noreferrer" href="${link}">${data.commit.commit.message}</a>`
      content.innerHTML = tooltip
      tip.loading = false
    }).catch(e => {
      content.innerHTML = 'Failed to fetch latest commit :('
      tip.loading = false
    })
  },
  onHidden() {
    const content = this.querySelector('.tippy-content')
    content.innerHTML = initialText
  },
  popperOptions: {
    modifiers: {
      preventOverflow: {
        enabled: false
      },
      hide: {
        enabled: false
      }
    }
  }
})