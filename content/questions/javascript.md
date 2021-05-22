---
title: "Javascript"
slug: "javascript"
category: "questions"
tags:
- "darkmode"
- "javascript"
---

## How can I listen for user changes to their colour scheme (ie dark mode)?

While you could provide a button, some parts of a site can look quite nice if they automatically transition between light and dark mode.

You can listen for these changes like so:

```javascript
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  const updatedScheme = e.matches ? "dark" : "light"
  if (updatedScheme === "dark") {
    // change something to dark mode
  } else {
    // change something to light mode
  }
})
```

This can be useful for normal styles but also changes third party assets such as styles on a map.

## How can I determine if my code is inside of an iFrame?

I suppose they aren't used too much anymore but I've started using them as a preview window for my [projects](/projects) page.

It can be handy to act different depending on an iFrame, such as scaling the view port.

You **can't** do something like this:

```css
iframe > canvas {
  width: 500px;
}

canvas {
  width: 100%;
}
```

but you can use Javascript inside an iFrame and make the changes within the frame itself, rather than from the outside:

```javascript
function insideIframe() {
  try {
    return window.self !== window.top
  } catch (e) {
    return true
  }
}

if (insideIframe()) {
  // perhaps change the size of something or just act differently
}
```