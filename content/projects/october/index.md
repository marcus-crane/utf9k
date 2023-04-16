---
title: "October"
category: "projects"
slug: "october"
ongoing: true
description: "A project of mine that allows Kobo users to sync their highlights to Readwise. It solves a problem in my workflow and I use it quite regularly."
tags:
- "ereader"
- "golang"
- "kobo"
- "react"
- "readwise"
- "sqlite"
- "wails"
---

I'm a user of [Readwise](https://readwise.io) which is a service that allows you to import all sorts of highlights from books and [articles](https://readwise.io/read) through to tweets and even [comments](https://chrome.google.com/webstore/detail/comments-to-readwise/mbpckcijlikkkakedodgpgkdmgbdogmp)[^1].

There is unofficial official support for Kindle and iBooks, by which I mean Readwise supports those sources but they are still not officially sanctioned (or known!) by Amazon and Apple respectively.

Kobo, which is the primary competitor to Kindle, has lots of nice eReaders but historically Readwise has had no support for them as they don't have a web UI to scrape.

The other part of the problem is that getting your highlights off of your device is very fiddly for technical users, and nigh-on-impossible for non-technical users as it requires performing SQL queries against a [SQLite](https://www.sqlite.org/index.html) database.

This is where October comes in. It was created primarily to scratch my own itch. While I'm perfectly capable of extracting highlights from my device, I also aspire to do as little work as possible.

![A screenshot of October. Visible is a macOS window in the foreground with the background wallpaper visible behind it. The window shows that a Kobo Libra H20 is currently connected. On the right is a single button that asks if the user would like to sync 249 highlights to Readwise. At the bottom is a toast saying that 217 highlights were sent to Readwise successfully.](selector_main.png)

This first version is very sparse and gives the user very little option besides syncing their highlights. It works well for myself, and has helped a few users but it doesn't provide much ability to introspect the upload process or control eg; which books are uploaded.

I've begun work on a rewrite from the ground up which provides more control and insight to the end user.

At the time of writing, October is promoted within Readwise itself as the only option for uploading Kobo highlights. Previously, the Readwise team had released an integration for uploading store-bought highlights via Kobo APIs but this was unfortunately shut down.

On a technical level, October is comprised of a [React](https://reactjs.org/) frontend with the backend being powered by [Wails](https://wails.io/), a relatively new Golang framework for creating applications.

As the React frontend is bundled up into minimised HTML, this results in October weighing in at a measly 12 megabytes.

It features a Windows build, a fully code signed macOS version and a Linux version works experimentally[^2] but is not currently distributed.

Funnily enough, most of the reading I have done over the duration of this project has been making random highlights as a pseudo-integration test.

If I look at things from a big picture view, I would probably read a lot more if I just deleted this project and resorted to manually uploading my highlights!

Links:
* [Github](https://github.com/marcus-crane/october)
* [Website](https://october.utf9k.net/)


[^1]: There are lots of comments that I want to make notes on but Readwise doesn't support importing these. It makes sense of course since every website layout is arbitrary but to scratch my own itch, I made a Chrome extension that sends Hacker News and Reddit comments to Readwise.

[^2]: You're welcome to compile it if this is useful to you! I haven't looked into distribution and packaging plus last I checked, Linux support for Wails was solid but technically still marked as experimental.