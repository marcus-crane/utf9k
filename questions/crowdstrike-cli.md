
---
category: questions
description: In which I fumble trying to use a security tool
lastmod: 2025-03-18
slug: crowdstrike-cli
tags:
  - security
title: How can I view Crowdstrike configuration on a given host?
---

A little while ago, I was asked about some EC2 hosts running Crowdstrike, particularly which versions they were running.

While Crowdstrike was running as a systemd daemon, it wasn't immediately clear how to poke at it to get at any configuration info.

It turns out that Crowdstrike's daemon shipped with a CLI tool available at `/opt/CrowdStrike/falconctl`.

You can use the `-g` flag to "GET" options followed by whichever flag might be useful. `-h` is your field here.

For getting the version, I was able to do that like so:

```console
$ /opt/CrowdStrike/falconctl -g --version
```
