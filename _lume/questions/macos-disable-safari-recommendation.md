---
category: questions
description: In which I remind myself how to get rid of that pesky notification
output: src/content/questions
publish: true
slug: macos-disable-safari-recommendation
tags:
  - macos
  - safari
  - software
title: How can I disable the 'Try the new Safari' notification?
---
This question [was trending](https://news.ycombinator.com/item?id=28361730) on [Hacker News](https://news.ycombinator.com) but the thread in question never addressed it.

Buried down in the comments was a technical fix [suggested by torstenvl](https://news.ycombinator.com/item?id=28362014).

Safari has a few configuration entries accessible via `defaults read com.apple.coreservices.uiagent`.

While I haven't tested this personally, `torstenvl` recommended stubbing out the notification with the following commands:

```shell
defaults write com.apple.coreservices.uiagent CSUIHasSafariBeenLaunched -bool YES
defaults write com.apple.coreservices.uiagent CSUIRecommendSafariNextNotificationDate -date 2050-01-01T00:00:00Z
defaults write com.apple.coreservices.uiagent CSUILastOSVersionWhereSafariRecommendationWasMade -float 99.99
```

If this works for you, let me know. I'm currently running the macOS Monterey beta at the time of writing and as I've already used Safari, I don't believe I get this notification anymore.
