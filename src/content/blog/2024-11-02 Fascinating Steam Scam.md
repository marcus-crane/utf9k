---
category: blog
date: 2024-11-02T17:00:00+13:00
description: I enjoyed almost being tricked but really shouldn't
output: src/content/blog
publish: true
slug: fascinating-steam-scam
tags:
  - phishing
  - scam
  - steam
title: A fascinating attempt at Steam phishing
---

> [!caution] Beware what you click on!
>
> This post contains screenshots for a phishing website.
> 
> I won't be typing out the URL but you can infer the site from the screenshots in this post of course.
>
> While I encourage you to have fun poking around if you want, I'm not responsible if anything goes wrong!

Earlier today, I received a phishing attempt to try and steal my Steam account. It didn't work but I did think it was quite interesting!

I don't have the chat log handy but at some point, someone had sent me a friend request.

Most of the time, they're just people who are looking to do trade offers for some rare TF2 items that I have attached to my account and occasionally I'll accept their invites just for kicks.

At a glance however, this person didn't appear to be a trader so I figured I'd see why they sent me an invite.

![](https://cdn.utf9k.net/blog/fascinating-steam-scam/steam-profile.png)

In hindsight, the explicit mention about not doing any trading is probably a bit of reverse psychology since it's a fairly common issue on Steam so it defuses expectations that this request might be from a malicious user.

I had accepted their invite about 2 weeks ago and promptly forgot about it. They sent me a message about a week ago asking if I was busy, which I didn't reply to and then another earlier today asking if I had a second.

My default was still to assume there was some sort of catch here but I figured I'd humour them so I said "Sure, what's up?".

A bit unexpectedly, they said they had just created a logo for a friend's university esports team and wanted to know if I would give them feedback.

I've seen the "Can I show you something and get your feedback" format at least twice before, admittedly without understanding the payoff, but it seemed harmless enough.

They sent through this logo, which was supposedly made for an esports team at the [University of Exeter](https://en.wikipedia.org/wiki/University_of_Exeter), who themselves do very much have a [real esports team](https://www.instagram.com/exeteresports) with their own logo.

![](https://cdn.utf9k.net/blog/fascinating-steam-scam/exeterlogo.jpg)

This may have been their actual logo at some point but it seems to have changed since then if that was the case.

I said they did a good job and their next step was to ask me if I would vote for it in a competition.

At this point, I assumed I was talking to a university student who was going around, trying to farm upvotes for some competition which seemed harmless enough.

Normally I would bother but I had already gotten this far so I said, sure why not, assuming it would just be a simple button click.

They sent me a link for the following website.

![](https://cdn.utf9k.net/blog/fascinating-steam-scam/homepage.png)

This isn't the actual page they sent me just yet but we'll start with the homepage at work our way there.

## Browsing around the place

At first glance, it all seems very above board.

There's some splashy Intel marketing at the top which makes you think that they have some sort of sponsorship deal going on.

It also has news posts that are all recent giving you the sense that this site is active so let's navigate over to the main news page and have a closer look.

![](https://cdn.utf9k.net/blog/fascinating-steam-scam/news.png)

You might note that all of these dates are relative, which makes them feel very recent but we're assuming that these dates are relative to right now.

If you glance over to the bottom left, you might spot the headline "2023 Society of the Month" which was a bit more than 2 weeks ago. A few articles also have 2023 in their URLs while the articles themselves have been updated to mention the year 2024.

When I spot something like this, I imagine it a bit like The Truman Show where it's possible to peak behind the curtain if you can just find some place so far from normal view that it hasn't been polish up and there's always one: The privacy policy.

![](https://cdn.utf9k.net/blog/fascinating-steam-scam/privacypolicy.png)

I was quite surprised but then I realise in the age of LLMs, it really doesn't cost much to generate all of this text in a convincing fashion. In fact, it doesn't actually cost anything at all besides time.

As we'd later find out though, this site wasn't actually made from scratch like I had initially thought it might be, but was ripped from somewhere else and modified. For actual esports type, it might be obvious what the source is but I had no idea personally.

One last thing that struck me as weird, but not unreasonable for a community website, was that some of the page transitions had this exceedingly long loading page.

![](https://cdn.utf9k.net/blog/fascinating-steam-scam/loading.png)

This would last anywhere from a few seconds up to 10 seconds at which point, the following warning would pop up.

![](https://cdn.utf9k.net/blog/fascinating-steam-scam/lowconnection.png)

I actually think this is unrelated to the scam itself and was just someone's attempt at putting a loader that only disappears once all of the content has lazily loaded in which... defeats the purpose of lazy loading in the first place.

## The actual scam itself

With that introduction out of the way, here is the actual page that I was sent.

As a refresher, I'd been shown a logo supposedly created for a university esports competition and asked if I would vote for it.

![](https://cdn.utf9k.net/blog/fascinating-steam-scam/pointstable.png)

Here we have a bunch of text that seems like a legitimate disclaimer at a glance followed by a points table. It's cut off but the University of Exeter, which was the logo sent to me, is in third place.

I'm not too sure how much thought goes into designing these things but I assume the play here is that you see this person can feasibly win but your vote counts more than every given how close the race is.

With that in mind, you got to click "Vote" and you're presented with this pop up.

![](https://cdn.utf9k.net/blog/fascinating-steam-scam/vote.png)

Ok, you have to log in? Sure, that seems reasonable for voting in a competition. You don't want people inflating the counts are all. Arguably, that's what is happening in the first place, just on a longer time scale but anyway, let's click Log in.

At this point, I'm thinking it'll probably be an OAuth screen but I don't see them enough to remember whether Steam actually has support for that. I'm fairly certain it does?

![](https://cdn.utf9k.net/blog/fascinating-steam-scam/fakesteamlogin.png)

Now, here's where it gets fascinating.

At a glance, this is a normal popup window asking you to login. You glance up at the popup URL and sure enough, you're on the official Steam website.

Hmm, that font is a little weird though and what's all that junk in the URL bar? This doesn't seem like an OAuth screen.

What we're looking at is a fake popup window rendered entirely in Javascript, including a working close button. You can even drag the window around the browser space but it falls apart if you try to drag beyond the edges of the browser chrome.

![](https://cdn.utf9k.net/blog/fascinating-steam-scam/clipping.png)

Admittedly, my first thought when I saw this screen wasn't "Weird popup" but "This is already too much effort" at which point I backed out and started browsing around some more.

If you recall how I mentioned those long loading screens, that actually appeared when first clicked vote. I wasn't entirely paying attention but the second time, I had my dev tools open for an unrelated reason and whoever was behind the site had left a `debugger` statement so the login modal wouldn't actually work at all funnily enough.

![](https://cdn.utf9k.net/blog/fascinating-steam-scam/steamdebugger.png)

You'll also note that the screenshot above is the source of the popup window, which hosts the login page on an entirely different domain.

That domain is fronted by Cloudflare so I ended up filing an abuse report. It took me a couple of times though because the report form captcha failed to load at first so I almost considered giving up on the idea.

While I'm not familiar with how the Steam QR login works in any detail, I did note that the QR code presented was a PNG image that changes every so often while the real login page has a QR code generated as an SVG. The real thing might have changed in the year or more since the scam website seems to have been put together though.

The QR code does appear to point towards Steam's actual infrastructure but I imagine any unsuspecting user would be prompted on mobile with a location that isn't their own? I wasn't up for trying and finding out.

![](https://cdn.utf9k.net/blog/fascinating-steam-scam/qrcode.png)

This was the QR code presented on the scam site but the real QR codes also point to `https://s.team` for reference.

## What gave it away?

More than anything, the very first thing that seemed off appeared when I hit view source. I tend to do this on websites just as a habit out of curiosity rather than because I'm expecting anything bad.

When I first hit this website, supposedly for a community related to UK universities, I was confused to see Baidu, the Chinese search engine, appear as one of their meta tags.

![](https://cdn.utf9k.net/blog/fascinating-steam-scam/baidu.png)

It didn't immediately register as a red flag but it did strike me as very weird. In fact, while those site verification tags are very common, I don't recall ever seeing on for Baidu until now?

While I eventually had the red flags go off with the Steam login popup due to Chrome Dev Tools, it still took me way too long to scrutinise the logo of the site.

I've seen a lot of amateur gaming websites in my time, which is not a bad thing at all so I don't put much stock in it but for a site allegedly with enough clout to have Intel banners and a reporter or two writing articles every few days, "Gaming League" is an exceedingly generic logo.

![](https://cdn.utf9k.net/blog/fascinating-steam-scam/fakelogo.png)

I ended up finding the origin accidentally when I went to search whether any of these alleged esports teams actually existed.

By chance, I happened to pick Warwick ESports whose website had the following championship photo and a curiously familiar colour gradient on one of the background logos.

![](https://cdn.utf9k.net/blog/fascinating-steam-scam/warwickesports.jpg)

It turns out that most of the site we had seen was ripped off from National Student Esports, better known as [NSE](https://nse.gg).

By the time I had wrapped up the last bits of the mystery, the original scammer in question messaged me again asking if I had voted.

I replied "Ah sorry, I get distracted! Is this where I was meant to vote?" and pasted the link for the dodgy Steam site that rendered within the popup.

Unfortunately, they instantly went offline and I haven't heard from them since.

I'm sure they were probably one of a number of people involved. I imagine some of the accounts you could get can be quite lucrative, particularly with the market value for some of the older TF2 items floating around in dormant accounts.

I did notice that the underlying Steam login domain was loaded in dynamically as well so I'm guessing their operation must have moved around at least once and probably will continue to do.

![](https://cdn.utf9k.net/blog/fascinating-steam-scam/config.png)

Ah well, better luck next time!