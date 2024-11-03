---
category: projects
description: Three years of towing data being simulated all at once
ongoing: false
output: src/content/projects
publish: true
slug: towing
tags:
  - maps
  - nz
  - projects
  - traffic
  - visualisation
title: Vehicles towed in Auckland, New Zealand
---

![A screenshot of the towing.utf9k.net website. A map of the city of Auckland, New Zealand is visible with lots of little orange streaks visible on the map. Each streak represents a vehicle that was towed over a 3 year period. Each streak is in motion, heading to where they were towed to.](https://cdn.utf9k.net/projects/towing/website.png)

Quite a few years ago, I found myself sitting outside of a cafe. I was staring across the street at a carpark and noticed that every so often, [a tow truck would pull in, towing a car behind it.](https://www.google.com/maps/@-36.8647825,174.7607181,3a,75y,78.37h,86.35t/data=!3m6!1e1!3m4!1sJuwWzp4GFW4TPKe0zlGP1A!2e0!7i16384!8i8192?entry=ttu).

This is perfectly normal of course but after a few of these, it occurred to me that it might be interesting to see what that looks like from a birds eye view. Surely it would look like some of kind of stream where the towing yard is a hot spot with tentacles sprawling out all over the city.

It took me quite a few years but I managed to go from this idea to a simulation that shows 3 years worth of vehicles, represented as orange lines, flowing throughout the city to their final destination.

You can't just pluck out where a vehicle was picked up and taken to because that makes a straight line. To have the full effect, you need to figure out a likely route for every single instance and then plot a line across all of the streets in between for your simulated vehicle to follow.

I'm pretty proud of the final result which is probably one of the more advanced side projects I've put together, considering it started with a big messy spreadsheet and ended up with an interactive visualisation.

You can play around with the project just below but if you'd like to see a full screen version, or you have iframes disabled, then you can [check it out here](https://towing.utf9k.net).

If you'd like to read a detailed write-up on how this was made, or follow along with creating your own version, you can find those details in [this blog post](/blog/spreadsheet-to-visualisation).

<iframe src="https://towing.utf9k.net" style="height: 500px;" allowfullscreen></iframe>
