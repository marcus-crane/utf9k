// Largely adapted from image viewer code bundled with the Nintendo Switch
document.querySelectorAll("article img").forEach(function(el) {
  el.addEventListener("click", function() {
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
    fullsizeImage.onclick = onCloseEvent
    body.addEventListener("keydown", listenForKeyEvent)
    imageViewer.appendChild(closeButton)
  })
})