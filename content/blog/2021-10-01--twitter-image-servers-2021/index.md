---
title: "Twitter, could you please fix your image servers?"
date: "2021-10-01T12:18:00+1300"
slug: "twitter-image-servers-2021"
description: "Throughout the year of 2021, I have run into a number of issues with Twitter's image servers"
category: "blog"
tags:
- "reliability"
- "sre"
- "twitter"
---

For anyone who knows me, it's no surprise that I'm horribly addicted to [Twitter](https://twitter.com). I joined back in 2009[^1] and I've fallen into more [technical rabbit holes](/blog/automation-right/) than I care to.

As a Twitter user who is Very Online, I love to theorise about why services go wrong and poke fun at corporations but as an [SRE](https://en.wikipedia.org/wiki/Site_reliability_engineering) myself, I find it very difficult to direct blame at people.

To be clear, I'll be talking about Twitter in the brand/persona sense and not as a reflection of the many people who I'm sure work tirelessly behind the scenes.

Some might say they're one in the same but my general principle is that taking aim at the marketing facade is fair game while the people themselves are off limits.

Not that we've addressed that, I feel like the Twitter "experience" has been degraded for a couple of months now with no real acknowledgement that I can see. In short, I've seen Twitter DMs intermittently fail to load, images being corrupted upon upload and [replies failing to load](https://twitter.com/wongmjane/status/1440428582308757507).

I'll be walking through the former two issues as they've been plaguing both myself and some friends the most.

When it comes down to it, I'm nothing but a simple armchair critic who doesn't have any real recourse in this abstract digital "customer support" hell we've constructed for ourselves.

Besides trying to raise awareness publically by writing this post, I have absolutely no idea if this has any traction internally.

With all that out of the way, let's have a look at what has been going on.

## Twitter DM images failing to load

This one has been bugging me and some Twitter mutuals for at least a couple of months now.

What happens is that intermittently, images will fail to load inside of direct messages.

Often times, it isn't that every image fails to load but one or two that have been recently uploaded. In hindsight, it may be that they all fail to load but prior images are loaded from cache now that I think about it.

It leads to frustrating discussions like this

![A Twitter direct message where the author posts an image that fails to load and the recipient says "huge L the image isn't loading".](twitter-dm-huge-l.png)

and this

![A Twitter direct message where the author receives an image that fails to load, asks "got any alt text?" and the other person responds with an accessibility style description of what is in the image. The tone of the interaction is one of lighthearted humour.](twitter-dm-alt-text.png)

and this

![A Twitter direct message where the author receives an image that fails to load and responds with "Guess who has $3 billion in revenue but still can't display photos in DMs :)"](twitter-dm-revenue.png)

It happened again just the other day and I did a little poking around. It seems that `ton.twitter.com`, the image server used for DMs[^2] times out.

![A screenshot of a terminal window with two curl commands. The first is requesting an image link over http port 80 in verbose mode. It responds as expected, with the content being a redirect to https. The second command is the prior link but accessed via https and it fails with a timeout.](timeout.png)

Upon closer inspection, only Port 80 (http) appears to be open with redirects to Port 443 (https) failing as there is no such port open based on a quick scan using `nmap`.

It's pretty frustrating and I've actually resorted to DMing on other platforms because of how unstable this can get at times!

## Images being mulched

For a period of about 2 weeks, images with transparency such as macOS screenshots were being absolutely destroyed upon upload.

{{< tweet user="benedictevans" id="1439536308326645767" >}}

You'll see it looks like someone took the spray can from MS Paint and went to town on the edges of the image. That is supposed to be a nice crisp drop shadow!

{{< tweet user="sentreh" id="1436092048914796545" >}}

While this appears to have been fixed recently, it was also not acknowledged as far as I can tell. Just kind of weirdly broken in plain sight for days on end.

## Closing thoughts

It doesn't take too much to conclude that these are both image related issues which is interesting but it would be a logical leap to conclude that there is any relation between the image processing pipeline and the DM image server so any further speculation would be just that.

As I mentioned before, I don't want to point fingers at any people but I will say that it frustrated me to no end seeing no acknowlegement of this happening continually.

Instead, right in the middle of those two transparency mulched images, what I experienced was [@TwitterEng](https://twitter.com/TwitterEng) was talking about mechanical keyboards.

{{< tweet user="TwitterEng" id="1437857022444138496" >}}

I'm being a bit flippant mind you since it can be true that one team is doing community building while another is working on technical issues of course but at the same time, the optics of it don't look great as someone experiencing this.

Anyway, really all I want is to be able to use DMs again reliably!

Instead, I can't help but feel that we're probably going to get the ability to use [an NFT as an avatar](https://twitter.com/TheSmarmyBum/status/1443259893411049475) or whatever else is cooking over there sooner than a fix :(

[^1]: In a few years, I'll have been on Twitter longer than I've been off it (ie; before I registered/before it existed)
[^2]: As far as I can tell, `ton` is used for DMs while `pbs` is used for the public timeline?
