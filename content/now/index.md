---
title: "Now"
slug: "now"
category: "now"
---

## Throwing away my to do list

I noticed recently that not only do I dread the thought of opening up my electronic to do list but realistically, I never action much off of it anyway.

I decided to experiment with throwing it away completely and relying on my calendar. Things that **must** be done should go on my calendar regardless.

Now don't get me wrong, I still have *things to do* in some form or another but they're not explicitly a list. The thing I'm trying to avoid here is subsciously mistaking any such list as a *things i must do* list as opposed to a *things i could do* list.

The other aspect is that being electronic means I'm tether to my computer. Basically what I'm doing instead is carrying a notebook. If there's something I need to do at a certain time, it goes on my calendar. If it's wishy washy or not important, I just write a note but I don't expect that note means "It will happen" as there isn't any period of time attached.

Most projects I do are relatively ad hoc, or in the case of this site, I file Github Issues so I'm relying on "I'll just do a couple minutes" as my driver to determine what I find interesting at any given moment.

If I don't feel like doing something, I just simply won't do it and I try to pay no attention to whether streaks happen or not.

This might go too far the other way for sure but it's an experiment so who knows, maybe I'll end up getting more done in an attempt to *not* be explicitly productive!

## Octowise

I haven't talked about it publically but I've got a [side project for viewing Kobo highlights](https://github.com/marcus-crane/octowise) that has been on and off the backburner for some time.

[Electron](https://www.electronjs.org/) gave me a lot of troubles between native module compilation and trying to work within the expected [security model](https://www.electronjs.org/docs/latest/security/context-isolation). Most every comment would simply say "disable security" while I couldn't get modules I needed to work within sandboxing. Agh, it felt extremely kafkaesque and I got no real work done on that side project.

Recently I discovered a project called [wails](https://github.com/wailsapp/wails) which allows you to write most of your codebase in Go while crafting a UI in Javascript. This works by providing a bridge between Go and JS so you can call Go functions from within JSland.

While I'm not too far into using it, my tests so far have been [very promising](https://twitter.com/sentreh/status/1416558765340446724)!

I'm glad to finally start making progress on the actual problem rather than all the stuff surrounding the problem itself.

## Static libraries

Currently, I have both [books](/books/) and [games](/games/) pages which show the things I'm working through.

They aren't explicitly linked anywhere (besides here) but in future, I intend to surface them to users and provide a sort of gallery of sorts.

My goal here is to try and use my site as a data store rather than relying on third parties so much.

For me, books and games are probably the two most at risk I would say.

With books, [Goodreads](https://goodreads.com) is still widely used but is effectively neglected by their corporate overlords at Amazon.

With games, [How Long To Beat](https://howlongtobeat.com/user?n=Sentry), there's still an active community and I've been a member of the side for 10 years now but I noticed recently that the site was bought by [Ziff Davis](https://www.ziffdavis.com/). I don't know that I consider them as bad as some large entities but in my lifetime, I've seen them shut down 1UP.com, GameSpy, GameTrailers, Official U.S. Playstation Magazine and UGO. I didn't necessarily visit any of those sites aside from GameTrailers but I don't see why a small ex-indie site like HLTB would be any different in future.

On a more general note as well, neither of these sites make money off of me so I don't exactly know what keeps them running? Publisher deals? Beats me.

Anyway, both pages are powered by `yaml` files currently that are manually curated. I'll probably write more about it in future but for now, you can [check out the data folder](https://github.com/marcus-crane/utf9k/tree/main/data) if you'd like to see more.

## This site in general

While I like to think I'm still pretty active writing posts for my [blog](/blog), the large majority of changes I've made recently aren't particularly user facing.

Here's a short list of recent changes:

* Addition of [games](/games/)
* Addition of [debug](/debug/) to help tidy up metadata
* Wrote V2 of the homepage live player. It now features playback progress and cover art for games, movies, tv shows and music.
* Added live searching to [questions](/questions/) and split up all of the content into one "post" per question.
* Moved from [Netlify](https://www.netlify.com/) to [Fly.io](https://fly.io/). Besides just liking the latter, I've also started forwarding server logs to an [Intel NUC](https://www.intel.com/content/www/us/en/products/details/nuc/mini-pcs.html) at my house. My next step will be to surface anonymous stats back here on my site.

At some point, hopefully soon, I'll be doing a revamp of the layout. Nothing huge in terms of formatting but tidying up the design.

My main goals will be trying to reduce the number of external requests (ideally caching everything locally) and creating nice, static cards for showing eg; tweets rather than straight serving the embed widgets as they tend to look out of place.

Beyond that, life stuff is busy! Lotta irons in various fires but nothing to talk about just yet.