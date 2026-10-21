(function () {
  if (!window.fetch)       return
  if (!window.EventSource) return

  var API = 'https://gunslinger.utf9k.net'

  var VERB = {
    track: 'listening to',
    podcast_episode: 'listening to',
    episode: 'watching',
    movie: 'watching',
    gaming: 'playing',
    manga: 'reading'
  }

  var JOINER = {
    episode: 'from',
    manga: 'of'
  }

  var lamp = document.querySelector('[data-lamp]')
  var row = document.querySelector('[data-live]')

  var shownItem = null

  function pad(number) {
    if (number < 10) return '0' + number
    return String(number)
  }

  // 125000 => "2:05" | 4000000 => "1:06:40"
  function clock(milliseconds) {
    var total   = Math.floor(milliseconds / 1000)
    var hours   = Math.floor(total / 3600)
    var minutes = Math.floor((total % 3600) / 60)
    var seconds = total % 60
    if (hours > 0) return hours + ':' + pad(minutes) + ':' + pad(seconds)
    return minutes + ':' + pad(seconds)
  }

  function capitalise(word) {
    if (!word) return ''
    return word.charAt(0).toUpperCase() + word.slice(1)
  }

  function aucklandTime(date) {
    var format = new Intl.DateTimeFormat('en-NZ', {
      timeZone: 'Pacific/Auckland',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
    return format.format(date)
  }

  function setText(element, value) {
    if (element) element.textContent = value
  }

  // Lamp functionality

  // #a267a1 => { light: 0.52, saturation: 0.26 }
  function describeColour(hex) {
    var red      = parseInt(hex.substr(1, 2), 16) / 255
    var green    = parseInt(hex.substr(3, 2), 16) / 255
    var blue     = parseInt(hex.substr(5, 2), 16) / 255
    var biggest  = Math.max(red, green, blue)
    var smallest = Math.min(red, green, blue)
    var light    = (biggest + smallest) / 2
    var saturation = 0
    if (biggest !== smallest) {
      saturation = (biggest - smallest) / (1 - Math.abs(2 * light - 1))
    }
    return { hex: hex, light: light, saturation: saturation }
  }

  function lampColours(hexes) {
    var usable = []
    var i

    for (i = 0; i < hexes.length; i++) {
      var colour = describeColour(hexes[i])
      if (colour.light > 0.18 && colour.light < 0.88) usable.push(colour)
    }

    usable.sort(function (a, b) { return b.saturation - a.saturation })

    var chosen = []
    for (i = 0; i < usable.length && chosen.length < 3; i++) chosen.push(usable[i].hex)

    i = 0
    while (chosen.length < 3 && usable.length > 0) {
      chosen.push(usable[i % usable.length].hex)
      i++
    }
    while (chosen.length < 3) chosen.push('#9ea78c')

    return chosen
  }

  function updateLamp(item) {
    if (!lamp) return
    var colours = lampColours(item.dominant_colours || [])
    lamp.style.setProperty('--c1', colours[0])
    lamp.style.setProperty('--c2', colours[1])
    lamp.style.setProperty('--c3', colours[2])
    if (item.is_active) {
      lamp.setAttribute('data-on', '')
    } else {
      lamp.removeAttribute('data-on')
    }
  }

  // Main row
  function showItem(item) {
    row.querySelector('img').src = API + item.image

    setText(row.querySelector('[data-name]'), item.title)
    setText(row.querySelector('[data-joiner]'), JOINER[item.category] || 'by')
    setText(row.querySelector('[data-subtitle]'), item.subtitle || '')
    row.querySelector('[data-title] i').hidden = !item.subtitle

    var length = item.title.length + (item.subtitle || '').length
    var title = row.querySelector('[data-title]')
    if (length > 60) {
      title.setAttribute('data-long', '')
    } else {
      title.removeAttribute('data-long')
    }
  }

  function showState(item) {
    if (item.is_active) {
      row.setAttribute('data-state', 'live')
      setText(row.querySelector('[data-verb]'), 'Now ' + VERB[item.category])
    } else {
      row.setAttribute('data-state', 'past')
      setText(row.querySelector('[data-verb]'), 'Last ' + VERB[item.category])
    }

    var rest = ''
    if (item.is_active && item.duration_ms) {
      rest = ' of ' + clock(item.duration_ms)+ ' · '
    } else if (!item.is_active) {
      var stoppedAt = new Date(item.state_changed_at || Date.now())
      rest = 'stopped ' + aucklandTime(stoppedAt) + ' · '
    }
    setText(row.querySelector('[data-rest]'), rest + capitalise(item.source))
    if (!item.is_active) setText(row.querySelector('[data-elapsed]'), '')

    row.querySelector('[data-bar]').hidden = !item.duration_ms
  }

  // Clock
  var clockTimer = null
  var position   = 0
  var target     = 0
  var duration   = 0

  function paintClock() {
    setText(row.querySelector('[data-elapsed]'), clock(Math.max(0, position)))
    var fill = row.querySelector('[data-bar] i')
    if (duration > 0) fill.style.width = Math.min(100, position / duration * 100) + '%'
  }

  function tick() {
    target = Math.min(duration, target + 1000)
    var gap = target - position
    var step
    if (gap <= 1100) {
      step = Math.max(0, gap)
    } else {
      step = 1000 + (gap - 1000) * 0.4
    }
    position = Math.min(duration, position + step)
    paintClock()
  }

  function startClock(item, isNewItem) {
    clearInterval(clockTimer)
    duration = item.duration_ms || 0

    var sinceUpdate = Date.now() - new Date(item.updated_at || Date.now()).getTime()
    var serverPosition = (item.elapsed_ms || 0) + sinceUpdate

    var farApart = Math.abs(serverPosition - position) > 30000
    if (isNewItem || farApart) position = serverPosition
    target = serverPosition

    if (!item.is_active) return
    if (duration === 0) return
    paintClock()
    clockTimer = setInterval(tick, 1000)
  }

  // Updates
  function show(items) {
    if (!items.length) return
    var item = items[0]

    updateLamp(item)

    if (row) {
      var isNewItem = !shownItem || shownItem.id !== item.id
      if (isNewItem) showItem(item)
      showState(item)
      startClock(item, isNewItem)
      row.hidden = false
    }

    shownItem = item
  }

  function load() {
    fetch(API + '/api/v4/playing')
      .then(function (response) { return response.json() })
      .then(show)
      .catch(function (error) { console.error('Live player could not load', error) })
  }

  var stream = null

  function listen() {
    stream = new EventSource(API + '/events?stream=playback')
    stream.onmessage = function (event) {
      show(JSON.parse(event.data))
    }
  }

  load()
  listen()
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      if (stream) stream.close()
    } else {
      load()
      listen()
    }
  })
})()
