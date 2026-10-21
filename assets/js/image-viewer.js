(function () {
  if (!window.HTMLDialogElement) return

  var dialog = document.createElement('dialog');
  document.body.append(dialog);

  document.addEventListener('click', function (e) {
    var cover = e.target.closest('main section article a > img');
    if (!cover) return;
    e.preventDefault();

    dialog.innerHTML = cover.closest('article').innerHTML + '<button type="button" autofocus>Close</button>';
    dialog.setAttribute('aria-label', dialog.querySelector('h3').textContent.trim())

    // We need to resolve a larger image for the viewer to render
    var img = dialog.querySelector('a > img');
    img.src = img.parentNode.href;
    img.removeAttribute('srcset');
    img.removeAttribute('height');
    img.width = 320;
    img.parentNode.replaceWith(img);

    dialog.showModal()
  });

  dialog.addEventListener('click', function (e) {
    if (e.target === dialog) dialog.close()
    if (e.target.tagName === 'BUTTON') dialog.close()
  });
})();