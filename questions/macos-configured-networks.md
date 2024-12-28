---
category: questions
description: In which I remind myself how to configure macOS networks via the terminal
output: src/content/questions
publish: true
slug: macos-configured-networks
tags:
  - macos
  - networking
title: How can I view configured networks in my macOS terminal?
---
Let's assume you have multiple networks set up under `System Preferences > Networks`.

You might have "Work" which has a bunch of proxy configuration specified and "Home" which just disabled proxy configuration.

If you left the former "Work" network selected, then went to a place that can't access the proxy server, you wouldn't be able to access the internet and vice versa.

To make automating this a little bit easier, there's a command line tool called `scselect`

Here's an example of what it looks like in action:

```bash
> scselect
Defined sets include: (* == current set)
 * <guid> (Work)
   <guid> (Home)
```

In this example, we can see the `Work` network is selected.

Now we wanted to change to the Home network, you could do so manually in `System Preferences` or you can run `scselect` with the name of the network you want to change to like so:

```bash
> scselect Home
CurrentSet updated to <guid> (Home)
> scselect
Defined sets include: (* == current set)
   <guid> (Work)
 * <guid> (Home)
```

As you can see, the `Home` network is now selected.

I only recently discovered this tool so I haven't automated it yet but it's probably feasible to have a file with your working hours and then if it's within those hours, toggle on the `Work` network (and all of the proxy configuration that comes with it)

The reason you might want to use a schedule and not eg; WiFi name is that you might be working from home over a VPN for example.
