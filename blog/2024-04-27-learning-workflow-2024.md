---
category: blog
date: 2024-04-27T11:58:00+13:00
description: Well, on my best days. I have plenty of days where I doomscroll too.
slug: learning-workflow-2024
tags:
  - productivity
  - reading
  - workflows
title: How my learning workflow looks as of 2024
---
This post is going to be a brief rundown of how I generally go about capturing and processing interesting stuff, whether it's articles, books, videos or whatever else.

I'm pretty weary that posts like this can very quickly veer into [productivity porn](https://nesslabs.com/productivity-porn) however.

This is a workflow that I do use on the best of days but there are just as many where I'm a big lazy blob, scrolling Instagram reels and sleeping in until midday!

Would I recommend this workflow? In so much as you might spend a lifetime browsing and then you die, probably not?

You'd be better served going outside but it's pretty great if you like hoarding fun facts and never getting around to turning that information into useful artifacts[^1].

Anyway, with all that said, here's roughly what my process looks at the moment.

## Tools

### Readwise

[Readwise](https://readwise.io) is a tool for saving highlights from a variety of sources, such as e-readers, read-it-later tools and other places.

It has tools for surfacing your highlights using [spaced repetition](https://en.wikipedia.org/wiki/Spaced_repetition) but I don't use any of that side of it.

My use case is just for syncing highlights to [Obsidian](https://obsidian.md/) although it can export to a great deal of places.

A while back, I [built a tool](https://utf9k.net/projects/october) for syncing Kobo highlights to Readwise although these days, I use Readwise's own reading app as we'll go over in the next section.

I also have a custom [browser extension](https://github.com/marcus-crane/comments-to-readwise) for saving Reddit and Hacker News thread comments.

I don't know that I'd recommend it but it's just kind of stuck and it works for me.

Readwise itself is slowly intended to be merged into Readwise Reader so it hasn't changed very much in the past year or two but I don't really need any extra features from it at all.

### Readwise Reader

[Reader](https://readwise.io/read)'s tagline is "The first read-it-later app built for power readers." and that holds up pretty true.

The name is even a bit of a misnomer since besides reading, you can also watch videos.

It's a web application that supports capturing articles, [RSS feeds](https://en.wikipedia.org/wiki/RSS), emails and even videos which you can then highlight, annotate and do full-text search across.

A lot of ink (and film reel) has already been spilled talking about Reader so I won't go too overboard but I've been a happy user for a number of years now.

For quite a while, I had some supplementary tools alongside Reader but the last of them disappeared with the introduction of [pagination for epubs](https://readwise.io/reader/update-jan2024) at the start of this year.

I'll quickly go over each category of item and what sort of things I use them for to give an idea.

#### Articles

Most articles that I intend to read, and especially those that I want to refer for later, go straight into Reader.

The source text is parsed straight out of the underlying webpage[^2] which makes for a nice standard reading style.

It's also a great form of protection against [link rot](https://en.wikipedia.org/wiki/Link_rot), ensuring that whatever text you've marked up is still available, even if the underlying webpage has since disappeared.

Occasionally, I'll also abuse this section as a bookmarking service. I'll use the Readwise extension to save a link, which gets ingested as a broken article but I'll navigate back to the source later on and then delete the entry within Readwise.

Stuff like [documentation](https://diataxis.fr/) sites or web applications I come across should really go in a task manager but sometimes it's just convenient to refer to later since I know I'm going to be back within Reader pretty often.

One great thing about the [browser extension](https://chromewebstore.google.com/detail/readwise-highlighter/jjhefcfhmnkfeepcpnilbbkaadhngkbi) is that it saves raw HTML, so if you've got a subscription to a paywall site, you can save the full text content for reading within Reader.[^3]

As far as reading articles, given they're pure text, I'll read them on whatever device I have handy such as a desktop, phone, tablet or e-ink reader.

#### Books / ePubs

Out of the box, [ePubs](https://en.wikipedia.org/wiki/EPUB) effectively render as one long article but thanks to the [pagination update](https://readwise.io/reader/update-jan2024) earlier this year, they can be broken into virtual pages.

Most ePubs I've thrown at Reader so far end up being quite well although there is the odd case where an ePub will not have a proper table of contents.

Nothing much that Reader itself can do about that since it's down to how the ePub itself was constructed.

I don't have a great process for actually reading through these unlike articles which I'll browse through on public transport or at my desktop.

One thing I would like to see, that I miss compared to using a [Kobo](https://www.kobo.com/) is a per-chapter progress bar.

Mentally, it helps break past the overwhelm of being presented with a "5 hours left" progress bar since you can tangibly get progression feedback even if you just read a couple of pages.

When I do sit down, I tend to favour reading books on my [Boox Tab Mini C](https://www.pcmag.com/reviews/onyx-boox-tab-mini-c) which handles Reader surprisingly well, particularly after a recent performance update was shipped.

#### PDFs

PDFs are effectively just articles but with some small caveats given they tend to be heavily layout focused.

Reader has experimental support for translating PDFs into pure text although I never use it myself.

One problem that can crop up is that some PDFs are purely image scans with no selectable text. This is nothing to do with Reader but rather how some PDFs are designed.

It can be annoying since it means no ability to make highlights or annotations against text.

There is a relatively new feature that allows taking snapshots of PDF content such as images, graphs and so on but I'd prefer not to use it for text.

Generally I just try to find an alternative copy of a PDF when I realise it suffers from this issue but there are rare cases where no highlightable copies of a PDF exists.

In these cases, I just cut my losses really but there's some probably some technology out there to make OCR possible.

Unlike articles, I only tend to read these on desktop or on a normal tablet given their reliance on design instead of just being pure text.

Technically I could read them on an e-ink tablet as well but they usually tend to require more attention than an article which is easier to pause and pick up at a later point.

#### Emails

I only have a handful of these and technically they act like articles.

Historically, some emails used to have formatting issues but a recent addition to Reader meant that the actual HTML source is now available for preview within Reader.

Before the update, the email text would be extracted, which usually worked but could result in some broken content where layout played a bit part in readability.

As with articles, I don't have any device preference with these. I usually read through them while on public transport, particularly with Money Stuff taking about 15 minutes.

#### RSS

On top of it's read-it-later section, Reader also has support for pulling content from RSS feeds.

For those who use RSS, you may know that [YouTube channels come with RSS feeds](https://feeder.co/knowledge-base/rss-feed-creation/youtube-rss/) so instead of subscribing to channels with an account, I have YouTube videos pushed into Reader.

I only have a handful of subscriptions which are mostly [silly](https://www.youtube.com/watch?v=TD_7YHRVU1k) or [niche](https://www.youtube.com/watch?v=CkXSIUX5l_s).

Perhaps I could go out of my way to find some high signal YouTube channels but unlike the "read-it-later" portion which I try to clear out, I skim these daily and only watch if they seem interesting.

There are RSS feeds for various blogs but they don't post particular often so my feed ends up being mostly videos and [comics](https://xkcd.com/).

I have to be pretty vigilant that it doesn't devolve into too much noise and where I find myself skipping content too often, I end up just unsubscribing so I can refocus that time on my backlog.

One thing that I'm a little mix on though, is that if you unsubscribe from a feed, any documents from that feed will be removed. I'm pretty sure this includes documents that may have been highlighted and archived too which is a bit annoying.

Another use case for RSS that isn't quite covered in Reader, and maybe shouldn't be, is sources that act more like notifications than actual content.

For example, the [W3C](https://www.w3.org) often puts out [notices](https://www.w3.org/news/2024/w3c-invites-implementations-of-securing-verifiable-credentials-using-jose-and-cose/) that I never read but I still like to be aware of them in case anything useful does pop up.

Most of these high traffic, low signal feeds I have in [Reeder](https://reederapp.com/) but I only get around to checking it like once a fortnight so it kind of defeats the point since they're not timely at that point.

Lastly, I have a [Twitter List](https://help.twitter.com/en/using-x/x-lists) with a few creators on it and I get a scheduled round up with RSS once a day. It's nothing notable and pretty boring as a result, I never log into Twitter / X anymore.

### Annotate.tv

Annotate is a one-person SaaS tool for watching YouTube (and Vimeo) videos and marking them up with highlights.

I don't think it's under active development these days as the founder works for Readwise but it integrates with the Readwise tool quite well.

Basically, you load in a video to annotate. As it plays, you can start typing in the nearby text editor, which pauses the video and inserts a note with the relevant timestamp.

Once you've saved your annotation, the video starts playing again and optionally your annotation can be synced to [Readwise](https://readwise.io).

Honestly, I rarely remember to visit Annotate even though I aspire to.

It's handy when watching through talks that I'm more likely to take notes on than regular videos but I don't do it as much as I probably should.

Instead, I end up saving them to Annotate and never coming back so I have a big backlog.

I'm not entirely clear if Readwise Reader is intended to be incorporating similar functionality but Annotate still has some functionality that Reader can't compete with at the time of writing.

## What do I do with it all?

Here's where things fall apart a little bit.

For the most part, I just enjoy consuming the above types of content. I'll take highlights where I find something interesting but they're pretty sparingly.

Sometimes I'll see some discussion about a particular topic I read about so being run a search in Obsidian to see if I make any notes can be useful.

I need to do a lot more work on actually making use of all the raw material I've collected over the years though.

Given my recent [relationship with Beeminder](https://utf9k.net/blog/beeminder-is-neat), I now have some goals where I chip away at my notes a couple times a week or risk being stung.

Effectively I just read through highlights from articles or books, see if anything stands out and if so, I turn it into a little [zettlekasten](https://en.wikipedia.org/wiki/Zettelkasten) style card.

I'm not particularly sacred about this, and I don't really look at them very often but I've had one or two times where I have a "Aha!" moment that one thing I read is kind of like another thing if a squint.

It's pretty rare though so I'm mostly going through the motions to see if anything falls out, rather than having any goal in mind.

If anything, I've always thought "I'll take a big vacation and churn through my backlog" which is a big lie so making this a regular thing has been neat.

Ideally I'll get to a point where I can just pick a couple of interesting note cards and make a blog post out of it but we'll see.

Worst case, I can use them as talking points or something so there's that.

The end result doesn't really matter so much though since the process is decently enjoyable in itself, as long as you don't consume garbage of course.

[^1]: As evidenced by the fact that most of what I read is still stored in my brain instead of being remixed into something or other for my blog.

[^2]: All of the interesting metadata as well as the ingestion source is still available for reference if needed.

[^3]: If you use any [alternative methods](https://archive.is/), those tend to work pretty well in my experience as well.