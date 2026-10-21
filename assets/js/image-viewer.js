(function () {
  if (!window.HTMLDialogElement) return

  var dialog = document.createElement('dialog');
  document.body.append(dialog);

  document.addEventListener('click', function (e) {
    var img = e.target.closest('main a > img');
    if (!img) return;
    e.preventDefault();

    var card = img.closest('section article');
    if (card) {
      dialog.className = 'card';
      dialog.innerHTML = card.innerHTML;
      dialog.setAttribute('aria-label', dialog.querySelector('h3').textContent.trim());
      var copy = dialog.querySelector('a > img');
      copy.src = copy.parentNode.href;
      copy.removeAttribute('srcset');
      copy.removeAttribute('height');
      copy.width = 320;
      copy.parentNode.replaceWith(copy);
    } else {
      dialog.className = 'picture';
      dialog.innerHTML = '';
      dialog.setAttribute('aria-label', img.alt);
      var full = document.createElement('img');
      full.src = img.parentNode.href;
      full.alt = img.alt;
      dialog.append(full);
      var figure = img.closest('figure');
      var caption = null;
      if (figure) {
        caption = figure.querySelector('figcaption');
      }
      if (caption) {
        var p = document.createElement('p');
        p.innerHTML = caption.innerHTML;
        dialog.append(p);
      }
    }

    dialog.insertAdjacentHTML('beforeend', '<button type="button" aria-label="Close" autofocus>&times;</button>')
    dialog.showModal()
  });

  dialog.addEventListener('click', function (e) {
    if (e.target === dialog) dialog.close()
    if (e.target.tagName === 'BUTTON') dialog.close()
  });
})();
