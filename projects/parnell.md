---
category: projects
description: A previous project of mine that interactively mapped out parking tickets issued in the Parnell area over a period of a few years
ongoing: false
slug: parnell
tags:
  - maps
  - nz
  - projects
  - traffic
  - visualisation
title: Most ticketed parking spots in Parnell, Auckland
---

This little project was written back when I worked at [Xero](https://xero.com/nz/), in one of our older Auckland offices.

There was a [Slack](https://slack.com) channel dedicated to sighting of the local parking warden because the surrounding area just really lacked parking. There were some parking buildings but they changed something like $28/day (!)

While I didn't drive at the time, I was wondering if it would be possible to create a heatmap showing the most commonly ticketed parking spots around [Parnell](https://en.wikipedia.org/wiki/Parnell,_New_Zealand).

I'll write about it more some other time but in short, I filed an OIA for parking tickets over a 2 year period, converted a big spreadsheet into GeoJSON and then added a time dimension to each ticketed area.

The result is an interactive map where you can change the time of day to see the average ticketing increase and decrease throughout the day.

The idea was that if you invert this information, you can find the spot least likely to be ticketed.

You can play around with the project just below but if you'd like to see a full screen version, or you have iframes disabled, then you can [check it out here](https://parnell.utf9k.net).

<iframe src="https://parnell.utf9k.net" style="height: 500px;" allowfullscreen></iframe>
