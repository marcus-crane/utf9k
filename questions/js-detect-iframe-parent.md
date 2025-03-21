---
category: questions
description: A small Javascript snippet useful for detecting if the host frame is an iframe
lastmod: 2021-06-24
slug: js-detect-iframe-parent
tags:
  - iframe
  - javascript
title: How can I determine if my code is inside of an iFrame?
---
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
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}

if (insideIframe()) {
  // perhaps change the size of something or just act differently
}
```
