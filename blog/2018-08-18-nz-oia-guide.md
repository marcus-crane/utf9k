---
category: blog
date: 2018-08-18T00:00:00+13:00
description: My extremely brief crash course in the Official Information Act and how it can be used for some interesting civic side projects
slug: nz-oia-guide
tags:
  - government
  - guide
  - nz
  - oia
title: A brief guide to OIAs in New Zealand
---
I was browsing [Hacker News](https://news.ycombinator.com) earlier this week and came across an interesting post called [Using FOIA Data and Unix to halve major source of parking tickets](http://mchap.io/using-foia-data-and-unix-to-halve-major-source-of-parking-tickets.html). As you can imagine, the post is [exactly what it says on the tin](https://en.wikipedia.org/wiki/Does_exactly_what_it_says_on_the_tin) and got me inspired to do some own data wrangling of my own.

A few days later, a coworker got a parking ticket and I was reminded of that post so I told them the story. They seemed to think it was a neat idea but didn't have a great understanding of the Official Information Act process. I mean, just look at that name! It sounds all legal and fancy but really, it's actually very straight forward (and arguably kinda fun).

I'm no expert myself but I can at least show you where to start. I actually have a yearly FOIA request I make but I'll save that story for the end of this post. Now, onward!

## Some caveats

It's worth noting that while this guide is specifically aimed at New Zealanders, some of the tips can possibly apply to your own country. I should note that New Zealand is ranked \#1 in [Transparency International's Corruption Perception Index](https://www.transparency.org/country/NZL) so as you can imagine, there's generally no hassle with requesting information from our government.

It should go without saying that a less transparent, or even citizen-hostile government is going to be an entirely different kettle of fish.

## Official Information what?

Ah yes, right. Maybe you've heard of the term FOIA or OIA but haven't really got an idea of what it is or where the ability originates from. Is it a service granted from the kindness of our governmental overlords? Hah! Well… it is!

The Official Information Act of 1982, readable [here](http://www.legislation.govt.nz/act/public/1982/0156/latest/DLM64785.html), is actually a replacement for the [Official Secrets Act 1951](http://www.nzlii.org/nz/legis/hist_act/osa19511951n77183/). I can't say I was aware of it before writing this post but sharing government information was a criminal offense! Wikipedia only mentions this in passing but after digging a bit, I believe the particular section that applied was 6(1)(a). You can see it below although I've cut out some bits so it's not just a huge wall of text.

> (1) If any person, having in his possession or control … any sketch, plan, model, article, note, document, or information … which has been entrusted in confidence to him by any person holding office under His Majesty or under the Government of any other country, or which he has obtained or to which he has had access owing to his position
>
> (a) Communicates the code word, password, sketch, plan, model, article, note, document, or information to any person, other than a person to whom he is authorized to communicate it … he commits an offence against this Act.
>
> — Section 6 (1), New Zealand Official Secrets Act 1951

The idea of information belonging to "the Queen and her advisors" slowly seemed like a bunch of nonsense and as a result, the Official Information Act was born. In short, it allows anyone present in New Zealand (citizen or visitor) to request, surprise, information from any government Minister, department or organization. That's basically all it boils down to.

## What can I request?

Generally speaking, there's no limit on what you can request but as with most parts of life, just because you ask doesn't mean you shall receive.

There are some cases where the requestee can deny your request but it has to be justified. Specifically, Section 6(a) through (e) outlines acceptable reasons for dismissing your request:

> (a) to prejudice the security or defence of New Zealand or the international relations of the Government of New Zealand; or
>
> (b) to prejudice the entrusting of information to the Government of New Zealand on a basis of confidence by
>
> — (i) the Government of any other country or any agency of such a Government; or
>
> — (ii) any international organisation; or
>
> (c) to prejudice the maintenance of the law, including the prevention, investigation, and detection of offences, and the right to a fair trial; or
>
> (d) to endanger the safety of any person; or
>
> (e) to damage seriously the economy of New Zealand by disclosing prematurely decisions to change or continue government economic or financial policies relating to—
>
> — (i) exchange rates or the control of overseas exchange transactions:
>
> — (ii) the regulation of banking or credit:
>
> — (iii) taxation:
>
> — (iv) the stability, control, and adjustment of prices of goods and services, rents, and other costs, and rates of wages, salaries, and other incomes:
>
> — (v) the borrowing of money by the Government of New Zealand:
>
> — (vi) the entering into of overseas trade agreements.

## Where to make a request (the hard, secret way)

So, you want to learn a thing or two, eh?

You'll need to know two things: who you want to contact (even roughly) and what you want to ask them. It seems obvious but if your request is too vague, or wide reaching, you'll likely be asked to be more specific. Don't forget, each request is painstakingly completed by a civil servant so they can't shift mountains or compile impossible requests.

Now that you've got a goal in mind, the next step is just to contact the agency in question. As noted in Part 2, Section 12(1AA)(a), your request can take any form, whether it be a letter, email or even just verbally. Generally, email is the way to go however so just look up the website for your agency of choice and they should have a page for OIA requests.

For example: a Google Search for `ministry of justice oia` brings up their [OIA request page](https://www.justice.govt.nz/about/official-information-act-requests/). It should be as straight forward as following the instructions from there. Some agencies, such as NZ Police, may ask for proof of citizenship in certain cases as I understand but you'll likely not run into that issue. Similarly, some agencies may charge for very large requests but as I understand, it's fairly rare for that to occur.

## Where to make a request (the easy, public way)

There's actually an easier way to make OIA requests thanks to the fine folks over at [FYI.org.nz](https://fyi.org.nz). Simply pick an agency, fill in your request and the rest is sorted from there. Your request is given a page, not unlike a forum thread, and responses show up when they come back. Other users can give you advice if they think the response you got was crap and you'll also be given the option to forward your response to the [Ombudsman](http://www.ombudsman.parliament.nz/) should you choose to dispute it.

The only catch is that all requests are public, so as to cut down on duplicate requests. Don't worry, none of your information is public, just your first name. The initial query, and any replies you send, are sent through FYI's own email address which acts as a middle man on your behalf.

If you'd like to do a project surrounding public utilities, persuing past requests can be a great way to get ideas on what sort of information you could request.

## What requests have you done?

At this point, the guide itself is over but I have a bit of a fun story that you might like to use as inspiration yourself. Earlier, I mentioned Section 6 which outlines reasons that agencies can reject your requests. There's a few requests on FYI that have been rejected or redacted under those grounds.

It occured to me one day. While I can't even know what that redacted information was, I can at least know what the information related to. A sort of metadata if you like so I did exactly that. Below is a table of topics. The NZ government has had requests for information that surrounded those topics. The requests were either rejected, or more likely redacted. It's an interesting list, and probably about what I would guess to.

You can view a table I keep updated with these requests [here](/projects/meta-oia-requests).

A quick glance tells that the majority of rejected/redacted requests were on the grounds of defense or ensuring international relations which is understandable. Additionally, the NZ government have been entrusted with information from Australian officials regarding social security and from the US administration. None of those are particularly surprising but it's still interesting nonetheless.

I'd love to hear what those US Film Industry interactions were about myself. Perhaps with time, I can "FOIA the fuck out of it" to quote a tweet I saw earlier today.
