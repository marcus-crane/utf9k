---
category: questions
description: A small Javascript snippet useful for dynamically changing colour schemes
lastmod: 2021-06-24
lastrev: 2025-05-24
slug: js-colour-scheme-listener
tags:
  - darkmode
  - javascript
title: How can I listen for user changes to their colour scheme (ie dark mode)?
---
While you could provide a button, some parts of a site can look quite nice if they automatically transition between light and dark mode.

You can listen for these changes like so:

```javascript
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    const updatedScheme = e.matches ? "dark" : "light";
    if (updatedScheme === "dark") {
      // change something to dark mode
    } else {
      // change something to light mode
    }
  });
```
