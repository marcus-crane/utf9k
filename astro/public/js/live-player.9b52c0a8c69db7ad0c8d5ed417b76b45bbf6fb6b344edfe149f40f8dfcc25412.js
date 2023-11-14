(() => {
  // <stdin>
  var livePlayer = document.querySelector("#liveplayer");
  var action = document.querySelector("#action");
  var cover = document.querySelector("#cover");
  var title = document.querySelector("#title");
  var subtitle = document.querySelector("#subtitle");
  var elapsed = document.querySelector("#elapsed");
  var duration = document.querySelector("#duration");
  var progressArea = document.querySelector("#progress");
  var rotatingBorder = document.querySelector("#rotating-border");
  var MANGA = "manga";
  var GAMING = "gaming";
  var EPISODE = "episode";
  var MOVIE = "movie";
  var TRACK = "track";
  var gamingVerb = "\u{1F579} I'm currently playing";
  var gamingVerbPastTense = "\u{1F579} I was recently playing";
  var musicVerb = "\u{1F3A7} I'm currently listening to";
  var musicVerbPastTense = "\u{1F3A7} I was recently listening to";
  var tvVerb = "\u{1F4FA} I'm currently watching";
  var tvVerbPastTense = "\u{1F4FA} I was recently watching";
  var readingVerb = "\u{1F4DA} I'm currently reading";
  var readingVerbPastTense = "\u{1F4DA} I was recently reading";
  var liveliness = {
    MANGA: false,
    GAMING: false,
    EPISODE: true,
    MOVIE: true,
    TRACK: true
  };
  fetch("https://gunslinger.utf9k.net/api/v3/playing").then((res) => res.json()).then((data) => renderLivePlayer(data)).then((_) => fetchHistory()).catch((err) => console.error(`Failed to initialise player state: ${err}`));
  var eventSource = new EventSource("https://gunslinger.utf9k.net/events?stream=playback");
  eventSource.onmessage = function(event) {
    const data = JSON.parse(event.data);
    if (data.started_at < 0) {
      throw "Encountered a bug so we won't render the live player";
    }
    const previousTitle = title.innerText;
    renderLivePlayer(data);
    const shouldUpdateHistory = !liveliness[data.category] || data.is_active;
    if (shouldUpdateHistory && data.title !== previousTitle) {
      fetchHistory();
    }
  };
  function formatMangaTitle(title2) {
    if (title2.includes(" - ")) {
      return `Chapters ${title2.replace("-", "through")}`;
    }
    return `Chapter ${title2}`;
  }
  function formatMsToHumanTimestamp(ms) {
    const d = new Date(Date.UTC(0, 0, 0, 0, 0, 0, ms));
    const parts = [
      d.getUTCHours(),
      d.getUTCMinutes(),
      d.getUTCSeconds()
    ];
    if (d.getUTCHours() === 0) {
      parts.shift();
    }
    return parts.map((s) => String(s).padStart(2, "0")).join(":");
  }
  function renderLivePlayer(data) {
    clearInterval(window.currentInterval);
    let progression = data.elapsed_ms;
    let currentDuration = data.duration_ms;
    let showProgression = false;
    rotatingBorder.className = "rotating-border-hidden";
    switch (data.category) {
      case MANGA:
        data.title = formatMangaTitle(data.title);
        if (data.is_active) {
          action.innerText = readingVerb;
        } else {
          action.innerText = readingVerbPastTense;
        }
        break;
      case GAMING:
        if (data.is_active) {
          action.innerText = gamingVerb;
        } else {
          action.innerText = gamingVerbPastTense;
        }
        break;
      case EPISODE:
      case MOVIE:
        if (data.is_active) {
          action.innerText = tvVerb;
          showProgression = true;
        } else {
          action.innerText = tvVerbPastTense;
        }
        break;
      case TRACK:
        if (data.is_active) {
          action.innerText = musicVerb;
          showProgression = true;
        } else {
          action.innerText = musicVerbPastTense;
        }
        break;
      default:
        break;
    }
    livePlayer.className = "transition-opacity duration-1000";
    if (data.dominant_colours && data.is_active) {
      rotatingBorder.className = "rotating-border-hidden";
      rotatingBorder.style = "";
      buildAnimatedBorder(data.dominant_colours);
      rotatingBorder.className = "";
    }
    if (showProgression) {
      elapsed.innerText = formatMsToHumanTimestamp(progression);
      duration.innerText = formatMsToHumanTimestamp(currentDuration);
      progressArea.style.display = "block";
    } else {
      progressArea.style.display = "none";
    }
    title.innerText = data.title;
    subtitle.innerText = data.subtitle;
    cover.src = "https://gunslinger.utf9k.net" + data.image;
    cover.alt = `Cover art for the ${data.category} ${data.title} by ${data.subtitle}`;
    livePlayer.style.opacity = 1;
    if (showProgression) {
      window.currentInterval = setInterval(function() {
        if (progression <= currentDuration) {
          progression += 1e3;
        }
        elapsed.innerText = formatMsToHumanTimestamp(progression);
        if (progression >= currentDuration) {
          clearInterval(window.currentInterval);
          progression = currentDuration;
          console.log("The track should have finished. Refreshing shortly!");
        }
      }, 1e3);
    }
  }
  function buildAnimatedBorder(dominantColours) {
    const fullColours = [...dominantColours, ...dominantColours, ...dominantColours];
    const gradientLen = dominantColours.length * 3;
    const stepInterval = 1 / gradientLen;
    let previousStep = 0;
    let gradientVal = "conic-gradient(";
    for (const colour of fullColours) {
      gradientVal += `${colour} ${previousStep}turn ${previousStep + stepInterval}turn,`;
      previousStep += stepInterval;
    }
    gradientVal += ")";
    gradientVal = gradientVal.replace(",)", ")");
    rotatingBorder.style.setProperty("--border-bg", gradientVal);
  }
  var playerHistory = document.querySelector("#played-items");
  function fetchHistory() {
    fetch("https://gunslinger.utf9k.net/api/v3/history").then((res) => res.json()).then((data) => renderHistory(data)).catch((err) => console.error(`Failed to initialise player history: ${err}`));
  }
  function renderHistory(data) {
    if (playerHistory.textContent.trim() !== "") {
      playerHistory.textContent = "";
    }
    let count = 0;
    for (const item of data) {
      if (item.category === MANGA) {
        item.title = formatMangaTitle(item.title);
      }
      if (item.title === title.innerText && count == 0)
        continue;
      let startingFontSize = 10;
      if (count === 0) {
        startingFontSize = 0;
      }
      let emoji = "";
      switch (item.category) {
        case GAMING:
          emoji = "\u{1F579}";
          break;
        case EPISODE:
          emoji = "\u{1F4FA}";
          break;
        case MOVIE:
          emoji = "\u{1F3AC}";
          break;
        case TRACK:
          emoji = "\u{1F3A7}";
          break;
        case MANGA:
          emoji = "\u{1F4DA}";
          break;
        default:
          emoji = "";
      }
      playerHistory.insertAdjacentHTML("beforeend", `<li class="history-entry" style="font-size: ${startingFontSize}px;">${emoji} ${item.title} - ${item.subtitle}</li>`);
      count += 1;
    }
    if (count === 0)
      return;
    setTimeout(() => playerHistory.children[0].style = "font-size: 10px;", 1e3);
    if (count < 6)
      return;
    setTimeout(() => playerHistory.children[playerHistory.children.length - 1].style = "font-size: 0px;", 3e3);
  }
})();
