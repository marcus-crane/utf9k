---
date: 2026-02-02T23:20:00+13:00
description: The media cycle is mostly over now so it's probably a good time to take stock
slug: another-managemyhealth-data-breach-recap
title: Another recap of the ManageMyHealth data breach so far
---

> [!INFO] Disclaimer
>
> As with [my previous post](/blog/managemyhealth-data-breach-recap), I have no special insight or behind-the-scenes knowledge of the ManageMyHealth breach, nor am I affiliated with any of the entities that assisted in the breach investigation. While I've strived to be as accurate as I can be, I'm neither a reporter nor a cybersecurity professional by day. As always, carry out your own due diligence when trusting strangers on the internet.

It feels weird to think that [my previous post](/blog/managemyhealth-data-breach-recap) was just under a month ago because so much wacky stuff happened as a result, with the most important being that I learned a lot of new things!

For those who were only familiar with that earlier post, I had been keeping tabs on this whole saga [over on Bluesky](https://bsky.app/profile/utf9k.net) (and still am!).

There are still a few loose threads that I haven't seen anyone dig into, and I think they're important to capture in a more permanent medium than Bluesky posts, but first we'll do a quick recap of the events since the first post.

## Recapping from January 4th

### Deadlines came and went

At the time that I published my previous post, two[^erroneous] sets of breach samples had been published and the original deadline of January 16th was still looming.

[By the morning of January 4th](https://www.rnz.co.nz/news/political/583170/managemyhealth-breach-patients-at-risk-of-identity-theft-extortion-experts), Kazu had announced in their Telegram channel that the ransom deadline was brought forward by 48 hours. They also included an [FAQ](https://cdn.utf9k.net/blog/mmh-breach-two/kazu-mmh-announce.jpg) detailing their reasons for bringing forward the deadline.

![](https://cdn.utf9k.net/blog/mmh-breach-two/mmh-48-hours.jpg "Kazu announces that they will 'leak everything' if the ransom is not paid within the next 48 hours")

Going off of the timestamp of the deadline message, the exact time should have been 5:37am on January 6th, only for it to come and go with no explanation from either Kazu or ManageMyHealth.

Later on that same day, Kazu [confirmed to The Post](https://www.thepost.co.nz/nz-news/360926388/will-manage-my-health-hacker-release-confidential-patient-data-today) that there was a new round of negotiations. I was able to clarify that there was a new deadline of 5am on January 9th.

![](https://cdn.utf9k.net/blog/mmh-breach-two/kazu-second-extension.jpg "Kazu clarifies that the new deadline is Friday January 9th at 5am New Zealand time")

January 9th also came and went with no acknowledgement of the deadline from either side.

It was around the afternoon of January 6th that Kazu also stopped responding to me except for a single "lol" the following day.

We'll come back to this mystery later on.

### Formal investigations were announced

On Monday January 5th, Simeon Brown [announced](https://www.beehive.govt.nz/release/review-commissioned-managemyhealth-cyber-security-breach) that he had commissioned the Ministry of Health to conduct a review into both ManageMyHealth and Te Whatu Ora's response to the breach.

By Wednesday January 21st, the Privacy Commissioner had also [announced](https://www.privacy.org.nz/tuhono-connect/statements-media-releases/privacy-commissioner-inquiry-into-manage-my-health-breach/) that he would be carrying out his own investigation regarding the privacy aspects of how ManageMyHealth had been operating, such as what sort of contractual arrangements were in place for data sharing, and whether they were in compliance with the Privacy Act.

Since then, the [Ministry of Health](https://www.health.govt.nz/system/files/2026-01/manage-my-health-review-terms-of-reference.pdf) and the [Privacy Commissioner](https://www.privacy.org.nz/assets/DOCUMENTS/260128-Office-of-the-Privacy-Commissioner-Terms-of-Reference-Inquiry-into-the-Cyber-Security-Breach-affecting-the-MMH-patient-portal.pdf) have both shared the Terms of Reference for their investigations, which is a fancy way of capturing what they will (and won't) be looking into.

Both investigations are expected to produce something resembling a final report by April 30th, with the technical assurance part of the Ministry's review due on February 28th.

If you're interested in this stuff, I recommend reading the Terms of Reference as they're only a few pages and make for fairly accessible reading. They are still technical in nature so some parts might be a bit confusing to non-technical folk.

### ManageMyHealth were granted an injunction

A [press release](https://managemyhealth.co.nz/mmh-cyber-breach-update-6-january-2026/) from ManageMyHealth on January 6th announced that they had obtained injunction orders from the High Court, but as a relative layman, I found this all very confusing at the time so it's worth breaking down.

An injunction is basically a court order telling someone to either do something, or to stop doing something.

The [judge's decision](https://www.justice.govt.nz/jdo_documents/workspace___SpacesStore_78cb64bc_0e8f_4332_9851_5d51b9992657.pdf)[^publication] contains the text of the injunction on pages 9 and 10 but ManageMyHealth then need to get a "sealed order" which is a fancy way of saying [a copy that is stamped with the official seal of the High Court](https://cdn.utf9k.net/blog/mmh-breach-two/010%20Sealed%20Order%206%20January%202026.pdf).

Personally, the term "sealed order" made me think they were referring to some sort of secret court order that was not available to the public. That would be silly of course because then how would you know what you're meant to be doing (or not doing).

As far as using the sealed order, a lawyer[^solicitor] will then present the order to whoever it applies to, usually in the form of a PDF sent via email. If you read the injunction, it applies to "Unknown Defendants" so it can be presented to anyone suspected of holding data from the breach. Understandably, it'd be extremely difficult to have a complete list of who obtained a copy of the sample data at the time of filing.

I suppose most journalism outlets know this stuff, or at least their lawyers do, but I imagine some number of non-press people are reading their press releases so it would have been nice for their PR people to elaborate on what this stuff means for the average layperson.

### Breach notifications started rolling out

When a privacy breach occurs, [Part 6 of the Privacy Act 2020](https://demo.legislation.govt.nz/Acts/public/2020/31/096be8ed81ff2caa/096be8ed81ff2caa#LMS23530) kicks in depending on the scope of the incident.

Specifically, a "notifiable privacy breach" is defined as:

> [..] a privacy breach that it is reasonable to believe has caused serious harm to an affected individual or individuals or is likely to do so
>
> -- Part 6 Section 112 (1) (a) of the Privacy Act 2020

Given that over 100,000 New Zealanders had medical records caught up in this breach, it definitely meets the criteria for "notifiable".

There are a bunch of things that an affected "agency" (ManageMyHealth) has to do, such as notifying [the Office of the Privacy Commissioner](https://www.privacy.org.nz/) but most importantly, they have to notify every single person affected.

This isn't always possible at first so Section 115 allows for giving a public notice as a temporary measure while they sort out who exactly needs to be notified, and for the first week or two we were in that "public notice" phase.

At the time of writing, we still have not reached 100% of individuals notified and progress seems to have crawled to a snail's pace with increasingly vague wording.

Here's a quick list of the various wording that I've seen:

- [January 8th](https://managemyhealth.co.nz/mmh-cyber-breach-update-8-january-2026/): "Direct notifications to **the first 50%** of patients affected commenced this morning"
- [January 9th](https://managemyhealth.co.nz/mmh-cyber-breach-update-9-january-2026/): "**More than half** of all impacted patients have now received a notification email" and "we expect to complete contacting all remaining patients that can be notified by early next week"
- [January 12th](https://managemyhealth.co.nz/mmh-cyber-breach-update-12-january-2026-2/): "**More than half** of affected patients have now received a notification email"
- [January 13th](https://managemyhealth.co.nz/mmh-cyber-breach-update-13-january-2026/): "**More than half** of affected patients have now received a notification email"
- [January 20th](https://web.archive.org/web/20260120093004/https://managemyhealth.co.nz/mmh-cyber-breach-update/): "We are progressing through the notifications, with **most of** affected patients having now received a notification email"
- January 23rd[^changedetection]: "We are progressing through the notifications, with **a large proportion** of affected patients having now received a notification email"

Since January 8th, it's quite unclear how many patients have been notified other than it being somewhere between 51% - 99%.

As mentioned in Section 115 of the Privacy Act 2020, individuals must be notified "as soon as practicable" but there is no hard deadline or guideline for what a reasonable time period looks like.

### ManageMyHealth gains an advisory board

As part of the response, ManageMyHealth announced that they would be establishing an [advisory board](https://managemyhealth.co.nz/mmh-cyber-breach-update-7-january-2026/) to help them out with responding to the incident.

The [first appointee](https://managemyhealth.co.nz/mmh-cyber-breach-update-7-january-2026/) was [Ross Tanner](https://www.linkedin.com/in/ross-tanner-4ba4295/details/experience/), filling the role of "an advisor on privacy matters and governance", who has a background as "a seasoned governance and public‑sector management expert with extensive career experience in the State sector".

That may all be true, but they neglected to mention that [he was a director of Manage My Health Global](https://www.thepost.co.nz/nz-news/360929097/manage-my-health-advisor-appointed-after-hack-former-company-director) for 2 1/2 years. He was also a board member for [Medtech Global](https://medtechglobal.com/nz/), [the predecessor of ManageMyHealth](https://www.pulseit.news/new-zealand-digital-health/private-equity-firm-buys-medtech-global-managemyhealth-spun-out/), for almost 9 years.

The rest of the advisory board that was announced did not appear to have any potential conflicts of interest though.

### Northland is identified as particularly vulnerable

Initially, there was some confusion around why Northland seemed over-represented in the sample set, as well as within the regional tables shared by ManageMyHealth.

[It turns out](https://managemyhealth.co.nz/push-to-promote-patient-portals/) that [Te Whatu Ora Te Tai Tokerau](https://www.tewhatuora.govt.nz/for-health-professionals/health-research/district-and-regional-health-research/te-tai-tokerau) had partnered with ManageMyHealth back in 2023, as a way to share hospital discharge summaries, outpatient clinic letters and other referral letters electronically.

### Kazu closes shop

I don't have the exact dates on hand but as I recall, Kazu had started scrubbing any mention of ManageMyHealth from their Telegram channel around the evening of January 6th.

On the morning of January 7th, at around 11am, they deleted the contents of their original ransom forum post, where they had listed the size of the breach, along with contact details and breach samples.

Sometime between January 10th and January 30th, Kazu's Telegram account was marked as frozen, which is apparently a mechanism that kicks in when your account is found to have broken Telegram's Terms and Conditions.

It seems that their Telegram channel, where they shared announcements, was also deleted at some point during that period.

Lastly, sometime between 5am and 6am on 31st January, Kazu's forum account was marked for deletion.

At a guess, this could be a mix of their Telegram channel and account being reported, either by users or authorities, while their forum account may just be them choosing a new identity in order to ditch the attention they've since gained.

Even during the ransom period, Kazu had claimed that users were continually reporting the sample links they had shared so it could be that there are a few [white hats](https://en.wikipedia.org/wiki/White_hat_(computer_security)) persistently filing reports.

## Some of the more questionable claims worth addressing

There have been a couple of events that have been presented as notable but after digging a bit further, a few headlines I've seen are actually not what they seemed.

### An anonymous tipster allegedly exposes a previous breach with ManageMyHealth

On January 7th, BusinessDesk [published an article](https://businessdesk.co.nz/article/law-regulation/manage-my-health-privacy-commissioner-warned-of-security-risks-six-months-ago) saying that the Office of the Privacy Commissioner had received an anonymous email about ManageMyHealth back in June 2025.

This was acknowledged in a [January 9th press release](https://managemyhealth.co.nz/mmh-cyber-breach-update-9-january-2026/) by ManageMyHealth who said the following:

> The Office of the Privacy Commissioner confirmed on 7 January that they received an email via their enquiries in-box from an anonymous source about Manage My Health in June 2025 alleging names, email addresses and passwords were exposed in the Manage My Health platform.
> 
> In this case we investigated and did not find any breach. However, out of an abundance of caution, we forced password resets on the users concerned.

The actual contents of the anonymous tip have not been made public and [probably won't be](https://fyi.org.nz/request/33459-managemyhealth-anonymous-email-tip) as [Section 206 of the Privacy Act](https://www.legislation.govt.nz/act/public/2020/0031/latest/LMS23688.html) requires the Office of the Privacy Commissioner to "maintain secrecy in respect of all matters that come to their knowledge".[^secrecy]

While doing some digging around on X[^x], I came across a user called "George News" who shared a Substack post back on October 2nd, 2025 with the title of "[The Slippery Slope of Mandatory Digital IDs: A Warning for the Five Eyes Nations - Part 1: New Zealand](https://www.georgenews.org/p/the-slippery-slope-of-mandatory-digital)".

In the post, they mention that unnamed sources have "confirmed" a data breach in the ManageMyHealth app and that their source (now singular?) "made contact with NZ Gov officials on June 22, 2025" only to receive "no official response to action".

They included a screenshot of an email sent to `support@managemyhealth.co.nz` and `enquiries@privacy.co.nz`. Bizarrely, it was also [BCC-ed](https://en.wikipedia.org/wiki/Blind_carbon_copy) to `cmluxon@[redacted].com`, which is probably an email address that they got from [this website](https://contactout.com/christopher-luxon-72919).

![](https://cdn.utf9k.net/blog/mmh-breach-two/georgenews-email.jpg "An email to both ManageMyHealth and the Privacy Commissioner alleging a 'significant data exposure incident'")

The date that the email was sent would seem to line up with the timeline that both ManageMyHealth and the Office of the Privacy Commissioner had mentioned.

The article then presents screenshots of a PDF that their source had also attached to the email.

![](https://cdn.utf9k.net/blog/mmh-breach-two/georgenews-assessment.jpg "A security report talking about a 'high severity risk' that 'potentially' allows accessing sensitive health records")

The actual formatting of the report is quite strange. It contains regular headings but the actual paragraphs of the report appear to be unparsed [Markdown](https://en.wikipedia.org/wiki/Markdown).

For those following along with the whole LLM bubble/boom, you're probably raising an eyebrow or two given that LLMs love to generate lists that follow a key-value style, where the key is bold and the value is regular text.

Most of this wording... seems like it was generated by an LLM.

I wouldn't expect a real penetration test report to say something like "Presence of both 'http' and 'https' URLs suggest legacy or mixed-protocol vulnerabilities". A real report would either say there was a finding or there wasn't.

Padding it with "this could be a problem" defeats the whole point but LLMs love to use that sort of couched language.[^couched]

Moving on, the article presents screenshots of the breach that "has most definitely occurred" and... they don't prove anything.

![](https://cdn.utf9k.net/blog/mmh-breach-two/georgenews-alleged-breach.jpg "A text file containing a list of URLs that have been poorly redacted")

What we're presented with are lists of URLs that follow the general format of `https://managemyhealth.co.nz:/:<username>:<password>`.

The initial report mentions that these URLs were found indexed by a search engine and they don't actually mention that they are valid URLs, just that "These records have [...] come from the authentic site in question".

For the uninitiated, search engines work by crawling websites and indexing URLs that exist on pages. The more links your website receives, the more "authoritative" it is, and the higher it ranks. There is no rule that a URL [has to be functional in order for it to be indexed](https://webmasters.stackexchange.com/a/63461) by a search engine.

To put it in other words, crafting a URL that contains user information is the technical equivalent of projecting your credit card number on the side of the ManageMyHealth offices and then complaining that they're leaking your credit card number.

It's also important to point out that the URLs shown are for [managemyhealth.co.nz](https://managemyhealth.co.nz) which is their marketing website and NOT for [app.managemyhealth.co.nz](https://app.managemyhealth.co.nz/home). Even if you were to entertain the idea that these were real URLs, they should be crafted against the web application where the data would actually live, and not against the marketing site.

There is a [small cottage industry](https://www.troyhunt.com/beg-bounties/) of people who "discover" these sorts of security issues, probably nowadays by just copy-pasting whatever an LLM tells them, and then mailing the "victim" with their findings.

Having said all this, it's still a valid question to ask where these alleged usernames and passwords come from, and presumably they came from a previous breach.

We talked a bit before about how URLs don't have to be valid to be indexed. When visiting an invalid URL, you should expect to receive back a [404 Not Found](https://en.wikipedia.org/wiki/HTTP_404) status code to say "Whatever you're looking for doesn't exist".

What can sometimes happen is that some websites don't follow this standard and return a [200 OK](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#200) for anything and everything. It doesn't take much to imagine a ["hacker"](https://en.wikipedia.org/wiki/Script_kiddie) taking a previously leaked set of usernames and passwords, loading them into some sort of automatic tool, pointing it at the ManageMyHealth marketing website, receiving back "Wow, these are all valid URLs" and then believing that this somehow means they've successfully hacked into a bunch of accounts.

Back to the origin of the email addresses, I squinted at the various George News screenshots and was able to figure out about 10 different emails which I ran through [HaveIBeenPwned](https://haveibeenpwned.com/) and almost all of them returned hits.

From comparing the results, it seems that those email addresses were all originally part of various breaches in the late 2010s, such as [MyHeritage](https://haveibeenpwned.com/Breach/MyHeritage), [Neopets](https://haveibeenpwned.com/Breach/Neopets), [Deezer](https://haveibeenpwned.com/Breach/Deezer) and [MediaWorks](https://haveibeenpwned.com/Breach/MediaWorks).

These breaches, and many others, were then continuously recompiled into [many](https://haveibeenpwned.com/Breach/DataTrollStealerLogs) [different](https://haveibeenpwned.com/Breach/SynthientStealerLogThreatData) [sets](https://haveibeenpwned.com/Breach/AlienStealerLogs) [that](https://haveibeenpwned.com/Breach/StealerLogsJan2025) [continuously](https://haveibeenpwned.com/Breach/TelegramCombolists) [get](https://haveibeenpwned.com/Breach/NazApi) re-breached and recycled until someone presumably used one of these [combolists](https://www.cyberdaily.au/security/12267-not-a-breach-16b-strong-data-leak-is-a-gargantuan-combolist) against the ManageMyHealth marketing website and claimed an early victory for their minimal efforts.

Unfortunately for George of George News, I will not be buying any of the [George News merchandise](https://georgenewsorg.myspreadshop.com/) at this time.

### IOC3 claims to have discovered the real identity of Kazu

This one is fresh off the press and caught me off guard at first, so I can only imagine how many people didn't give this a second look.

On January 30th, RNZ [posted an article](https://www.rnz.co.nz/news/national/585494/cybersecurity-group-identifies-person-behind-manage-my-health-hack) about "The International Online Crime Coordination Centre" (IOC3), a cybersecurity group who claimed to have identified Kazu's identity.

Their Executive Director Caden Scott had the following to say:

> "We're just mindful that we're still looking into this individual, and we don't want to mistakenly drive this person underground by making them aware that there are these kinds of investigations ongoing into them."

This struck me as bizarre as I would have thought the easiest way to not spook someone you're investigating is by simply not blasting it out to the public with a megaphone.

Mike Jagusch, the Chief Operating Officer at the [National Cyber Security Centre](https://www.ncsc.govt.nz/) acknowledged that they were aware of the claims and said:

> "This process is called attribution, and it can be very complex. It requires significant analysis to have the necessary level of confidence to attribute activity to an actor or group."

This all quickly raises some red flags when you learn that IOC3 does not seem to be an official registered entity and [has only existed for about a month](https://www.linkedin.com/posts/cadenscott_i-am-excited-to-announce-that-bloxshield-activity-7405518458458853377-X1sE), being the rebrand of a [previously](https://register.charities.govt.nz/CharitiesRegister/Search?Submitted=True&CharityNameSearchType=Contains&CharityName=BloxShield) [unregistered](https://app.companiesoffice.govt.nz/companies/app/ui/pages/companies/search?mode=standard&type=entities&q=BloxShield&advancedPanel=true&entityTypes=ALL&entityStatusGroups=ALL) entity called [BloxShield](https://bloxshield.org).

Their stated mission is working with game developers, mainly those who make Roblox games, in order to help them protect their players. The BloxShield website has a "Report Abuse" button which takes you to a Discord server and there, you can file a ticket.

![](https://cdn.utf9k.net/blog/mmh-breach-two/discord-makeareport.png "A screenshot of a Discord server outlining that IOC3/BloxShield aids in combatting online harms, such as pedophilia, terrorism, violence and other harms")

This process seemingly creates a ticket using [Ticket Tool](https://tickettool.xyz/) which ends up with "Case Agents" volunteering with IOC3/BloxShield to action.

From what I've pieced together, this might look like using [OSINT](https://en.wikipedia.org/wiki/Open-source_intelligence) techniques such as chaining together links attached to user profiles (i.e. Roblox -> Spotify -> Instagram) and other tricks to identify alleged offenders.

Their current "Intelligence Communicator" (and previous "Lead OSINT Investigator") detailed an incident[^caden] on LinkedIn, prior to their joining IOC3 as a volunteer, where they had infiltrated a right-wing Discord server and compiled enough evidence to send to the employer of a right-wing administrator. A comment on that same post read "We do something like this over at BloxShield".

I don't know whether IOC3 actually compile dossiers to send to the employers of individuals reported to them, or if they are only concerned with identifying individuals and then filing police reports. Their involvement may also just be guiding individuals through filing their own reports via various game platforms.

Anyway, putting aside all that, I'm not sure that I would recommend Ticket Tool as somewhere to store case files that may relate to horrors suffered by minors. You probably want to at least have some sort of vendor contract to guarantee that data shared on your ticketing platform is stored securely, rather than just using a publicly available Discord bot.

Digging around on LinkedIn, IOC3 seems to be [mostly 18-24 year olds](https://www.linkedin.com/posts/cadenscott_2025-was-an-exceptionally-interesting-challenging-activity-7414435635480170496-BpvQ), a number of whom are attending university and are not strictly based in New Zealand.

There appears to be at least one person involved who has been doing policy-type roles for quite a few years but as with prestigious sounding names like "International Centre", it's possible that a few of those previous roles equate to writing articles from a hot desk at a local startup accelerator. Nothing wrong with it to be clear!

I did spot one LinkedIn comment from the BloxShield era that said they were "doing some top notch work to try and reduce the risk to children online". That post was from a member of the [Digital Child Exploitation Team](https://www.dia.govt.nz/Preventing-Online-Child-Sexual-Exploitation-About-the-Digital-Child-Exploitation-Team) at the [Department of Internal Affairs](https://www.dia.govt.nz/) so at the least, it does seem that authorities are aware of them, if not loosely affiliated with the group.

From all this, I think the generous interpretation is that we're seeing an early-stage startup, with all the mistakes that come with being relatively young. I'm still not a fan of invoking prestigious sounding names and titles but that's just my opinion.

Given the nature of the space they're working in, I would expect to see a lot more rigour behind establishing a solid web presence with some official information to look at because my initial impression was seeing a series of project websites which raised a lot of red flags, and still do to some extent.

## Other unanswered questions

### Where is Kazu from?

We don't officially know where Kazu operates from but they had come across [this article](https://www.thepost.co.nz/nz-news/360926388/will-manage-my-health-hacker-release-confidential-patient-data-today) by The Post, which quoted Simeon Brown as saying the following:

> As of Monday, he said “forensic work” by government agencies was underway to determine what country the hack had come from.

In response to that claim, they bragged "the country is Cuba" in their Telegram channel.

![](https://cdn.utf9k.net/blog/mmh-breach-two/kazu-cuba.jpeg "Kazu brags about being located in Cuba")

There is no way to definitively know whether this is just them playing a prank or not but I figure that it might be possible to disprove by doing some analysis of the various messages that we exchanged.

Here is a clock that represents Cuba time, with a 10pm - 6am sleep cycle highlighted. The timestamps of the messages that I received from Kazu have been overlaid on it as well.

![](https://cdn.utf9k.net/blog/mmh-breach-two/kazu-clock.png "A clock that demonstrates that almost all messages that Kazu sent would fall outside of a 10pm to 6am sleep schedule for someone based in Cuba")

If we assume that Kazu is in Cuba and follows a relatively normal sleep schedule, the timestamps of their messages wouldn't appear to contradict that as a possibility. The messages on New Year's were an outlier but many people are still awake at midnight on New Year's.

None of this is proof that they are in Cuba to be clear. There are a number of other countries in the same timezone.

We also can't rule out multiple operators as well, although I didn't get the impression that the personality of the person I was interacting with had changed over time.

For anyone interested in doing their own analysis, [here is a TSV](https://cdn.utf9k.net/blog/mmh-breach-two/timestamps.tsv) containing the timestamps of the messages that Kazu and I exchanged.

### My guess as to how the breach happened

I figure that we'll get the official look into how the breach happened once the various reports come out in the following months, but I thought it might be fun to engage in a little bit of speculation that I can revisit down the track.

From the [judge's decision in granting the High Court injunction](https://www.justice.govt.nz/jdo_documents/workspace___SpacesStore_78cb64bc_0e8f_4332_9851_5d51b9992657.pdf), we know that there were "repeated authentication attempts" with "rotating IP address usage" and "repeated access to document endpoints and internal [APIs]".

Further down, we're told that "Unauthorised access was gained through the exploitation of an API endpoint" for the "health documents module".

An [RNZ interview](https://www.rnz.co.nz/news/national/583319/manage-my-health-ceo-trust-us-even-though-we-have-dropped-the-ball) with Vino Ramayah, CEO of ManageMyHealth, also gave us the following quote:

> They came in through the front door using a valid user password.

So, we know that a user account was involved and that they had poked around with some of the APIs. I assume they were web APIs but they could have been mobile APIs as well. We'll assume it was done via the web.

I feel pretty dumb for doing some first principles guesses in my last post when I should have just made an account and poked around. I had imagined that I would actually need to start funnelling all of my health records over to ManageMyHealth but it turns out that it's pretty trivial to make an account.

Making an account and navigating to the Health Modules section, it didn't take much more than 5 minutes to form a guess on how the exfiltration might have taken place.

![](https://cdn.utf9k.net/blog/mmh-breach-two/mmh-docs-upload.png "I am enjoying uploading an image of a sausage dog into the ManageMyHealth portal")

You're presented with a basic list of files that you can upload and download. Here I am uploading a photo of a funny sausage dog that [I got from Wikipedia](https://commons.wikimedia.org/wiki/File:닥스훈트(단모종)_(Dachshund_(Short)).jpg).

When my funny image is uploaded, I can open the detail pane again and a request is made to the following URL:

```
https://portalapiv2.managemyhealth.co.nz/api/HealthDocuments/GetHealthDocumentDetail/477587
```

Note how the document ID is an incrementing number. We can probably assume that the last uploaded document was given the ID `477586` and the next uploaded document will be given the ID `477588`. To be clear, just because we can guess a valid ID does not (and should not!) mean that we can actually access the file associated with that ID.

Carrying on, the URL above retrieves the following metadata in order to render the details pane:

```json
{
  "DocumentId": 0,
  "DocumentName": "weinerdog",
  "DocumentValidTill": "2026-05-02T10:05:47",
  "Description": "An image of a funny dog",
  "FileName": null,
  "OriginalFileName": "weinerdog.jpg",
  "DocumentTypeID": 9,
  "Createdusername": null,
  "ShareToDoctor": false,
  "ShareToCareTeam": true,
  "CreatedUserName": "",
  "IsActive": false,
  "UserProfileId": 0,
  "PatientID": "330948f6-5614-4a6e-9fad-453896e26a41",
  "CreatedBy": "330948f6-5614-4a6e-9fad-453896e26a41",
  "Source": "PATIENT"
}
```

Here we can see that the file I uploaded had the filename `weinerdog.jpg`.

In order to retrieve my funny image, I can click the download button which issues a POST request to the following endpoint:

```
https://portalapiv2.managemyhealth.co.nz/api/HealthDocuments/DownloadFile
```

That POST request contains the following request body:

```
{
  "fileName": "weinerdog_736e4584ac924f89a24bddd158223a8f.jpg",
  "originalFileName": "weinerdog.jpg"
}
```

I would guess that `fileName` contains some random bits (perhaps a hash of the file) to avoid collisions that could occur from uploading files with names that already exist behind the scenes.

There are all sorts of wacky exploits we can imagine but if we follow [Occam's razor](https://en.wikipedia.org/wiki/Occam%27s_razor), the most boring explanation would be that there was no mechanism to prevent listing file metadata for IDs that weren't your own, coupled with no mechanism to prevent requesting files that weren't yours.

We could probably verify this if we had a copy of the JavaScript bundles that power the webapp but sadly we don't.

Some other theories were that perhaps there was an open storage bucket (i.e. Azure Blob Storage) or credential theft from an employee.

I don't think either of those make sense given the information discussed above, mainly the mention that a "valid user password" was involved.

The employee credential theory avenue would also seem to contradict only Health Documents being affected. I would expect employee credentials to have much wider access to ManageMyHealth's systems, and we'd be talking about an even broader scope as far as what was stolen.

![](https://cdn.utf9k.net/blog/mmh-breach-two/kazu-documents.jpg "Kazu notes that most ManageMyHealth users did not seem to use the Health Module section of ManageMyHealth")

Anyway, I don't have my fingers crossed that the exploit will have been anything super exciting.

### My guess as to whether the ransom was paid

I think the ransom was paid but that's just my personal opinion and not a proven fact.

We know that Kazu needed the whole saga to go away.

![](https://cdn.utf9k.net/blog/mmh-breach-two/kazu-heat.jpg "Kazu talks about how they need the whole saga to end as soon as possible")

![](https://cdn.utf9k.net/blog/mmh-breach-two/kazu-media-heat.jpg "Kazu confirms that there is too much attention for their liking")

They may have even lowered their asking price, despite having said previously that $60,000 was chosen [because it was their minimum ransom price](https://cdn.utf9k.net/blog/mmh-breach-two/kazu-mmh-announce.jpg).

There has been no mention of the ransom being paid from either side, but I think we can assume that part of paying the ransom includes silence on the part of Kazu.

On the evening of Tuesday 6th January, the ransom post was taken down and by Wednesday 7th January, all mention of the event had been scrubbed from their Telegram channel.

ManageMyHealth did continue to reference negotiations as being a "police matter" in the press releases for the days that followed but it would be in their best interest to give the illusion of ongoing negotiations until the general public forgets about the whole thing.

No one has presented any evidence of the full breach dataset being uploaded online to my knowledge either.

There was [an RNZ article](https://www.rnz.co.nz/news/national/584745/manage-my-health-data-breach-fraudsters-could-attempt-to-contact-customers) that made it sound like this had happened but nothing in that article explicitly says that the data was released. It just mentions an increased awareness of actors who may be trying to impersonate ManageMyHealth.

Kazu was also quite chatty until trailing off rather suddenly during the afternoon of Tuesday 6th January.

Finally, there's this message from the afternoon of January 6th. I'll leave it up to your interpretation.

![](https://cdn.utf9k.net/blog/mmh-breach-two/kazu-signoff.jpeg "Kazu thanks the author for their hard work")

For context, the "hard work" they're referring to is trying to share what I learned about the whole saga, which temporarily became a second job when the original deadline was brought forward.

I don't doubt it benefited them, as more attention only adds more pressure to their target. Well, up until it becomes too much and they themselves disappear I suppose.

### Other things I tried that didn't work out

We've talked a lot about things that I did find out but it's probably just as useful to mention things I tried that didn't work out. Most of this was just for kicks and I didn't really expect any of it to pan out but it was still quite fun.

A little while after the final deadline expired, I set up crypto accounts with [two](https://easycrypto.com/) [popular](https://www.independentreserve.com/nz) New Zealand cryptocurrency exchanges and asked if they could help me with an unexpectedly large crypto transaction that I needed to facilitate.

After they got in touch, they both seemed genuinely confused and unaware of the whole ManageMyHealth saga when I asked if they had heard anything about a possible ransom payment.

I also booked a free consultation with a local [crypto consultancy](https://cryptoconsulting.nz/) to ask if they had heard anything about a possible ransom payment. They also didn't know anything and were actually quite annoyed at ManageMyHealth themselves.

It turns out that [quite](https://www.canterbury.ac.nz/life/support-and-wellbeing/uc-health-centre#accordion-b5d04f67d0-item-ac2a3aaefb-button) [a](https://www.otago.ac.nz/news/newsroom/how-to-make-appointments-at-student-health) [few](https://www.aut.ac.nz/student-life/student-health-and-wellbeing/student-medical-centre/appointment-costs-and-booking) student clinics use ManageMyHealth, so a few alumni were caught up in it as well.

Lastly, I spent a few days [downloading blockchain transactions](https://blockchair.com/dumps) covering 8th to 11th January and [ran some junk](https://en.wikipedia.org/wiki/Vibe_coding) that would traverse through each block in order to see if there were any transactions that met a few conditions.

Off the top of my head, it would score with a preference towards:

- The sending wallet would be freshly created, perhaps only an hour or two prior to sending
- The receiving wallet would probably also be freshly created, or at least not have any prior transactions
- The receiving wallet would probably transfer the incoming amount very quickly, with [a large number of transfers](https://en.wikipedia.org/wiki/Cryptocurrency_tumbler) taking place downstream
- The amount would be roughly $60,000 USD (adjusting for exchange rates at the time)

There were one or two false positives but nothing that I felt confident enough even mentioning.

Assuming there even was a transaction, there are just too many variables.

Off the top of my head, a few could be:

- ManageMyHealth may have received a discount (or even paid extra for silence)
- They may have facilitated a transaction through an existing wallet offered by a third party (or an exchange)
- The receiving wallet might have held onto the funds with the intent of only cashing out months later when no one is looking

Who knows, maybe we'll find out indirectly through one of these reports.

## How did the first post go down?

> [!NOTE]
> Feel free to leave now if you like. This is just me doing a bit of a lap because my last post did quite well. I'm allowed to do that on my own website!

As with all of my posts, I don't actually have any analytics. I can partly infer traffic via my [CDN provider](https://bunny.net/) but it's pretty flawed given that there's a constant baseline of bots and RSS readers, combined with no way to actually filter down to what pages are being fetched.

![](https://cdn.utf9k.net/blog/mmh-breach-two/bunny-metrics.png "A bunch of HTTP requests on a graph. There is a spike above usual but there is a constant baseline of bots and RSS readers so it really doesn't represent anything that can be meaningfully interpreted")

There is some support for viewing stats based off logs but logs are only retained for 3 days as well so that information is lost.

Anyway, all of this is very much a feature because the idea of having an audience sounds pretty stressful. It's much nicer just writing what you want to read, and assuming that it's just going into a void.

I think this is only the [second time](https://news.ycombinator.com/item?id=28271288) that I've become aware of a post being read by more than a few people and I'd say this is definitely the most widely read to date.

As a bit of backstory, I use a service called [Beeminder](https://beeminder.com) which I've [written about before](/blog/lessons-beeminder-year-one). In short, you set goals which can be measured numerically and then you either do the goal or you get charged in ever-incrementing amounts.

I wrote the first ManageMyHealth blog post between 12am and 4am on the morning of 4th January because I would get charged $10 if a new post didn't appear in my RSS feed for Beeminder to automatically verify.[^cheating]

There weren't any other notable events going on at the time[^venezuela], and I certainly didn't have anything else that I could easily write about, so I figured I might as well just do a recap of the story.

To my complete surprise, a friend of mine shared a link to Reddit [where it had been picking up a bit of steam](https://old.reddit.com/r/newzealand/comments/1q32hln/manage_my_health_data_to_be_released_in_48_hours/nxhxk63/). It's still a mystery to me how exactly it got picked up, given that I'd have thought it would be buried deep on Page 50 of Google's search results.

I spent most of that day responding to some nice comments on Reddit as well as correcting some misinformation but then I figured that was pretty much it since I'd be back at work the next day.

In a complete dereliction of my job, I spent pretty much all of that following Monday and Tuesday following discussions about the story and then slowly fielding requests from actual reporters on how to follow developments with the ransom, as well as how to get in contact with Kazu, the actor[^actor] behind the ManageMyHealth data breach.

All up, I had at least one interaction with about 7 different reporters from 4 different mainstream outlets.[^count]

Most of it was invisible, as I don't really care to become a talking head providing comment, but the other items I did provide such as a lightly censored screenshot of a forum post and a screenshot of a Telegram message contained almost no original content and could be arbitrarily recreated by anyone else.

Crediting me with something I didn't create for the most part just seems silly although I obviously understand the appeal of "becoming" part of a story to some extent.

Funnily enough, even Kazu themselves apparently discovered my post, outing my identity in the process, but to my surprise they quite enjoyed it.

![](https://cdn.utf9k.net/blog/mmh-breach-two/kazu-writeup.jpg "Kazu says they read a lot of reports but quite enjoyed the one by the author the most")

I wasn't too worried about them learning who I was, as I had signalled my intent to share whatever I thought was notable and to some extent, they seemed to quite enjoy being able to talk to someone a bit more technical.

Obviously I don't condone their actions but I never got the impression that they felt what they were doing was morally good or justified. From their point of view, it's simply a business.

Unfortunately, their business just happens to involve messing with the personal lives of hundreds of thousands of people across many countries.

[^venezuela]: As we've seen with 2026 so far, this wouldn't be true for very long...

[^erroneous]: As mentioned in the last post, the second sample set was accidentally included as part of the unrelated Saudi Icon architecture firm breach sample set.

[^publication]: For anyone interested, it takes a few days for these High Court judgments to become public. Anyone can email the High Court to request a copy and it comes with an [Information for Publishers](https://cdn.utf9k.net/documents/Manage+My+Health+Ltd+v+Unknown+Defendants+[2026]+NZHC+2+PS.pdf) attachment that tells you whether sharing is restricted or not. Ideally, you would [find out which High Court](https://www.justice.govt.nz/contact-us/find-us/) location the request was filed with to get the fastest response but they all inter-communicate and will forward your request on to the right place if you're not sure.

[^solicitor]: [Apparently in New Zealand](https://legalvision.co.nz/disputes-and-litigation/solicitor-barrister-lawyer-new-zealand/), a lawyer can carry out the function of a solicitor (non-court matters), a barrister (court matters) or both simultaneously. I'm just going to say lawyer for ease of reading but ManageMyHealth specifically retained solicitors for the purpose of serving injunction orders.

[^changedetection]: I don't have links for these updates, and they weren't captured by the Wayback Machine but they were captured by the instance of [changedetection.io](https://github.com/dgtlmoon/changedetection.io) that I run at home. More specifically, ManageMyHealth have stopped issuing standalone press releases and now have one jumbo press release that they keep editing and changing the date for.

[^secrecy]: You might be thinking "Doesn't that mean telling BusinessDesk about the anonymous tip in the first place is technically illegal?" to which I would say "It does seem like that, doesn't it?".

[^x]: Yes, the infamous Elon Musk pedophilia generation website. I still need to delete my account. Coding agents are having a moment in early 2026, which I still need to write about, and a lot of LLM research types [are on there](https://x.com/bcherny/status/2007179832300581178) which is mostly why I still haven't gotten around to deleting my account. Fuck Generative AI for art though. I will continue to buy and support real art as I have for many years. I think the whole thing is a bubble that does not require terraforming small rural towns into data centres but there is also value in "[automatic programming](https://antirez.com/news/159)". Surely we can scale down this whole operation to what's actually useful and get rid of the [Microsoft Copilot](https://en.wikipedia.org/wiki/Microsoft_Copilot) enterprise bullshit that [no one wants to buy](https://arstechnica.com/ai/2025/12/microsoft-slashes-ai-sales-growth-targets-as-customers-resist-unproven-agents/). Forced business cases seem to be powering most of the worst aspects of this whole thing. A story for another day.

[^couched]: I do it too when I'm scared of being wrong on the internet but I also don't make a habit of CC-ing the Prime Minister when I'm on the fence about whether something could be a problem.

[^caden]: Given that IOC3 seems to be mostly younger people figuring things out, I drew a line here at linking to Caden's public profile. It seems fair given that he has voluntarily appeared on TV once or twice, and is the Executive Director (and face) of IOC3/BloxShield. I won't be linking to the other volunteers.

[^cheating]: My "deadline" is set to 3am because I would find myself often doing things a little after midnight. I cheated a little by pushing the majority of the post and then continuing on past the 3am deadline.

[^actor]: We still don't know if Kazu is an individual or a group. [This article](https://www.nzherald.co.nz/nz/hacker-claiming-to-be-behind-managemyhealth-breach-i-do-it-for-the-money-and-im-in-negotiations-to-get-it/premium/FC2PYCTFXVEOXN4Q27ONTQIDKA/) from the New Zealand Herald had an interview with Kazu and while there's no way to verify Kazu's claims, they did fill in a few blanks about how they operate.

[^count]: I think that's accurate off the top of my head but I started losing count at around 4.
