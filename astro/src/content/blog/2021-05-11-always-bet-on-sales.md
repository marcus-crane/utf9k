---
title: "You can always count on sales"
date: "2021-05-11T18:23:00+1300"
description: "Complete system downtime won't stop the sales team from making a buck"
slug: "you-can-always-count-on-sales"
category: "blog"
tags:
  - "azure"
  - "business"
  - "microsoft"
  - "outages"
  - "reliability"
  - "sales"
---

For any readers who weren't aware, [Microsoft Azure](https://status.azure.com) suffered from a [major Azure Active Directory outage](https://rcpmag.com/articles/2021/03/16/what-happened-azure-ad-outage.aspx) back in March 2021.

A great deal of services were degraded while I was at work so I mostly spent March 15th, 2021 monitoring the situation and broadcasting status updates for fellow affected teams internally.

Most of the updates were just synthesised from Microsoft's various Twitter accounts which happened to be more up to date than the public status pages, but that's a story for another blog post.

Towards the end of the day, it got me wondering how widely Microsoft's own services were affected by this outage. I mean, they dogfood their product offerings after all, right? Apparently Sales doesn't, at least for any incoming enquiries.

If you go to the [marketing site for Azure Active Directory](https://azure.microsoft.com/en-us/services/active-directory/), you may notice a little "Chat with Sales" tab appear in the bottom right hand corner after all of the various scripts have loaded in the background.

Clicking on that tab reveals an [Azure Chatbot](https://azure.microsoft.com/en-us/services/bot-services/). It'll ask you which type of help you'd like and then you can select one of the follow categories:

- Technical support
- Business support
- Sales

I captured some footage following the dialogue path of these three options during the ongoing Azure AD outage so let's see what happens when selecting each of them.

## Technical Support

You might imagine that this would be the most important option when it comes to resiliency during any major outages. Of course, if you're an enterprise then you should really have an enterprise support plan but if you're a startup or an indie, this might be well outside your budget.

<video style="display: inherit; margin: 0 auto;" width="50%" controls>
<source preload src="https://cdn.utf9k.net/blog/always-bet-on-sales/01-technical.mp4" type="video/mp4">
Ah, sorry! It looks like your browser either hates the h264 codec or it just doesn't support the video tag.
</video>

Hmm, I don't know about you but it looked like nothing happened and our request just disappeared into the ether!

## Business Support

Now surely if a technical person can't get through, business support is much more likely to make it. Nothing says importance like an executive with a credit card after all.

<video style="display: inherit; margin: 0 auto;" width="50%" controls>
<source preload src="https://cdn.utf9k.net/blog/always-bet-on-sales/02-business.mp4" type="video/mp4">
Ah, sorry! It looks like your browser either hates the h264 codec or it just doesn't support the video tag.
</video>

No dice, basically the same exact outcome. I expected better! Pssh.

## Sales

Now we know for sure that Sales isn't going to work if the former two aren't.

In any sane business, all attention should be directed towards supporting paying customers and alleviating any of their concerns.

It'd be ridiculous to focus on some potentially unrealised future revenues!

<video style="display: inherit; margin: 0 auto;" width="50%" controls>
<source preload src="https://cdn.utf9k.net/blog/always-bet-on-sales/03-sales.mp4" type="video/mp4">
Ah, sorry! It looks like your browser either hates the h264 codec or it just doesn't support the video tag.
</video>

Hmm, perhaps I was wrong.

## What is it supposed to look like?

I actually went through this same dialog flow, now two months down the track, and I was under the impression that all three options put you into a live call.

It seems that both Technical and Business Support options simply redirect you to [submit a support ticket](https://azure.microsoft.com/en-us/support/create-ticket/).

That makes sense but it also begs the question "How was this unavailable?".

Presumably the bot is querying for the support ticket URL in some backend every time you click on the button or something equally unnecessary.

I had a quick poke around the acres of websocket events using the developer tools in my browser but there are like 5 events fired off just from clicking a button. It seemed like it was going to be a mess to dig through so I didn't even bother.

Anyway, there's an old adage that's probably relevant here. I don't actually know how it goes but basically, if you ever need to get a hold of someone at a company, just call the Sales department because they always pick up the phone.
