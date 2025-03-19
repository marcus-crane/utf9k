---
category: blog
date: 2023-11-21T18:00:00+13:00
description: Ironically, I don't actually drive currently so I'll be fine
slug: vehicle-congestion-gnss
tags:
  - cars
  - privacy
  - surveillance
title: What does vehicle congestion tracking mean for privacy?
---
Unfortunately for me, I finally[^1] got around to checking out [Beeminder](https://www.beeminder.com) recently and as a result, I'm due to write one blog post by the end of the day or be charged $5.

Normally, I would be the last person to write anything about driving but I need a topic and so it just so happens that I actually did a bit of a dive into this topic on the weekend so here we are.

I bought a copy of the [New Zealand Herald](https://nzherald.co.nz), New Zealand's flagship newspaper[^2], which contained [a story about congestion charging](https://www.nzherald.co.nz/nz/congestion-charging-everything-you-need-to-know-including-when-the-latest-plans-could-hit-motorists-in-the-pocket/7AIPZTAXYBDGZGERDGYVWL66R4/) or more specifically, our lack of it.

The gist of the story is that [Auckland Council](https://www.aucklandcouncil.govt.nz/Pages/default.aspx) is looking into introducing it which is technically true but this has been on the table for quite some time.

It really kicked off earlier last week when the mayor of Auckland[^3] suggested charging $5 per trip on the highway which is probably an insane idea if I had a stake in the matter, but I don't so I found it extremely funny to imagine.

Anyway, back to that original article, it featured a quick rundown of what various political parties and cities thought about it all.

Nestled amongst it all were the views of [ACT New Zealand](https://en.wikipedia.org/wiki/ACT_New_Zealand), our right-wing classical liberal party who were described like so:

> The party envisages variable charges during traffic jams, dropping during free-flowing traffic, broadly in line with “time of use” charging
>
> Eventually, Act aims to copy Singapore nationwide with satellite-based pricing, and over time make all cars imported into the country fitted with a transmitter for tracking, and free transmitters for older vehicles after a five-year transition period.

Casually putting "satellite", "transmitter" and "tracking" all in the same sentence made an exclamation mark pop up over my head.

Now on paper, ACT should be all about personal privacy but they also have a leader who [cracks eggs like you would wring a hand towel](https://cdn.utf9k.net/blog/vehicle-congestion-gnss/eggcrack.jpg) so I figured I should do a little bit more digging for my own curiosity.

Before we continue, this would be a good place to pause and mention that, personally, this is all very much an investigation out of technical interest.

It could be tempting to jump the gun and yell "Big Brother" but [at the end of the day](https://www.youtube.com/watch?v=B811XSGf--A&t=45s), these sorts of dull policies are implemented by normal, hardworking public servants who have to work through all manner of privacy and safety implications in excrutiating detail.

Back on track, I can see it's starting to get a bit dark outside so I need to write faster and make less gags.

Over in Singapore, they have an Electronic Road Pricing (ERP) system which consists of large overhead gantries like this:

![A photo of a highway with a few cars driving on it. Above the highway is a large structured with white panels and a blue centre panel. The centre panel has the letters ERP and an electronic dislay which is turned off.](https://cdn.utf9k.net/blog/vehicle-congestion-gnss/fort-canning-tunnel.jpg)

You can read a bit more about it in [this discussion paper](https://www.itf-oecd.org/sites/default/files/docs/congestion-control-singapore.pdf) titled "Congestion Control in Singapore".

It primarily talks about the overhead gantry system but at the time of writing, work is underway to replace the gantry system with the aforemented "satellite-based pricing", which is to say: Cars will be fitted with a device that can talk to a satellite.

The system is just generally referred to as being [GNSS-based](https://en.wikipedia.org/wiki/Satellite_navigation) although there are four such systems with GPS being the most well known. It seems that Singapore's system [may be powered](https://qzss.go.jp/en/overview/downloads/movie_qzss.html) by [QZSS](https://en.wikipedia.org/wiki/Quasi-Zenith_Satellite_System), a regional satnat system launched by the Japanese Government which is technically not a GNSS system but is still compatible with GPS.

Detours aside, the way that this new satellite system works is that vehicles are outfitted with onboard units (OBUs) which you can see an example of [in this video](https://www.youtube.com/watch?v=KZPYTa6Ox-4).

The idea is that the OBU can communicate with overhead satellites and allow proper congestion charging no matter where you are. No longer is the roading system bound by having to physically install gantries everywhere but it does raise the question of when tracking begins and ends.

Before we even get into it all though, just the logistics of having everyone in the country adopt such a device is already a bit of a non-starter in most places but let's keep looking.

More relevant for New Zealand is this [unfortunately titled](https://en.wikipedia.org/wiki/Jewish_question) report called [The Congestion Question](https://www.transport.govt.nz/assets/Uploads/Report/The-Congestion-Question-Report.pdf), a report prepared by a who's who of car-and-tax enjoyers.

It's still getting dark so I'm just going to skip to the spoilers on Page 38:

> We found that automatic number plate recognition technology is likely to be the most suitable and cost-effective solution for a congestion pricing scheme that is available today. This is already in use on New Zealand's three toll roads and would be necessary for any scheme for enforcement purposes.
>
> In the near future, in-vehicle technology incorporating a Global Satellite Navigation System (GNSS) could offer a more sophisticated solution, but there are a number of risks and logistical barriers to overcome before this is feasible.

This doesn't tell us much about the actual implications of GNSS-based toll charges if they were introduced so let's flip over to this other document titled [GNSS Technology Summary](https://www.transport.govt.nz/assets/Uploads/Paper/GNSSTechnologyAssessment.pdf).

Down on Page 6, we start getting into the nitty gritty of what could go wrong:

> Although privacy protections can potentially be designed into a GNSS based system, misperceptions and lack of proof about how the technology works can mean that a narrative about “spy in the sky” or “tracking the public” can quickly gain credence, raising concerns that the scheme is a Trojan horse for mass scale government surveillance. GNSS is often related with invasive government “tracking” and the data could be applied for other traffic enforcement purposes or wider law enforcement purposes.
>
> Building privacy into the technology is possible but technically difficult due to the opportunity for malicious parties to affect the distributed system in so many ways. Even more difficult is the task of proving that the system is technically secure and data stored is private

As far as tracking itself, no country at the time of the report had actually implemented the system so any OBUs would be custom made but there is a brief description of a Belgian heavy-vehicle device:

> Belgium is one of the more recent schemes and allows for the self-install of the small lunchbox size OBU via the cigarette lighter plug

If this were the model to follow, it stands that you could leave it unplugged until you get to somewhere that utilises congestion although that list will be every growing. Convenience always wins with these things so I imagine most would just leave these things on all the time from the minute you turn on your vehicle.

You also don't want to be leaning over in traffic to plug in your OBU only to accidentally cause a crash and all that.

This sentiment is mentioned within the report though:

> Unlike a smartphone or removable device, a permanently mounted OBU will be a reminder of continuous vehicle tracking. This will raise additional privacy concerns with vehicle users, particularly when non-chargeable vehicle trips are undertaken.

You can read the rest of the report but the gist is that all of this is very much a pipe dream that would be extremely difficult to implement purely from a logistics level before you even get into how to tackle the social and privacy perceptions that the public will ultimately have.

With that, I have saved myself from being beeminded into financial ruin and I can promptly forget any of this ever happened until we all live in a cyberpunk dystopia where we can be tag-teamed by Big Car and Big Tax all day long.

[^1]: While I initially signed up due to their new [Readwise Reader](https://blog.beeminder.com/readwise/) integration, I had been vaguely aware that it existed for about the last 10 years. I think I had passed it off as being unmaintained since they hadn't injected 90% whitespace into their margins. Ironically, they're probably more active (in a user-facing sense) than any other company I can think of! Also, I'm writing this post so something works.

[^2]: They're also Voyager's Website of the Year. Presumably an award that can only be awarded by a panel of judges who are blind, masochist and a level of self respect that starts at "It's not so bad, they only have 4 chumboxes nestled amongst their 1:9 content-to-ad ratio"

[^3]: A real person who has a name that I could type but that would require me to think about them more than once during the current lunar cycle so instead I'll leave that task up to the reader