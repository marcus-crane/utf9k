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

<center>
{{< image src="apple-music-too-many-devices.jpg" noshadow=true >}}
{{< /image >}}
</center>

#### Tidal

While looking into whether I could pull session information out of Tidal to address the API point, I realised that it doesn't really have a concept of a current session. For example, if I play a song in the Tidal iOS app, the Tidal desktop client has no knowledge of it unlike Spotify. This doesn't reflect in the API either, at least from the calls I could see it making.

### Artists I like

This basically boils down to Failure who I previously mentioned and [Ed Harrison](https://edharrison.bandcamp.com/) given I listen to the Neotokyo OST a lot. Apparently Ed was my #1 artist in 2020 (according to Spotify Wrapped) with just over 2000 minutes (33.3 hours) which is... pretty bad.

### Apple Music

It has both Failure and Ed Harrison's catalogue.

### Tidal

It has Failure and some of Ed Harrison's catalogue but not NeoTokyo. Honestly, this was a bit of a death blow for me with Tidal.

[^subsidy]: On lower plans, they usually pay for half and you just pay the remainder. It shows as an addon to your mobile plan but it's a little more fiddly to setup than the higher data plan which just pays for the whole thing. If you use Spotify (as I did), it's easy to write off an upgrade to the highest plan as being the same plan + a Spotify sub which you'd have purchased anyway.

[^cafe]: Funnily enough, the first time I heard a Spotify ad was actually at a cafe that was using Spotify's free version. I'm not entirely sure that's legal but damn, those ads really are annoying.

[^discover]: I know some people absolutely swear by Discover Weekly and while I think it is really good, I always forget to listen to it. I'm also not opposed to just viewing it once a week and listening to those songs via an alternative streaming plans. Hell, I might just be able to pull the playlist via an API endpoint and populate an identical playlist somewhere else?

[^nowplaying]: Currently, it shows TV shows, movies and music via Plex and even what I'm playing on my PS5 via the Playstation Network APIs. I'll probably write about it in a future blog post. It was previously powered by both Spotify and [Trakt](https://trakt.tv) before my switch though.

[^vpn]: Especially given all of the traffic would transit through Germany while I lived in New Zealand.

[^eardrums]: But for real though, nothing gets me in the mood to review software like having my eardrums blown out at 11:30pm while in bed :)