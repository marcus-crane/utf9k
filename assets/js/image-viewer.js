// Largely adapted from image viewer code bundled with the Nintendo Switch
document.querySelectorAll("#content img").forEach(function(el) {
  el.addEventListener("click", function() {
    const imageViewer = document.createElement("div")
    const fullsizeImage = document.createElement("img")
    
    fullsizeImage.src = el.src

    imageViewer.appendChild(fullsizeImage)

    let imgViewContainer = document.getElementById("fullscreen")
    let body = document.querySelector("body")

    imageViewer.className = "fullscreen"
    imgViewContainer.appendChild(imageViewer)
    imgViewContainer.style.display = "block"

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
    body.addEventListener("keydown", listenForKeyEvent)
    imageViewer.appendChild(closeButton)
  })
})