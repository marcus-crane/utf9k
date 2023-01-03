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

    function listenForEscEvent(event) {
      if (event.key === "Escape") {
        onCloseEvent()
      }
      body.removeEventListener("keydown", listenForEscEvent)
    }

    closeButton.onclick = onCloseEvent
    body.addEventListener("keydown", listenForEscEvent)
    imageViewer.appendChild(closeButton)
  })
})