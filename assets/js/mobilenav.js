const mobileMenuToggle = document.getElementById("mobileMenuToggle")
const offCanvasMobileMenu = document.getElementById("offCanvasMobileMenu")
const offCanvasCloseButton = document.getElementById("offCanvasCloseButton")

function toggleMobileMenu() {
  offCanvasMobileMenu.classList.toggle("hidden")
}

mobileMenuToggle.addEventListener("click", toggleMobileMenu)
offCanvasCloseButton.addEventListener("click", toggleMobileMenu)