---
date: 2026-09-11T00:20:00+13:00
description: This was bound to happen sooner or later
slug: mapbox-bill
title: A nice big Mapbox bill, thanks to crawlers
---

Last month, I was browsing my inbox on a weekend morning and I was surprised to see a sizable bill from Mapbox of all places.

![](https://cdn.utf9k.net/blog/mapbox-bill/invoice.png)

This came as a big of a surprise to me as I don't actively use Mapbox.

I had to think for a bit and the only project that came to mind was [this one](https://utf9k.net/projects/parnell) from almost 10 years ago.

In short, I had asked [my local council](https://www.aucklandcouncil.govt.nz/) for parking ticket data for the area around the office that I worked, which I then plotted on a map faceted by both time and weekday.

It was a pretty fun project to add to my portfolio but once it was done, I threw it up on a custom domain and never really looked at it again.

All of the map data was stored as static JSON so it seemed odd to me that it would be generating any cost at all.

Opening up Mapbox, I pretty quickly found this unholy sight:

![](https://cdn.utf9k.net/blog/mapbox-bill/usage.png)

It only took a few seconds for Google's ["non-secrets are now secrets"](https://trufflesecurity.com/blog/google-api-keys-werent-secrets-but-then-gemini-changed-the-rules) fiasco to come to mind but on closer inspection, it seems that this is just the result of automated scrapers.

Having said that, to date I haven't seen this issue written about and I didn't obviously spot anything when doing a quick glance at the time so I wonder how widespread this is.

Anyway, I didn't particularly feel like paying $500 USD for something that is functionally not my problem, as far as key design so I filed a support ticket.

![](https://cdn.utf9k.net/blog/mapbox-bill/support-initial.png)

I was a bit confused about this line:

> If you haven't used Mapbox for a while, it's possible that an old token might have been used, leading to these charges.

Of course, when I made this project 10 years ago, the "old tokens" were the only tokens so presumably the charges were unavoidable.

While filling out the various questions, I went to go check if my registered credit card was still valid and realised that there wasn't one set at all so Mapbox had no way to charge me.

Normally I would take the hit if it was deserved but a) this bill was a bit much and b) this really seemed like a design issue that no customer could have reasonably forseen so it didn't seem appropriate to be on the hook for it.

With that, I thought I'd try to be sneaky and delete my account... which worked!

Shortly after that, Support got back to me:

![](https://cdn.utf9k.net/blog/mapbox-bill/support-closure.png)

To Mapbox's credit, it seemed that they're taking on any abusive charges as a result of these older tokens and they were good sports about the fact that I just sidestepped the invoice regardless.

I assume my account is not truly cleaned up because I have still been receiving payment reminders that threaten to delete my already-deleted account.

![](https://cdn.utf9k.net/blog/mapbox-bill/deactivation.png)

Just for completeness, Mapbox did give me a heads up when the spike in tile requests started:

![](https://cdn.utf9k.net/blog/mapbox-bill/warning.png)

But... I didn't notice it at all among the usual flood of email.

It probably didn't help that Mapbox seemed to have restarted their marketing emails about a month prior so which is always a good way to train users to start ignoring your communications.

![](https://cdn.utf9k.net/blog/mapbox-bill/marketing.png)

I figure they probably hired a new marketing person who revived a dormant mailing list to show that they're doing something?

![](https://cdn.utf9k.net/blog/mapbox-bill/job-advert.png)

How's that for a guess!
