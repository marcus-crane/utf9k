---
category: blog
date: 2023-12-17T14:14:00+13:00
description: An unreleased post where I talk about Discord and what might happen to them if they were acquired
slug: one-possible-death-for-discord
tags:
  - business
  - discord
  - microsoft
  - acquisition
title: One possible death for Discord
---
> [!note] 💻 This post was an unpublished draft that accidentally got published.
>
> This post was originally a draft that I threw together in 2021 when Microsoft were [allegedly in talks to buy](https://www.theverge.com/2021/3/26/22352028/microsoft-discord-acquisition-analysis-report) Discord.
> 
> Around the same time, there was a lot of discussion in the gaming community around Discord and how it's "better" than Slack which is the wrong view given they target different markets.
> 
> While doing some work on my site, the post was accidentally published so I figure I might as well just push it out into the world.
> 
> From what I remember, the post didn't really have any clear direction so I was going to split it up into smaller chunks, but the window it was relevant in has long passed and I don't have any real reason to ever get back to it.> 

In this post, I'm going to be considering a "What if" scenario for fun regarding the idea of Microsoft buying Discord. For those unaware, [Microsoft is apparently talking with Discord about possibly buying them up](https://www.wsj.com/articles/microsoft-is-in-exclusive-talks-to-acquire-discord-11616715164) for at least $10 billion. As I'm writing this, it hasn't happened yet which is always the most fun time to speculate.

Before this whole deal was being considered, I had intended to write a bit about the idea of why business don't, or can't, use Discord. That isn't to suggest it's a business platform but a sentiment that pops up sometimes from employees is "Why can't we use Discord at work?". This seems like as good an excuse as any to dig a little into why Discord and Slack are different but also, what if they weren't anymore.

As far as my credentials, I'm just simply a user of Slack and Discord. I've used the former in a work setting but also talked with some Internal IT and Security Risk people about the latter one time or another. None of this should be taken as some sort of analysis (financial or otherwise) because most of this is just me brain dumping some thoughts after going for a walk. I'm sitting down at my computer and I don't want to put in more effort than I need to!

With that out of the way, let's talk a bit about Discord.

## Isn't Discord for gamers?

For those who haven't used Discord or even heard of it, it's a "communications" app that was initially focused at "gamers" but has expanded to cater to all sorts of communities. This pivot seemed to be a sort of "build it and they will come" in overdrive but also aided by the pain of using Slack at the time.

Slack has come a long way but from memory, back around the mid-2010s, it was painful being a large community using Slack. Inviting people was hard enough because you had to send them an email invite. This didn't really scale so people would make these pseudo-self service websites where you would enter your email and then someone would get back to you, or something like that.

The other, more relevant issue was the hidden user limit on the free tiers. For open source communities and the like, they quickly found that their workspaces would [max out at around 5000+ users](https://www.freecodecamp.org/news/so-yeah-we-tried-slack-and-we-deeply-regretted-it-391bcc714c81/) making the app barely useable. Some groups "fixed" this by having overflow workspaces (ie `<project-name>-2`) and so on while others migrated to other platforms, with Discord being one of them.

This is all anecdotal of course but between the ability to self invite yourself to Discord servers and the ability to support tens of thousands of users, it seemed to be more viable than Slack, for non-paying users, back then anyway. Slack does scale to much, much higher numbers for paying users, and their [enterprise plan](https://slack.com/intl/en-nz/enterprise) allows you to effectively pseudo-"partition" your business into multiple workspaces. I say pseudo because some channels may span across multiple spaces while others only exist within one workspace but that's besides the point.

## What keeps people using yet another chat platform?

While I can't speak to the actual wider audience, I can at least point out a few things that I think are done well in Discord, compared to what else is available.

### Technical competency

I don't actually have any evidence of this but Discord seems like an application that has been fairly well developed.

The desktop clients built using [electron](https://www.electronjs.org) which has a tendency to be [resource intensive](https://josephg.com/blog/electron-is-flash-for-the-desktop/) among other things but Discord is generally considered to be one of "the good ones".

This is where we leave evidence for anecdote territory but I'd be hard pressed to recall a time where Discord has been sluggish or broken due to some obscure dependency issue. There are still [outages](https://discordstatus.com), as with any [SaaS](https://en.wikipedia.org/wiki/Software_as_a_service) product but by and large, the "feel" of the application has remained snappy.

Some of the technical skill on display can arguably be demonstrated through Discord's [engineering blog](https://blog.discord.com/engineering-posts/home), featuring some deep dives into [reducing latency](https://blog.discord.com/using-rust-to-scale-elixir-for-11-million-concurrent-users-c6f19fc029d3), and their seemingly investment in contributing [open source software](https://github.com/discord) to the community.

Take all this with a grain of salt mind you since a comparison to Slack would be comparing apples to oranges. In my mind, enterprises and Microsoft both lean towards having a swiss army knife that does everything for everyone where Discord doesn't have to bend over backwards to implement features that don't make sense... yet? As such, I can imagine they might have less bloating than something like Microsoft Teams would, which doesn't hurt when having to scale up.

## Discord as a meta-layer

To some extent, Discord can be [thought of as a meta-layer](https://kwokchain.com/2019/08/16/the-arc-of-collaboration/). That's just a fancy way of saying that when you're in a game, you don't necessarily "leave" Discord because there is an overlay that appears within the game.

![A mock screenshot from the original Discord support pages. It shows a game, possibly Fortnite, in the background obscured by two large windows. The window on the left shows some channels within a Discord server. The window on the right shows the contents of the selected channel, called \#pallet-town.](https://cdn.utf9k.net/blog/one-possible-death-for-discord/discord-overlay.jpg)

If you hit whatever the key combination is, the game UI dims as a Discord window pops up and you can chat with your friends. Whether it's text or voice chat, you don't have to leave the game to interact with Discord as a whole.

This concept isn't new by the way. Valve[^valve] have offered an overlay for titles distributed via [Steam](https://store.steampowered.com/about/) for many years. The difference with Discord is that they have remained relatively platform agnostic. Whether it's [Origin](https://origin.com), [Ubisoft Connect](https://ubisoftconnect.com/en-US/)[^uplay] or even [Xbox](https://news.xbox.com/en-us/2018/04/24/microsoft-discord-team-connect-gamers-across-xbox-live-discord/), odds are the Discord overlay will work out of the box.

This idea of a "meta-layer" isn't strictly related to just gaming. If you view the profile for someone on your friends list, you might see that their presence spans beyond just gaming.[^profiles]

![A screenshot showing the Discord client. It's a regular macOS window with extremely dim, unreadable text in the background with a green modal in the forefront. It shows the authors Discord profile name at the top. In the middle is a block that reads "Listening to Spotify". It depicts the author is currently listening to the song "Imbrium - 0edit Remix" by "Ed Harrison" on Spotify. The user is provided a link to listen along with the author, adding to the idea of Discord being a meta-layer between users and a music streaming service in this case. At the bottom is a two column grid showing a variety of links to profiles such as Battle.NET, Github, Spotify and Steam.](https://cdn.utf9k.net/blog/one-possible-death-for-discord/profiles.png)

While initially focused on gaming, Discord has some integrations with more widely used platforms such as Spotify and Github. For Spotify, you can see what friends are listening to, and even listen alongside them. For Github, it's merely just a vanity thing but as a reminder, Microsoft does own Github now. Just something to keep in mind.

Now having an overlay in itself isn't valuable of course but it's a taste of what makes Discord feel lively. A sort of glimpse into what other people are doing beyond relying on someone updating a status message. Some users have taken this idea of Discord's [rich presence](https://discord.com/rich-presence) and expanded it into desktop applications such as [text editors](https://github.com/LeonardSSH/coc-discord-rpc), [image editors](https://github.com/smokes/photoshop-rich-presence) and even [websites](https://github.com/imfunniee/youtube-discord-rpc).

## So why don't businesses use Discord?

I can only speak from the point of view of the discussions that I referenced earlier but from a business point of view, there's a few things I can at least theorise.

The most obvious point is simply the target market for Discord. They don't market themselves as a business application. I don't doubt there are companies who use Discord, and employees who wish they could use Discord but as it stands, they aren't aimed at business.

I can only imagine someone trying to pitch "gamer chat" to an executive board before the rebrand went ahead. Not exactly a good look but for the sake of argument, let's say that were aimed at business.

There are a few things missing such as user management tools, security certifications and probably single sign on. Let's look at those one by one.

### Security certifications

Arguably the most important, and generally the real answer to "Why can't we use Discord at work".

For the unfamiliar, there are generally two standards to keep an eye out for when it comes to determining the "security posture" of a business: [ISO 27001](https://en.wikipedia.org/wiki/ISO/IEC_27001) and [SOC 2](https://en.wikipedia.org/wiki/System_and_Organization_Controls#Types).

If you're familiar, feel free to skip this part otherwise I'll try to keep this as straight forward as jargon free as I can. You should also note that I don't work in the realm of security analysis. I don't have a good understanding of these two standards in depth so this is just what I've picked up from people who do.

The purpose of ISO 27001 is essentially to outline how businesses should go about recognising, and reducing risk. What does this even mean? Let's pretend we work at Discord.

You're sitting in your office and there's someone at the front door knocking on the door, wanting to be let in. Is that a risk? Well, it depends if they're an employee or not. Businesses can be a pretty big place so you're not guaranteed to know everyone. The risk here would be if you let someone "unauthorised" (ie not an employee) into the building, without your knowledge. They could do all sorts of things like look at confidential documents or planting malware on a computer. It's not to say that they would of course but it's still a possible risk.

Now you might assume that a security standard would say "Well, all employees should wear badges" but that's not quite correct. Generally, it would say something like "You should be able to identify who is allowed to enter the building". The next step might be to answer this by "Well, we'll have everyone wear badges" but it isn't prescriptive. The idea is that you can identify any given risk (unauthorised people entering the office) and reduce the likelihood of that risk happening (making it clear who is an employee with a badge).

Bringing it back to Slack, they have both [ISO 27001](https://a.slack-edge.com/5ff60/marketing/downloads/security/Slack-27001-1105886-4.pdf) and SOC 2[^slack-soc2] certification where as Discord does not.

For a large business looking to decide between Slack and Discord, seeing the magic words "ISO 27001 and SOC 2" is like instant shorthand for "Ah, they will handle our data securely". This isn't to say that Discord is not secure by any means but just that Slack has been audited to prove it.

You don't have to ask "Do Slack employees wear badges to keep unauthorised people out" for example because the certifications prove as such. When evaluating Discord, your security people are probably going to have a laundry list of questions that they'll want answered and proven.

In reality, Discord would likely not even be considered due to lack of credentials before it even comes to evaluating whether they'd be a good fit.

### User management

Next up, let's look at a small business using Discord to chat.

Getting onto Discord is easy. You just sign up and join your private server. If your coworker is having trouble, you can just simply walk over and help them. When the next person joins, someone sits with them and installs Discord or they do it themselves.

That all works fine but now you've got hundreds or thousands of users. Installing Discord on their laptops might be easy enough (some software installs it automatically) but how do you set up accounts?

Do you get them to manually make them? Well, you could but some are probably going to run into trouble and it'd be easier if an account could just be made for them. Generally, businesses will have one single way to sign in, such as [Okta](https://www.okta.com) or a work-only [Google account](https://saml-doc.okta.com/SAML_Docs/How-to-Configure-SAML-2.0-for-Slack.html).

Along with this generally comes a permissions model such as "Users in this group are administrators while users in this other group can do X and Y but not Z". These permissions carry into Slack, and are inherited by Slack user accounts, but they're inherited from some single source of truth. Often times, this tends to be [Active Directory](https://en.wikipedia.org/wiki/Active_Directory) which you can basically think of like a big phone book but that's outside of the scope of this post.

Now for Discord, to my knowledge, there is no such way to sign in using some external account. You can use Discord to sign in to things but you can sign into Discord itself using outside accounts. This also means you can't automatically set some users to have more permissions than others.

### What if you had Discord Rich Presence at work?

As our first dip in the waters of "What if", it doesn't take much to imagine a private Discord server with your fellow coworkers and being able to see what they're up to. Coworker A is editing "New User Profile Redesign" with [Figma](https://www.figma.com) while Coworker B is editing "2021 DMCA Notice" in Microsoft Word. From a purely technical standpoint, it's a cool idea but the social and security implications make it a living nightmare.

Technically, the ability to pop open an overlay in your text editor without having to alt tab to another window would be interesting. It's still context switching but no matter where you are, you don't have to switch out of the application you're in necessarily. Your overlay may be scoped to just one channel while the rest of your notifications can be ignored for later.

Socially, the idea that anyone could watch what you're up to during the day is at best uncomfortable and at worst compromising. I imagine you could turn these of course but taken to the logic extreme, you just know some micro manager would insist that rich presence is made available to all possible applications and forced on by default.

Security wise, you'd definitely want to make these accounts separate from your user account.

[^profiles]: There's no reward for doing this but it helps bind together otherwise disconnected profiles. Some friends I have online tend to change username from time to time or use different names for each platform. One thing I often have trouble with is remembering the Twitter username for someone I know on Steam for example.
[^valve]: Valve is the name of the game development company who distributes Steam. Often times, Valve are mistaken referred to as Steam or it's believed that Steam is a company unto itself. The reality is that Steam was created to distribute Valve games via the internet but has now been the largest digital PC gaming store for quite some time now.
[^uplay]: For those who were vaguely familiar with uPlay, apparently Ubisoft rebranded uPlay to Ubisoft Connect sometime in 2020. News to me!
[^slack-soc2]: Like a lot of companies, SOC 2 reports tend to be available upon request for enterprise companies but otherwise are not made public. Presumably because they contain confidential information but I've never read one personally.
