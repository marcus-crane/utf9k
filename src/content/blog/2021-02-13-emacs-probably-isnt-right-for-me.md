---
category: "blog"
date: 2021-02-13T17:41:00+13:00
description: "My confessions as a tooling alcoholic"
slug: "emacs-probably-isnt-right-for-me"
tags:
  - "emacs"
  - "productivity"
  - "workflow"
title: "Emacs probably isn't right for me"
---

I'm not someone who tends to wear my text editor on my sleeve, probably because I don't stick to just one anyway, but I've probably mentioned Emacs more than most in the last year or two.

I started out using it as a little bit of a joke more than anything and found myself pleasantly surprised.

Here are some of the highlights:

## Highlights

### org-mode

`org-mode` is always touted as a massive powerhouse, and having gone down the GTD rabbit hole and all that, it honestly is one of the most feature packed utilities you can find. Everything from basic tagging up to fully fledged time tracking.

As a general outliner tool as well, it's really nice being able to nest items without any end in sight and even link to headings within other files too.

### org-agenda

While `org-mode` lets you sprinkle `TODO` headings throughout your files, you still need some way to see an overview. Being able to hit a few keys and see a fully customisable pseudo-dashboard with upcoming tasks, appointments and even habit tracking is great.

### Literate programming

While this isn't strictly the domain of Emacs, `org-mode` makes it really easy to define blocks of code within a file and put commentary around them.

[Tecosaur](https://tecosaur.github.io/emacs-config/config.html)'s Emacs configuration is perhaps a prime example of what you can achieve. To be clear, that website and his dotfiles are one in the same. The code you see on that webpage **is** his configuration.

This is perhaps the strongest selling point for me. My Emacs configuration lives as a `.org` file, which is "tangled" (transformed) into a proper configuration file.

### Community

I'm not someone who considers myself part of many communities at all but I can definitely say that the parts of the Emacs community I checked out were definitely quite welcoming.

First and foremost, I was constantly surprised at the work that [Henrik Lissner](https://github.com/hlissner/doom-emacs) churns out seemingly every day.

His issue responses are not only carefully considered, but also light and humourous too. That extends to even his commit messages which users may never come across.

We actually crossed paths briefly a few years ago and while I didn't know it at the time, [Steve Purcell](https://twitter.com/sanityinc) would appear all over the Emacs ecosystem too.

I didn't realise his involvement only to discover that he not only is a huge contributor but even has a large hand in running [MELPA](https://melpa.org/#/)

Lastly, because my list isn't very long and I never really engaged in the community for the most part, I learned a bunch from trawling through the repos of [Jethro Kuan](https://github.com/jethrokuan) and [Tecosaur](https://github.com/tecosaur/).

## Lowlights

### Tooling Alcoholism

This is a term that I [first heard mentioned](https://youtu.be/dIjKJjzRX_E?t=82) a few years ago by [mpj](https://about.me/mpj) and it basically holds true.

Emacs, for me, is essentially the definition of tooling alcoholism because I can happily spend hours configuring it without actually achieving much at all.

Some of this extends to tools like `org-agenda` too. There's a temptation to have Emacs do it all and so I end up breaking my existing systems just to make them fit.

Let's take calendars as an example. I tried [org-caldav](https://github.com/dengste/org-caldav), which was kind of slow and some of the state got a little out of sync. I couldn't really figure out how to invoke the required keys to delete everything so I nuked the state files and it broke. At my old job, I also tried to make that interop nicely with [org-gcal](https://github.com/myuhe/org-gcal.el) which worked nicely but I don't use Google Calendar for my personal calendar. I discovered [org-mac-iCal](https://github.com/ndw/org-mac-iCal) which worked the best of the lot (no blocking sync required but refreshes can be a little slow) but I had to dig out a specific [fork](https://github.com/terjesannum/org-mac-iCal) that removed version checks because macOS was never expected to go past `10.x`.

Anyway, all this is to say, I started reading [RFC5545](https://tools.ietf.org/html/rfc5545) and thinking about how this could be made a much better process before realising that I actually don't care about calendars and being able to assign snippets to text to my calendar entries is not at all worth this amount of pseudo work.

I think calendaring was probably the most extreme variation but the tweaking is never ending.

### Mobile support

When it comes to using Emacs on mobile devices, I've tried a variety of applications and I think I'd say [beOrg](https://beorgapp.com/) for iOS and [Orgzly](https://github.com/orgzly/orgzly-android) for Android are definitely the nicest.

Even so, depending on what you're doing, some of the more niche settings in org may not be supported or require further configuration. One of the main selling points of beOrg is that it supports an entire Scheme interpreter but at this point, I'm about to black out from the aforementioned tooling alcoholism.

I should mention though that these are both TODO applications effectively. While Orgzly, from memory, leans more towards outline editing than beOrg does, I still got the feeling that they aren't necessarily designed to be considered as "note taking" apps, in so much as an outline is effectively a bunch of inlined notes.

## Now what?

I could probably write a whole lot more about Emacs, in the relatively brief time I used it, but for now, this is probably enough of what is effectively a farewell.

I took a break for a couple of months last year and started missing some of the org functionality. I got back into it only to go down the rabbit hole again and honestly, none of it was particularly productive at all.

It's too easy to daydream about all the stuff you could do, without really asking if you should do it. Even before then, odds are you might never get to that state at all when you find yourself fumbling around.

Some troubles might be due to looking at things with the wrong mental model of course but acknowledging that still doesn't really help me make everything as seamless as it could (or arguably should) be in the first place.

For now, I'm just going to stick with basic markdown and a text editor for my notes and see how it goes. Besides, I'm meant to be keeping these sorts of things [on my blog](/blog/zettelkasten-blog-a-good-idea/) anyway.
