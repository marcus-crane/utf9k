---
title: "You can always count on sales"
date: "2021-05-09T17:07:00+1300"
slug: "you-can-always-count-on-sales"
category: "blog"
draft: "true"
tags:
- "azure"
- "business"
- "microsoft"
- "outages"
- "reliability"
- "sales"
---

For the unaware, [Microsoft Azure](https://status.azure.com) suffered from a [major Azure Active Directory outage](https://rcpmag.com/articles/2021/03/16/what-happened-azure-ad-outage.aspx) back in March 2021.

A great deal of services, including those used by my current employer, were degraded at best while I was at work so I mostly spent March 15th, 2021 monitoring the situation and broadcasting status updates to affected teams.

Most of the updates were just synthesised from Microsoft's various Twitter accounts since they happened to be more up to date than the status pages, but that's a story for another blog post.

Towards the end of the day, it got me wonder if Microsoft's own services were affected by this outage since they dog food, right? Well, apparently everyone but sales.

If you go to the [marketing site for Azure Active Directory](https://azure.microsoft.com/en-us/services/active-directory/), you'll likely notice a little "Chat with Sales" tab appear in the bottom right hand corner.

An [Azure Chatbot](https://azure.microsoft.com/en-us/services/bot-services/) will ask you which type of help you'd like and then you can select one of the follow categories:

- Technical support
- Business support
- Sales

I captured some footage of these three options during the ongoing Azure AD outage so let's see what happens when selecting each of them.

## Technical Support

You might imagine that this would be the most important option to keep functioning, given that a great number of services are degraded. Of course, if you're an enterprise, you should really have an enterprise support plan but if you're a start up or an indie, this might be well outside the scope of your budget.

<video style="display: inherit; margin: 0 auto;" width="50%" controls>
<source preload src="01-technical.mp4" type="video/mp4">
Ah, sorry! It looks like your browser either hates the h264 codec or it just doesn't support the video tag.
</video>

Hmm, I don't know about you but it looked like nothing happened and our request just disappeared into the ether!

## Business Support

Now surely if a technical person can't get through, business support is much more likely to make it.

<video style="display: inherit; margin: 0 auto;" width="50%" controls>
<source preload src="02-business.mp4" type="video/mp4">
Ah, sorry! It looks like your browser either hates the h264 codec or it just doesn't support the video tag.
</video>

No dice, basically the same exact outcome.

## Sales

Now we know for sure that Sales isn't going to work if the former two aren't. All attention should be on alleviating the concerns of existing, paying customers rather than some potentially unrealised future revenues.

<video style="display: inherit; margin: 0 auto;" width="50%" controls>
<source preload src="03-sales.mp4" type="video/mp4">
Ah, sorry! It looks like your browser either hates the h264 codec or it just doesn't support the video tag.
</video>

Hmm, maybe not.

## What is it supposed to look like?

I actually went through this same dialog flow, now two months down the track, and I was under the impression that all three options put you into a live call.

It seems that both Technical and Business Support options simply redirect you to [submit a support ticket](https://azure.microsoft.com/en-us/support/create-ticket/).

That makes sense but it also begs the question "How was this unavailable?".

Presumably the bot is querying for the support ticket URL in some backend every time you click on the button or something equally insane.

I had a quick poke around the acres of websocket events but there's like 5 events fired off just for clicking a button so it just seems like a waste of time.

Anyway, there's an old adage that is relevant here. I don't actually know how it goes but basically, if you ever need to get a hold of someone at a company, just call the Sales department because they always pick up the phone.
