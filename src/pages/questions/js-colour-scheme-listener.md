---
title: "How can I listen for user changes to their colour scheme (ie dark mode)?"
slug: "js-colour-scheme-listener"
category: "questions"
tags:
- "darkmode"
- "javascript"
---

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