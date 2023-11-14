# How can I determine if my code is inside of an iFrame?
01 January 0001

I suppose they aren&#39;t used too much anymore but I&#39;ve started using them as a preview window for my [projects](/projects) page.

It can be handy to act different depending on an iFrame, such as scaling the view port.

You **can&#39;t** do something like this:

```css
iframe &gt; canvas {
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