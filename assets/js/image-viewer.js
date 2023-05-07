// Largely adapted from image viewer code bundled with the Nintendo Switch
document.querySelectorAll("article img").forEach(function(el) {
  const imageLoaded = el.complete && el.naturalHeight !== 0
  console.log(imageLoaded)

  if (imageLoaded) {
    addOverlay(el)
  } else {
    el.addEventListener("load", el => addOverlay(el.target))
  }
})

function addOverlay(el) {
  const overlayDiv = document.createElement("div")
  overlayDiv.classList.add("overlay")
  overlayDiv.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  `
  overlayDiv.style.height = `${el.height}px`
  overlayDiv.style.width = `${el.width}px`
  el.insertAdjacentElement("beforebegin", overlayDiv)

  overlayDiv.addEventListener("click", function() {
    const imageViewer = document.createElement("div")
    const fullsizeImage = document.createElement("img")
    const imageCaption = document.createElement("p")
    // Used to surface links that would otherwise redirect the user on click to somewhere besides image src
    const imageLink = el.getAttribute("altsrc")
    const imageLinkTitle = el.getAttribute("alttitle")
    
    fullsizeImage.src = el.src

    imageCaption.innerHTML = el.getAttribute("alt")

    if (imageLink !== null) {
      let imageTitle = imageLinkTitle === null ? imageLink : imageLinkTitle
      imageCaption.innerHTML += "<br /><br />"
      imageCaption.innerHTML += `You can learn more by visiting <a target="_blank" href="${imageLink}">${imageTitle}</a>`
    }

    imageViewer.appendChild(fullsizeImage)
    imageViewer.appendChild(imageCaption)

    let imgViewContainer = document.getElementById("fullscreen")
    let body = document.querySelector("body")

    imageViewer.className = "fullscreen"
    imgViewContainer.appendChild(imageViewer)
    imgViewContainer.style.display = "block"
    
    // Footnotes using littlefoot come with a z-index that interferes with the overlay
    // so we temporarily sink them
    document.querySelectorAll("button.littlefoot-footnote__button").forEach(function(fn) {
      fn.style.zIndex = 0
    })

    let closeViewer = function(e) {
      if ("hide" === e.animationName) {
        imgViewContainer.classList.remove("show")
        imgViewContainer.style.display = "none"
        imgViewContainer.removeChild(imageViewer)
        imgViewContainer.removeEventListener("animationend", closeViewer)
      }
    }
    imgViewContainer.addEventListener("animationend", closeViewer)

    imgViewContainer.classList.remove("hide")
    imgViewContainer.classList.add("show")

    let closeButton = document.createElement("button")
    closeButton.className = "closeBtn"

    function onCloseEvent() {
      imgViewContainer.classList.add("hide");
      imgViewContainer.addEventListener("animationend", closeViewer);
      document.querySelectorAll("button.littlefoot-footnote__button").forEach(function(fn) {
        fn.style.removeProperty("z-index")
      })
    }

    // Keyboard controls
    //
    // Press O to open direct link to image
    // Press ESCAPE to close viewer
    function listenForKeyEvent(event) {
      if (event.key === "o") {
        window.open(fullsizeImage.src, "_blank")
        return
      }

      if (event.key === "Escape") {
        onCloseEvent()
      }

      // We only remove the event upon escaping or else you'd be stuck
      // after doing any other shortcuts
      body.removeEventListener("keydown", listenForKeyEvent)
    }

    closeButton.onclick = onCloseEvent
    imgViewContainer.addEventListener("mousedown", el => {
    // We check for the clicked target because we only want to close
    // when the background is hit, not eg; trying to copy text
    // We also check if the click was a left click to allow
    // those interested to access developer tools with the image viewer
      if (el.target === imageViewer && el.button === 0) {
        onCloseEvent()
      }
    })
    body.addEventListener("keydown", listenForKeyEvent)
    imageViewer.appendChild(closeButton)
  })
}