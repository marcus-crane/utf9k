+++
title = "Latency as a forcing function"
date = "2021-01-26"
draft = true
slug = "latency-as-a-forcing-function"
+++

Something I've fallen victim to in the past is flicking through applications without realising it.

Similarly, I've witnessed colleagues at my old company opening Slack as an act of habit only to think "What am I doing? It's 4pm on a Friday and I'm at a social event".

Thankfully, I no longer have that problem because our chat software in use at work, [Mattermost](https://mattermost.com/), is much to slow.

For reference, here is what I see on the desktop for about 30 seconds if I were to clear my cache.

Normally, the API calls under the hood are around 5 - 10 seconds but that is still jarring enough to not actually want to sit and wait.

In addition, sometimes the client will be quite flaky and not actually load so as a user, you tend to force reload, which clears the cache and... well, you can see how unpleasant this is.

Oh, in addition, there are no CDNs so I'm having to make all of these numerous Javascript requests to a server halfway across the globe, and often through a proxy no less which adds a bit of latency to boot.

Anyway, none of the above is the interesting part if you ask me.

I've noticed that I often forget to check Mattermost. If it's already open, it's not a problem, but if I don't have it open, I take no pleasure in opening it for the sake of opening it.

I think partly this causes usage to be lighter, due to the latency, and so there is less discussion. In addition, we're on the opposite side of the world from our counterpart teams so it becomes an actual asynchronous chat application but not intentionally.

Even for regionally local communication while working from home, the latency becomes a forcing function to not only check Mattermost less but basically it becomes the opposite of addictive.

Well, not in a fun sense. I don't know that anyone is addicted to Slack but perhaps to that feeling of "Ah, maybe there is a new notification" or "I need to clear those unread icons to please my brain".

That's a feeling I just can't have with Mattermost because the latency sucks.

I should note that Mattermost is a self hosted instance and the actual software is probably fine. It's managed on premises and so I can only wonder how it is configured.

This post inspired me to do some poking around and someone installed a plugin which is like 1.7MB (and 7MB uncompressed?!) which blocks most of the API calls from triggering until it finishes.

Granted, it gets cached but still, that's insane. It's almost as big as the base client itself!

Maybe we should all just go back to IRC or email.
