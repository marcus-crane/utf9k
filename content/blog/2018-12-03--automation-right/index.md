---
title: "When automation goes horribly right"
date: "2018-12-03T00:00:00+1300"
slug: "automation-right"
category: "blog"
tags:
- "automation"
- "microservices"
- "twitter"
---

Today, I finally solved an issue that has been a pain in my ass for many months: successful automation

Towards the latter end of 2016, Twitter announced a new suite of tools for businesses via a [blog post](https://blog.twitter.com/marketing/en_us/topics/product-news/2016/speed-up-customer-service-with-quick-replies-welcome-messages.html). There were a bunch of things from quick replies to profile-listed support hours which I'm sure were of some use.

I used the latter but I also enabled "welcome messages": automated replies that would trigger when a "customer" opened your direct messages. In my case, I'm not a business so it was more just some silliness to add to my profile and it confused a few people along the way.

[![A screenshot of a Twitter direct message. On the left is an automated message from the user. It reads "Hey there, lease a message after the beep. This has been an automated message". On the right is a reply from a surprised user who asks how the automated message was created.](confusion-one.png)](confusion-one.png)

Over time, I'd forget that I had it enabled and then someone else would get caught out by it a few months later

[![A screenshot of a Twitter direct message, many months after the one just shown previously. On the left are some messages expressing surprise at having found an automated response. On the right is the author expressing confusion, due to having forgot any such automated messages exist.](confusion-two.png)](confusion-two.png)

and then it kept going at which point it started becoming a bit of a nuisance.

[![A screenshot of a Twitter direct message. On the left is a user saying that the automated messaging is still intact. On the right is the author, typing in full capital letters to express disbelief, stating that they have tried to turn off this automated feature but can't figure out how.](confusion-three.png)](confusion-three.png)

At this point, I was particularly annoyed and attempted to turn it off. I clearly remembered that there was a dashboard but do you think I could find it? That would be too easy!

You can actually see a walkthrough of that very page right [here](https://youtu.be/H-n0hRO7oLk?t=75) but good luck finding it because it was actually removed.

At first I didn't believe it. I just figured I had forgotten how to navigate to it but every month, I'd try once again to track it down with no luck. Eventually, I just resigned myself to the fact that some automation was running somewhere inside Twitter and I could never turn it off.

Things changed. I started a new job as a Site Reliability Engineer funnily enough. I would laugh to myself whenever we discussed service availability. Inevitably, it would come up that Google has planned outages in order to keep downstream providers on their toes and not overly reliant.

I wished so hard that Twitter would have a planned outage but no, apparently this microservice, or whatever it was, never failed. It was perfect and never toppled. Seriously, give those developers a pat on the back because I wanted nothing more than to take a baseball bat to the entire fucking cloud.

Obviously I couldn't just simply call Twitter and ask them.

Fast forward to today and once more, a confused friend simply messaged me "?". I didn't even have to ask. Whatever this automation was, it never really seemed consistent either. Those who I talked to often would suddenly receive an automated response out of nowhere. Not that I could tell since it wasn't me talking.

Finally I stumbled onto the Twitter Developer forum and… ah! [I wasn't alone!](https://twittercommunity.com/t/defunct-business-auto-dm-feature-no-longer-editable-and-still-sends/116561) I'm not crazy! Someone else remembers this thing!

After a bit of confusion, it was cleared up that the Twitter API has a section for "welcome messages" which are these very same automated snippets. Using [twurl](https://github.com/twitter/twurl), a Twitter-modified version of curl, I could view those darn things finally.

[![A screenshot of a Windows terminal. A command has been run and the image depicts the output. The command is a utility called twurl and a GET request is being made to the welcome_messages API endpoint. The output shows a list with one item which is the automated message that this post has been describing. The nightmare is finally over.](welcome-messages.png)](welcome-messages.png)

There they were. Sitting within the API the whole time although I'd guess that feature was only documented as part of the recent overhaul of Twitter's developer APIs. Even the original URL, [dashboard.twitter.com](https://dashboard.twitter.com), doesn't resolve anymore which is all the proof I needed that I'd been left out in the cold.

With some copy paste magic, I quickly wiped the slate clean. I was free!

Finally awake from that god awful nightmare.

The Twitter Business Experience was definitely just that…

That just leaves one last question: if it took me many months to fix this problem, what hope do those actual businesses who signed up have?

I guess you get the support you pay for, huh?
