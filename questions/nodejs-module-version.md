---
category: questions
description: In which I remind myself how to determine the value of NODE_MODULE_VERSION
slug: nodejs-module-version
tags:
  - javascript
  - nodejs
title: How can I find my current NODE_MODULE_VERSION?
---
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
