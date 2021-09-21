---
title: "Has Twitter been flaky for anyone else lately?"
date: "2021-09-22T11:00:00+1300"
slug: "twitter-flakiness-in-2021"
draft: true
category: "blog"
tags:
- "sre"
- "twitter"
---

For anyone who knows me, it's no surprise that I'm horribly addicted to [Twitter](https://twitter.com). I joined back in 2009[^1] and I've also had my fair share of [run-ins with internal services](/blog/automation-right/).

As a Twitter user who is Very Online, I love to theorise about why services go wrong and talk shit about corporations but as an SRE myself, I find it very difficult to direct blame at people.

To be clear, I'll be talking about Twitter in the brand/persona sense and not as a reflection of the many people who work tirelessly behind the scenes.

Some might say they're one in the same but my general principle is that taking aim at the marketing facade is fair game while the people themselves are off limits.

With that clarified, I feel like the Twitter "experience" has been degraded for a couple of months now with no real acknowledgement that I can see. In short, I've seen Twitter DMs intermittently fail to load, images being corrupted upon upload and recently Twitter replies failing to load.

I'll be walking through each one with examples but I have no insight into what's going on here. More than anything, I'm just interested to know if others have spotted these or further symptoms.

I honestly have no idea how to figure out if any of this stuff is being actioned or not besides tooting the social media frustration horn!

## Twitter DM images failing to load

This one has been bugging me and some Twitter mutuals for at least a couple of months now.

Intermittently, an image or two will fail to load. They upload file but they don't render properly for the other person, as if they've gotten stuck in a processing pipeline or something to that effect.

{{< image src="twitter-dm-huge-l.png" >}}
{{< /image >}}

[^1]: In a few years, I'll have been on Twitter longer than I've been off it (ie; before I registered/before it existed)
