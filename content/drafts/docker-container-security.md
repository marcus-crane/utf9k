path: /blog/docker-container-security
date: 2018-08-25
title: A little bit about Docker container security

[Docker](https://www.docker.com/) is a really neat tool that makes life easier. You don't have to worry about messy installations that require a heap of configurations or leave a bunch of temporary files around. Well, that's the simple overview anyway.

Like a number of nice things that just work, there's a default configuration behind the scenes. If you're a [Docker Compose](https://docs.docker.com/compose/) user, all of the networking is rigged up behind the scenes but it's worth taking a look at before you deploy to production. Admittedly, I didn't get around to this until this week when it bit me in the butt.

In particular, the [Redis](https://redis.io/) container I use to store the data for my stats page was misconfigured and accessible from the outside work. I figured this would happen eventually but it wasn't a priority seeing as Redis just stores blobs of JSON. Having said that, it would be technically be possible for someone to modify the blobs inside of it. An easy attack that could cause my stats page to display malware links and inappropriate images.

Mind you, nothing actually happened but let's rewind a bit and follow the series of events

## Earlier that week
