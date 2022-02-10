---
title: "Plex + Tidal = A Nice Match"
date: "2022-02-10T02:00:00+1300"
slug: "plex-tidal-together"
category: "blog"
tags:
- "audio"
- "music"
- "plex"
- "spotify"
- "streaming"
- "tidal"
---

As I'm sure you're probably aware, Spotify has [had a bit of news coverage lately](https://www.npr.org/2022/01/31/1076891070/joe-rogan-responds-spotify-podcast-covid-misinformation) regarding [The Joe Rogan Experience](https://en.wikipedia.org/wiki/The_Joe_Rogan_Experience).

As a result, the band [Failure](https://en.wikipedia.org/wiki/Failure_(band)) announced that [they're pulling their music from Spotify](https://www.nme.com/en_au/news/music/failure-remove-their-music-from-spotify-over-covid-controversy-enough-is-enough-3152537) in part because the [streaming payouts are supposed to be some of the worst in the industry](https://en.wikipedia.org/wiki/Criticism_of_Spotify#Allegations_of_unfair_artist_compensation).

I can't speak to any of the above with accuracy nor is this a post about the ethics of streaming. That said, I am a fan of Failure so I figured I'd take this opportunity to review the other streaming services and see how they fare.

## My history with Spotify

I've had Spotify Premium for a number of years as part of an offer with my [telco](https://www.spark.co.nz/getmore/spotify/).

On their highest data plan, Spotify Premium is entirely free while lower plans give a partial subsidy[^subsidy] but I've never actually used the Spotify Free tier in any meaningful capacity.[^cafe]

While I've discovered a lot of new tracks over the years with Spotify, my general usage pattern is that I replay the last 10 - 20 songs on my Liked Songs playlist and occasionally I'll use the Song Radio feature on one of them.

This cycle repeats as I add more songs to Liked Songs and my "play window" slides up to include the new song and ignore the song which has dropped out of the window as a result.

Given that, I'm not hugely worried about being able to use all of the custom playlists[^discover]. Even so, I can still view them in the free version of Spotify if I decide to downgrade.

## My ideal criteria for a replacement

This post isn't intended to be a comparison of different streaming services as I'd already made a decision but here's a brief rundown of what I was interested in personally.

That said, this has somewhat evolved into a brief comparison between Spotify, [Apple Music](https://music.apple.com/) and [Tidal](https://tidal.com)  since those were the three main contenders I compared based on the (arguably niche) criteria I cared about.

### A good API

For anyone who has seen the little "Now Playing" widget on the front page of my site[^nowplaying], it was [powered by the Spotify API](https://github.com/marcus-crane/gunslinger/blob/db5337d6e6846d3555540abaafb0bcba775c3cf2/jobs/spotify.go#L61) by polling every few seconds for what I'm currently listening to. I'd definitely want to recreate that functionality if I can.

Spotify also has probably the [most fleshed out API](https://developer.spotify.com/documentation/web-api/reference/#/) of any of its competitors, even including the ability to control playback via the API which could make for some really cool projects.

#### Apple Music

Apple Music is mostly ruled out here given their [API](https://developer.apple.com/documentation/applemusicapi/) is pretty lacking in general, especially when it comes to interacting with the current user.

#### Tidal

Tidal is also out as they [don't even have a public API at all](https://twitter.com/TIDAL/status/699726946817679360). There are a couple of unofficial API clients on Github but some of them haven't seen much activity in recent times.

I did consider trying to hack something together myself but that'll be addressed in the next section.

### Cross-platform sessions

This is something that Spotify really excels at.

If you play a song on mobile, you can continue it on your desktop and vice versa. By that, I mean you could either transfer the track to your desktop, picking up right where the track had played up to, or you could continue on mobile while controlling the session (ie; changing volume, pausing, switching song) from your desktop.

{{< image src="spotify-remote-session.jpg" noshadow=true >}}
  A screenshot of the Spotify desktop client open to the album White Pony by the band Deftones. The track "Change (In the House of Flies)" is currently playing. At the bottom of the screen is a green banner that says "Listening on Marcus's iPhone". This indicates that the user is able to remotely control the session from their desktop.
{{< /image >}}

This was really handy at my previous job where I might not want to even try streaming while on a VPN[^vpn].

Other times, I might be in the middle of a long podcast on mobile and I can't be bothered transferring as I sit down at my desktop.

#### Apple Music

This... sort of works on a technical level but still not really. I was kind of disappointed here given that Apple generally has a decent track record when it comes to devices talking with each other.

{{< image src="apple-music-session.jpg" noshadow=true >}}
{{< /image >}}

As you can see, Apple Music on my laptop is aware that I'm playing a song on an Airpod. I can then select the Airpod and pause the track which then reflects instantly on my phone as well.

So basically, you can have sessions but only when the playing device is not an Apple Music client itself.

I also ran into this fun popup when poking around and this won't be the last time we see something like it in this post

{{< image src="apple-music-too-many-devices.jpg" noshadow=true >}}
{{< /image >}}

#### Tidal

While looking into whether I could pull session information out of Tidal to address the API point, I realised that it doesn't really have a concept of a current session. For example, if I play a song in the Tidal iOS app, the Tidal desktop client has no knowledge of it unlike Spotify. This doesn't reflect in the API either, at least from the calls I could see it making.

### Artists I like

This basically boils down to Failure who I previously mentioned and [Ed Harrison](https://edharrison.bandcamp.com/) given I listen to the Neotokyo OST a lot. Apparently Ed was my #1 artist in 2020 (according to Spotify Wrapped) with just over 2000 minutes (33.3 hours) which is... pretty bad.

### Apple Music

It has both Failure and Ed Harrison's catalogue. I'm happy.

### Tidal

It has Failure and some of Ed Harrison's catalogue but not NeoTokyo. Honestly, this was a bit of a death blow for me with Tidal.

Tidal did have Jay-Z content as an exclusive which also included the Jay x Kanye West crossover album [Watch the Throne](https://en.wikipedia.org/wiki/Watch_the_Throne) which I like a lot but this is no longer the case as Jigga released his catalogue on Spotify to celebrate his 50th birthday apparently.

Also, as I write this, I'm now learning that [Hov sold the majority of his shares to <strike>Square</strike> Block](https://www.vox.com/recode/22313268/tidal-square-jay-z-jack-dorsey-nft-explainer) in 2021? What the fuck?

{{< tweet "jack" 1367460921937817602 >}}

Jack Dorsey mentioned his vision for the future of Tidal:

> We’ll work on entirely new listening experiences to bring fans closer together, simple integrations for merch sales, modern collaboration tools, and new complementary revenue streams.

That basically means nothing to me but whatever. The Carter Administration is still on the board of <strike>Square</strike> Block and that can only mean one thing.

{{< image src="https://s29.q4cdn.com/628966176/files/images/board/blockheads-BOD-jayz.png" >}}
{{< /image >}}


Beautiful.

## An annoying compromise

At this point, neither Tidal or Apple Music are hugely appealing based on the features I've mentioned so far.

They're perfectly fine as streaming services but there's another aspect I haven't mentioned up to this point: Music stored on my Plex server.

I have a few rips[^khinsider] from various videogames that don't have official albums but that [I like listening to](https://www.youtube.com/watch?v=e7Zn5I1xutE) that I've kept floating around my Plex server for a few years now.

That said, I generally never get around to listening to them since my daily driver has been Spotify which doesn't support local files in any useful way[^localfiles] but it would be nice if there was a way to have both things in the same place.

My plan at this point was going to be trying out Tidal since it had a relatively nice UI. To get around the lack of Neotokyo, I could just purchase Ed's work from [Bandcamp](https://bandcamp.com) and load it onto Plex and just deal with that annoying UX.

## The perfect candidate appears

I had been vaguely aware for a while that Plex touted some sort of integration with Tidal but I had no idea what the specifics were at all.

I actually overlooked the key feature of this integration which is [clearly outlined](https://support.plex.tv/articles/add-tidal-content-to-your-plex-music-library/) in their documentation. While I could have sworn I read the page, perhaps it's easier to demonstrate with some screenshots.

{{< image style="height: 500px" src="plexamp-add-to-library.jpg" noshadow=true >}}
{{< /image >}}

You'll see that there are two buttons at the bottom of the screen: *Add to My TIDAL* and *Add to Library*.

When I figure used this feature, I would do *Add to My TIDAL*.

Ok, great, it adds albums to my TIDAL library. Big whoop. A few days later, I accidentally hit *Add to Library* and oh my god.

{{< image src="plexamp-jak-jay.png" >}}
{{< /image >}}

You're telling me I can put Jay right next to Jak? Wrap it up, I think we've got a winner on our hands!

At this point, I was sold. The ability to add virtual streaming items right next to my "local" (streaming from across the living room) items is basically what I wished Spotify offered.

I suppose Google Play Music somewhat offered that but using a Google product is about as attracted as [preordering my own coffin](https://music.youtube.com/googleplaymusic).

Anyway, with this, we can tick one piece of criteria off the list:

✅ Artists I like

The big takeaway here is that I can add any artists that are able to stream on Tidal while being able to purchase content and stream that side by side without any obvious way to distinguish between entries.

While Spotify had local files, it was very clearly a second class citizen. Here, both local and remote items are almost identical both in terms of UI and behind the scenes as we'll find out a bit later.

## A quick note on Plexamp

Before we continue, I should note that I mostly interface with my Plex library (and Tidal) through [Plexamp](https://plexamp.com/).

For an audio player that [started life back in 2017](https://medium.com/plexlabs/introducing-plexamp-9493a658847a) as a [Plex Labs](https://medium.com/plexlabs) experiment, it certainly evolved into a full ecosystem complete with mobile and desktop apps.

To be clear, it's just streaming content from your plex server rather than being something you deploy standalone. You can also listen to Podcasts (via Plex) on it too although I don't do that myself.

The Tidal integration works perfectly fine with the regular Plex apps as well but the music section in general shines brightest when using Plexamp if you ask me.

## Ok but how well does it actually integrate with Tidal

At this point in our tour, you might be thinking "Ok, sure but it's just all ducktaped together and the illusion will fall apart the second you touch something" and I thought this might be the case.

Thankfully, it really is this cool and I'll show you some cool features.

### Cross-platform search

Whether finding something new or something existing, you can search across your entire catalog and Tidal's at the same time which is really appreciated

{{< image style="height: 500px" src="plexamp-cross-search.jpg" >}}
{{< /image >}}

### An lively home screen

The home screen is a great example of how Tidal content is interweaved with your local content pretty seamlessly.

The only thing that differentiates the two is a little logo tucked away next to the last played indicator.

{{< image style="height: 500px" src="plexamp-home.jpg" >}}
{{< /image >}}

There's much more that isn't illustrated here too. My library is still pretty empty (relatively speaking) but Plexamp will generate mixes for you like this:

{{< image src="https://www.plex.tv/wp-content/uploads/2021/08/scrolling-mixes.gif" >}}
{{< /image >}}


For example, 

[^subsidy]: On lower plans, they usually pay for half and you just pay the remainder. It shows as an addon to your mobile plan but it's a little more fiddly to setup than the higher data plan which just pays for the whole thing. If you use Spotify (as I did), it's easy to write off an upgrade to the highest plan as being the same plan + a Spotify sub which you'd have purchased anyway.

[^cafe]: Funnily enough, the first time I heard a Spotify ad was actually at a cafe that was using Spotify's free version. I'm not entirely sure that's legal but damn, those ads really are annoying.

[^discover]: I know some people absolutely swear by Discover Weekly and while I think it is really good, I always forget to listen to it. I'm also not opposed to just viewing it once a week and listening to those songs via an alternative streaming plans. Hell, I might just be able to pull the playlist via an API endpoint and populate an identical playlist somewhere else?

[^nowplaying]: Currently, it shows TV shows, movies and music via Plex and even what I'm playing on my PS5 via the Playstation Network APIs. I'll probably write about it in a future blog post. It was previously powered by both Spotify and [Trakt](https://trakt.tv) before my switch though.

[^vpn]: Especially given all of the traffic would transit through Germany while I lived in New Zealand.

[^eardrums]: But for real though, nothing gets me in the mood to review software like having my eardrums blown out at 11:30pm while in bed :)

[^localfiles]: The feature has degraded over the years so I'm not sure of the current state but last I checked, you can add local files to the Desktop client. This doesn't actually sync them like with the short lived Google Music but instead just dumps them all into a basic list that you can play while using that device.

[^khinsider]: [*cough*](https://github.com/marcus-crane/khinsider)