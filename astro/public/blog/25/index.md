# 25
19 August 2019

It&#39;s 6:30pm on my 25th birthday and I&#39;ve been reflecting a bit on what I&#39;ve managed to accomplish so far. While this isn&#39;t a post about that, there&#39;s no better time to assess the state of my personal site and where I&#39;d like to go forward.

## The current state

At present, my blog isn&#39;t really best effort. I&#39;d like to write more things but I never really make it an actual goal. I&#39;d say the biggest reason is that I&#39;ve been wrapped up in work side projects instead of my own personal side projects so I&#39;ll be looking to stop doing that.

My site has gone through plenty of iterations, with the current being a static site, built with Hugo and hosted on Netlify. It works but it&#39;s not exactly how I&#39;d like it.

Along the way, pages have disappeared. There used to be a projects page which never got filled in properly. There was also an archive of reviews I wrote years back. They&#39;re still there but not publically exposed anywhere.

## Where I&#39;d like to get to

I always seem to fumble around a lot with Markdown. It works great but there&#39;s always things missing I wish I had. Some markdown libraries support tables while some don&#39;t, or defer to extensions.

I&#39;ve come across Asciidoc recently and it seems to be exactly what I&#39;d like. Even as a general document format, it seems pretty handy.

Hugo does have support for it, but it runs with some hardcoded flags that are annoying. It requires a Hugo heading block so you might get a mix like so:

```bash
---
title: 25
date: 2019-08-19
tags: [meta]
---

= 25
Marcus Crane &lt;marcus@utf9k.net&gt;
v1.0, 2019-08-19

It&#39;s 6:30pm...
```

This works fine but I&#39;d like to stick to just one single format. Mixing metadata just for Hugo and metadata just for Asciidoc is annoying so I&#39;ll have a look into that. Asciidoc itself provides pretty much everything I&#39;d want out the box for a static site. The remainder is just building the category pages and so on, which I don&#39;t necessarily need a fully fledged framework for.

## Some topics I&#39;d like to look into

I&#39;ve got a list of topics I sometimes keep handy but I haven&#39;t invested much time into exploring.

Off the top of my head, there&#39;s some stuff I&#39;d like to write about and others I&#39;d have to research. In no particular order:

*   A writeup of all the iterations of my site with pros and cons (eg; Django, Flask, Hugo, Jekyll etc)

*   A comparison of &#34;Prepay SMS UIs&#34;

    *   A little while ago I changed cell providers (and then switched back). Topping up credit using SMS based menus was fascinating since it&#39;s like this whole web.

    *   It&#39;d be interesting to model the various states you can get into and just talk about text based UIs in general

    *   Perhaps there&#39;d be some lessons from there that could be reused in chat based UIs or whatever the flavour of the month is with Slack.

*   Donating to those who are homeless / on the streets in the future

    *   With plenty of things moving to Paywave type technology, what will happen?

    *   Personally, I rarely/never carry cash on me anymore so I couldn&#39;t give spare change even if I wanted

*   My own personal de-googlify post

    *   I recently deleted my Google account after finding a replacement for YouTube (exported my subscriptions as an RSS feed)

    *   Most other services I had a replacement for, or never used them.

    *   Currently running LineageOS with a custom location provider so pretty much no reliance on Google stuff for Android

    *   One missing piece then I&#39;d be ready to write about how it&#39;s worked for (quite well actually)

    *   I&#39;m not hardline &#34;my freedoms&#34; so I still run eg; Instagram and what not. The idea isn&#39;t to be pure but find a balance between convenience and privacy (as much as that&#39;s a thing hah)

*   Github vs Gitlab

    *   I recently imported some stuff to Gitlab. I haven&#39;t invested much time into it but it seems promising given how many features they&#39;ve developed.

    *   They could all just be quite shallow and not very reliable however.

*   Reducing my &#34;every day carry&#34;

    *   I recently managed to merge my keys, cards and public transport tag into one which has been working quite well

    *   I&#39;d always fancied the idea of not having a wallet but couldn&#39;t really see how it would work

*   Picking mediums

    *   Us humans seem to be bad at picking mediums. We do tweetstorms about political policy or complex issues rather than doing long form.

    *   In some cases, shorter mediums are popular but the medium itself shapes the content

    *   To fit eg; Twitter&#39;s message size, you&#39;re going to simplify ideas as much as you can (but no more) but nuance may get lost in the process.


## Other things to add

*   A proper projects page

    *   I&#39;ve got some stuff I can probably put up but it would also give me a reason to focus on personal projects more

*   Bring back the reviews page

    *   I&#39;d like to have something (automation idk) embed cover art and what not for reviews so they look a bit more official

*   Perhaps a stats page

    *   I used to have this at one point which would pull information from various places

    *   It was a nice excuse to play around with technology I wasn&#39;t familiar with like Redis or Celery queues

*   Setting the whole dynamic vs static thing

    *   Part of me wants to go back to dynamic all the time as an excuse to learn new technologies

    *   Maybe a mix of the two is would suit me best. Just use asciidoc (via a subprocess) to render pages / store them statically while dynamically building the list type pages


## How do I get there

I just gotta start leaving my laptop at work or else I get tempted to work on work technologies honestly. None of the above is hard but it&#39;s easy to get side tracked or want to finish off something.

In this case, there&#39;s no requirement for me to do so. Things just happen to cross over with my interests.

Anyway, this post is me committing to changing that, and also having a list of things to look into before I forget.

Perhaps we&#39;ll do a 26 this time next year. On that note.

## Some final thoughts

*   This site is essentially my portfolio but I don&#39;t care to make it particularly professional. The style is &#34;Things past me would enjoy stumbling upon&#34;.

*   While there may be some posts about specialised topics, none of them should be sacred and should attempt to be readable by anyone.

    *   There&#39;s that scale that tells you if text is at a 3rd grade reading level etc. That could be an interesting thing to run over some posts.

*   I rarely look at analytics. They don&#39;t have any bearing on what I write. Comments I don&#39;t mind but they&#39;re not really integrated well. Maybe I&#39;ll get rid of them.

*   I&#39;d like the site to be a bit more nice to look at. I tried the whole dark scheme for a bit and it&#39;s good but not quite perfect. Maybe I even support both?

*   Reference books seem to have some cool layouts. I could probably pull some inspiration from them.

*   I think I&#39;ve fallen out of love with menus. If I do have then, breadcrumb style things might be a way to go.

*   I&#39;d like to look back in a few years and see a bunch of stuff that reflects who I was, and how much I know, at that point in time. That&#39;s partly why having a format that lasts is important since Hugo may disappear one day for all I know.


Thanks for reading
