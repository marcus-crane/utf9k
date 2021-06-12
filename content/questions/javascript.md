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

## Where can I determine my NODE_MODULE_VERSION

This error is usually pretty cryptic and I often forget how to debug it so let's look at a sample error:

```bash
Error: The module '/Users/marcus/Code/octowise/node_modules/better-sqlite3/build/Release/better_sqlite3.node'
was compiled against a different Node.js version using
NODE_MODULE_VERSION 83. This version of Node.js requires
NODE_MODULE_VERSION 89.
```

I often remember that I need to possibly use a different version of nodejs but I never remember how to tell which one.

The official NodeJS site has a table with version numbers and their corresponding `NODE_MODULE_VERSION` [available here](https://nodejs.org/en/download/releases/).

In the case of this error, I think I probably want to downgrade to `Node.js 14.x`? It's all very confusing.
