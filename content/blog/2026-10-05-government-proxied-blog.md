---
date: 2026-10-06T01:38:00+13:00
description: I think there are worse uses of taxpayer money than reading my website
slug: government-proxied-blog
title: Serving my blog via a govt.nz domain
---

Earlier this year, I was proud to say that my blog was available via a government website and it looked like this:

![](https://cdn.utf9k.net/blog/government-proxied-blog/proxied-clean.png)

Well, just between you and me, that's a nice looking recreation of the only screenshot I thought to take at the time but it really did look like that!

Unfortunately, I didn't take many notes at the time so this post may be a bit meandering but let's rewind to the start.

## I can access government websites on my phone for free?

The New Zealand Government runs many services that more people should know about and [https://portal.zero.govt.nz](https://portal.zero.govt.nz) is one of them.

It looks like this if you were to visit the homepage:

![](https://cdn.utf9k.net/blog/government-proxied-blog/zero-directory.png)

Not only does it serve as a directory of sorts but more importantly, any visits to the listed websites are covered entirely by your mobile provider.

These supported domains are all structured using slugified domain names such as `https://www-diabetes-org-nz.zero.govt.nz`.

They used to use hashes, as seen in the screenshot at the top of this post, but that changed some time after I reported my fun exploit.

## How does this all work?

Thanks to the power of the [Official Information Act (OIA)](https://utf9k.net/blog/nz-oia-guide/), we actually have an architecture diagram released as part of [this OIA response](https://fyi.org.nz/request/25573-information-on-the-zero-govt-nz-service) a few years back

![](https://cdn.utf9k.net/blog/government-proxied-blog/zero-architecture.png)

While we don't get too much detail, the implication here is that your cellular provider sees traffic to `*.zero.govt.nz` and covers the tab.

That same OIA response outlines that `zero.govt.nz` is "a collaborative effort between several government agencies" which is "funded through a mix of staff time contributed by agencies, and a club fund to pay for third party services, such as, web hosting, internet traffic charges, and third tier support".

We have the portal at `portal.zero.govt.nz`, a [Squid Proxy](https://en.wikipedia.org/wiki/Squid_(software)) which I believe was served at `my.zero.govt.nz` and an [ICAP server](https://en.wikipedia.org/wiki/Internet_Content_Adaptation_Protocol) in the mix although I'm not sure if that was ever internet-facing.

Oddly, there is also [zero.education.govt.nz](https://zero.education.govt.nz/) which presumably runs a copy of the same infrastructure but is weirdly not zero-rated. That would seem to defeat the whole point but perhaps it was an older deployment before graduating to its own dedicated domain.

## Accessing custom websites

The series of events that led to me potentially serving my blog at zero cost to the user went something like this.

I had been aware of `zero.govt.nz` in the past and ended up on it again when browsing around for reasons I forget.

Clicking around a few of the school websites quickly led to a [Squid](https://en.wikipedia.org/wiki/Squid_(software)) error page which, off the top of my head, included a reference to `https://my.zero.govt.nz:8889/429.php` within the page's source code.

I don't think digging around `my.zero.govt.nz` surfaced much but at some point going back and forth, I ended up on a webpage with the format `https://portal.zero.govt.nz/ZMD5/blah.govt.nz`.

Having seen hashes all day, I realised that this must be an unresolved URL so I plug in `https://portal.zero.govt.nz/ZMD5/utf9k.net` and sure enough, I end up seeing this:

![](https://cdn.utf9k.net/blog/government-proxied-blog/proxied-banner.png)

This is quite fun but... there's that big banner in the way.

![](https://cdn.utf9k.net/blog/government-proxied-blog/proxied-devtools.png)

Wait a minute, their proxy is injecting CSS into my website but my website is controlled by me so how about I just deploy the strongest of all styling weapons (`!important`) and sure enough, it works.

![](https://cdn.utf9k.net/blog/government-proxied-blog/proxied-clean.png)

The one thing I was curious about but never got to test is whether this meant that my website was free to browse. Looking at the architecture diagram, this seems like it would have been the case!

## Final thoughts

While this seems relatively harmless on the face of it, you could imagine someone serving a scam page using this method.

Being taught to look for the green padlock was one thing but you really could not get more authoritative than hosting your content via a real government domain.

It actually gets even trickier if you're abusing other mediums to make your link look even more authoritative.

Take this iMessage conversation for instance:

![](https://cdn.utf9k.net/blog/government-proxied-blog/imessage.jpg)

If you made a really authentic looking payment portal, coupled with a real government domain, I don't doubt that even I would get sucked in by that.

After my report, it seems that the proxy was locked down by having domains explicitly allowed based on their now-slugified hostnames but I have no idea what happened behind the scenes.

Looking back at the [OIA](https://fyi.org.nz/request/25573/response/96931/attach/4/1321951%20Response.pdf) I had mentioned, I wonder if the architecture changed a bit over time because it mentions that both a "Security Review Report" and pen testing were performed before launch but uhh, I dunno, this didn't seem super hard to stumble upon.

Ah well, it's patched up now anyway.

## Disclosure timeline

| Timestamp | Notes |
| --------- | ----- |
| 2026-06-21 @ afternoon | First successful proxying of my website after poking around. I do some [experiments](https://github.com/marcus-crane/utf9k/commit/e808784627867983aec2e5d8ee7da473b00731e9) to understand what the attack potential might be.  |
| 2026-06-22 @ 1pm | I spend some time during my lunch break writing up a repro, doing some final tests (and showing a couple of coworkers before it gets shut down) |
| 2026-06-22 @ 2 - 3pm(?) | I file a report with the [National Cyber Security Centre](http://ncsc.govt.nz/) detailing my findings |
| 2026-06-22 @ 3:31pm | Confirmation from the NCSC that my report has been received |
| 2026-09-04          | I follow up with the NCSC asking if the issue was resolved and mentioning that I'd like to do a writeup. In other words, I remembered that this had happened at all |
| 2026-09-23 | NCSC confirms that they've reached out to "the appropriate agency to confirm that they have no concerns"[^1] and that I should be fine to do a writeup if I don't hear anything back from the NCSC by the end of the week. |
| 2026-09-25 | I send a follow-up email telegraphing that I am going to do a writeup because it is now the end of the week |
| 2026-10-01 | NCSC follows up confirming that they have heard nothing back from the agency "so I assume they don't mind". |
| 2026-10-06 | I write and post this writeup |

[^1]: This is what the NCSC said verbatim. [This OIA](https://fyi.org.nz/request/25573/response/96931/attach/4/1321951%20Response.pdf) mentions that Te Whatu Ora provides the hosting infrastructure so maybe that's the agency in question?
