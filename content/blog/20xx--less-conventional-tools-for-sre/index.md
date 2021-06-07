---
title: "Less conventional tools for SRE"
slug: "less-conventional-tools-for-sre"
date: "2099-06-01T22:00:00+1300"
category: "blog"
draft: true
tags:
- "monitoring"
- "rss"
- "search"
- "sre"
- "software"
- "twitter"
---

When it comes to trusted methods of monitoring, incident management and *ahem* engineering the site to be reliable, you can't go past the [books that started it all](https://sre.google/books/).

Today we'll be talking about some untrusted methods. I find them personally useful and they can come in handy in a pinch. Let's not pretend that all workplaces, or even departments, are buffed with [Fisher's Intuition](https://ffxiv.gamerescape.com/wiki/Fisher%27s_Intuition) after all.

## RSS

Isn't that dead?

I'll be demoing this using [Feedbin](https://feedbin.com) but any RSS reader will do. I just happen to like Feedbin.

One very useful aspect of most non-custom status pages is that they come equipped with an RSS feed. Here's how my setup looks.

{{< image src="statuspages.png" >}}
  A screenshot of the Feedbin UI showing a status page category. A number of popular services such as Azure, Google Cloud Platform and Amazon Web Services are visible.
{{< /image >}}

This in itself may not seem very useful but once you start to follow enough status pages, you can infer some interesting information.

Let's take a trip back in time to March 2021, when Microsoft's [Azure Active Directory](https://azure.microsoft.com/en-us/services/active-directory/) suffered [a major outage](https://rcpmag.com/articles/2021/03/16/what-happened-azure-ad-outage.aspx) which I have already [referenced once before](https://utf9k.net/blog/you-can-always-count-on-sales/).[^outage]

As mentioned, I use [Feedbin](https://feedbin.com/) myself which I happily pay a monthly fee for but there are plenty of other readers like [Newsblur](https://newsblur.com/) or if you're up for self-hosting, [Miniflux](https://miniflux.app/) seems to have a good reputation.

If you do try out Feedbin, check out the [Notifier](https://feedbin.com/notifier) app too. I have it configured to send me a push notification whenever the Azure status page changes. That way, if I receive an alert at the same time, I can get a headstart on what might be a probable cause.

[^outage]: It's actually the incident that made me realise this interesting quirk of RSS and the overall inspiration for this post.
