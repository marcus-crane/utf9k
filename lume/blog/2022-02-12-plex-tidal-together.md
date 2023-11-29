---
title: "Plex + Tidal = A Nice Match"
date: "2022-02-12T13:20:00+1300"
description: "A lengthy post in which I gush about how I like Plexamp a lot due to how it integrates nicely with Tidal"
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

{{% notice emoji="🖼" title="Look at this photograph" %}}
Due to the nature of this post, it's pretty image heavy.

Not all of the images are legible if you look at them inline so just a heads up that you can click on an image to view the full thing.
{{% /notice %}}

As I'm sure you're probably aware, Spotify has [had a bit of news coverage lately](https://www.npr.org/2022/01/31/1076891070/joe-rogan-responds-spotify-podcast-covid-misinformation) regarding [The Joe Rogan Experience](https://en.wikipedia.org/wiki/The_Joe_Rogan_Experience).

As a result, the band [Failure](https://en.wikipedia.org/wiki/Failure_(band)) announced[^pulling] that they are going to [pull their music from Spotify](https://www.nme.com/en_au/news/music/failure-remove-their-music-from-spotify-over-covid-controversy-enough-is-enough-3152537) in part because the [streaming payouts are supposed to be some of the worst in the industry](https://en.wikipedia.org/wiki/Criticism_of_Spotify#Allegations_of_unfair_artist_compensation).

I can't speak to any of the above with accuracy nor is this a post about the ethics of the streaming model for artists.

Instead, I'm just a fan of Failure who figured they would take this opportunity to review other streaming services and see how they fare.

The goal here is to find a setup that lets me listen to everything I enjoy, with as little friction, while still supporting the artists I care about.

The solution I've found that works for me, and that I'll be covering in this post, is to stream most things via [Plexamp](https://plexamp.com/).

It supports both streaming from [Tidal](https://tidal.com/) and playing content stored locally on my [Plex](https://www.plex.tv/) server, such as rips from games that never released official soundtracks.

For everything else, I can purchase albums from [Bandcamp](https://bandcamp.com), including content that was [never streamable](https://failureband.bandcamp.com/album/fantastic-planet-live) in the first place, plus I can feel better that I'm better compensating the artists I enjoy.

From here, you can either save yourself a solid 15 - 20 minutes and close the tab or if you'd like to read a deep dive into the bits and pieces that sold me on this setup, then I hope you enjoy what is now the longest post on this site to date 😮‍💨

## My history with Spotify

I've had Spotify Premium for a number of years as part of an offer with my [telco](https://www.spark.co.nz/getmore/spotify/).

On their highest data plan, Spotify Premium is entirely free while lower plans give a partial subsidy[^subsidy] but I've never actually used the Spotify Free tier in any meaningful capacity.[^cafe]

While I've discovered a lot of new tracks over the years with Spotify, my general usage pattern is that I replay the last 10 - 20 songs on my Liked Songs playlist and occasionally I'll use the Song Radio feature on one of them.

This cycle repeats as I add more songs to Liked Songs and my "play window" slides up to include the new song and as a result, the last song dropped "outside" of the window.

Given my usage pattern, I'm not hugely worried about giving up custom playlists[^discover] like "Discover Weekly" that I know a lot of people swear by. Worst case, I can still view them in the free version of Spotify if I decide to move on.

## My ideal criteria for a replacement

This post was never meant to be a comprehensive comparison of different services and what they offer but in saying that, it got a bit out of hand.

Spotify, [Apple Music](https://music.apple.com/) and [Tidal](https://tidal.com) were the three main contenders that I compared based on the (arguably niche) criteria I care about.

Let's break down of those bits of criteria and how each service matches up against them, at least in my experience.

### A good API

For anyone who has seen the little "Now Playing" widget on the front page of my site[^nowplaying], it was [powered by the Spotify API](https://github.com/marcus-crane/gunslinger/blob/db5337d6e6846d3555540abaafb0bcba775c3cf2/jobs/spotify.go#L61) by polling every few seconds for what I'm currently listening to. I'd definitely want to recreate that functionality if I can.

As far as I know, Spotify has the [most comprehensive API](https://developer.spotify.com/documentation/web-api/reference/#/) of any streaming platform, even exposing the ability to control playback programatically which could make for some really cool projects.

#### Apple Music

Apple Music is mostly ruled out here given their [API](https://developer.apple.com/documentation/applemusicapi/) is pretty lacking in general, especially when it comes to interacting with the current user.

I dunno what it is about Apple but reading their API documentation makes me feel like I've been teleported back to 2006 with a bucket full of XML.

Maybe it's just a cultural artefact from when they only dealt with desktop applications because all of their web offerings feel extremely bizarre.

#### Tidal

Tidal is also out as they [don't even have a public API at all](https://twitter.com/TIDAL/status/699726946817679360).

There are a couple of unofficial API clients on Github but some of them haven't seen much activity in recent times.

I did consider trying to hack something together myself but that'll be addressed in the next section.

### Cross-platform sessions

This is something that Spotify really excels at.

If you play a song on mobile, you can continue it on your desktop and vice versa. By that, I mean you could either transfer the track to your desktop, picking up exactly where you left off, or you could continue on mobile while controlling the session from your desktop (ie; changing volume, pausing, switching song).

![A screenshot of the Spotify desktop client open to the album White Pony by the band Deftones. The track "Change (In the House of Flies)" is currently playing. At the bottom of the screen is a green banner that says "Listening on Marcus's iPhone". This indicates that the user is able to remotely control the session from their desktop.](https://cdn.utf9k.net/blog/plex-tidal-together/spotify-remote-session.jpg)

This was really handy at my previous job where trying to stream over a VPN[^vpn] was just asking for trouble.

Other times, I might be in the middle of a long podcast on mobile and I can't be bothered transferring as I sit down at my desktop.

#### Apple Music

This... sort of works on a technical level but still not really. I was disappointed here given that Apple generally has a decent track record when it comes to devices talking with each other.

![A screenshot of the Apple Music client open to the artist page for Missy Elliot. A share icon in the top right of the navigation bar has been selected, with multiple Apple devices visible such as a laptop, Apple TV and Homepod. The song Work It by Missy Elliot has just started playing. Visible in the share switcher is the ability to switch to the "Lounge Room", in this case the Homepod, where ATM by J. Cole was previously playing.](https://cdn.utf9k.net/blog/plex-tidal-together/apple-music-session.jpg)

As you can see, Apple Music on my laptop is aware that I'm playing a song on an [HomePod](https://www.apple.com/nz/homepod-mini/). I can then select the HomePod and pause the track which then reflects instantly on my phone as well.

So basically, you can have sessions but only when the playing device is not an Apple Music client itself.

I also ran into this fun popup when poking around and this won't be the last time we see something like it in this post

![Visible over a desktop wallpaper is a native macOS dialog popup. At the top of the popup is the Apple Music logo. The text reads "More than one device is trying to play music. With a Family plan, up to 5 other people can stream their music at once." with the ability to select Not Now or Upgrade.](https://cdn.utf9k.net/blog/plex-tidal-together/apple-music-too-many-devices.jpg)

#### Tidal

While looking into whether I could pull session information out of Tidal, I realised that it doesn't really have a concept of a current session. For example, if I play a song in the Tidal iOS app, the Tidal desktop client has no idea about any other clients. This doesn't reflect in the API either, at least from the calls I could see it making.

### Artists I like

This basically boils down to Failure who I previously mentioned and [Ed Harrison](https://edharrison.bandcamp.com/) given I listen to the Neotokyo OST a lot. Apparently Ed was my #1 artist in 2020 (according to Spotify Wrapped) with just over 2000 minutes (33.3 hours) which is... pretty bad.

### Apple Music

It has both Failure and Ed Harrison's catalogue. I'm happy.

### Tidal

It has Failure and some of Ed Harrison's catalogue but not NeoTokyo. Honestly, this was a bit of a death blow for me as far as using Tidal by itself.

Tidal did have Jay-Z content as an exclusive in the past, which also included the Jay x Kanye West crossover album [Watch the Throne](https://en.wikipedia.org/wiki/Watch_the_Throne) which I like a lot. This is no longer the case as Jigga released his catalogue on Spotify to [celebrate his 50th birthday](https://twitter.com/Spotify/status/1202090253839937536).

Also, as I write this, I'm now learning that [Hov sold the majority of his shares to <strike>Square</strike> Block](https://www.vox.com/recode/22313268/tidal-square-jay-z-jack-dorsey-nft-explainer) in 2021? What the fuck?

<%~ await comp.tweet({ user: "jack", id: "1367460921937817602" }) %>

Jack Dorsey mentioned his vision for the future of Tidal:

> We’ll work on entirely new listening experiences to bring fans closer together, simple integrations for merch sales, modern collaboration tools, and new complementary revenue streams.

That basically means nothing to me but whatever. The Carter Administration is still on the board of <strike>Square</strike> Block and that can only mean one thing.

![An image of Jay-Z from the Square website. More specifically, it is a 3D cube being displayed at an angle to the camera. Overlaid on the cube is an image of Jay-Z's face. This is supposed to be a play on the fact that investors in Block, the company previously known as Square, where employees are known as Blockheads. It's stupid.](https://s29.q4cdn.com/628966176/files/images/board/blockheads-BOD-jayz.png)

Beautiful.

## An annoying compromise

At this point, neither Tidal or Apple Music are hugely appealing based on the features I've mentioned so far.

They're perfectly fine as streaming services but there's another aspect I haven't mentioned up to this point: Music stored on my Plex server.

I have a few rips[^khinsider] from various videogames that [don't have official albums](https://www.youtube.com/watch?v=e7Zn5I1xutE) that I've kept floating around my Plex server for a few years now.

I aspire to listen to them more but I never get around to listening to them with Spotify as my daily driver as it doesn't support local files in any useful way[^localfiles]. It would be nice if there was a way to have both things in the same place.

My plan at this point was going to be trying out Tidal since it had a relatively nice UI. To get around the lack of Neotokyo, I could just purchase Ed's work from [Bandcamp](https://bandcamp.com) and load it onto Plex and just deal with the UX hassle of constantly switching between apps.

## The perfect candidate appears

I had been vaguely aware for a while that Plex touted some sort of integration with Tidal but I had no idea what form it took.

I had even read up on integration, where the killer feature is [clearly outlined](https://support.plex.tv/articles/add-tidal-content-to-your-plex-music-library/) but apparently I did a rubbish job at reading since I entirely overlooked it.

![A screenshot of the Plexamp iOS application. It is open to Jay-Z's artist page where a few of his albums are visible. A menu is open at the bottom with a number of options including "Add to Library" and "Add to My TIDAL".](https://cdn.utf9k.net/blog/plex-tidal-together/plexamp-add-to-library.jpg)

You'll see that there are two buttons at the bottom of the screen: *Add to My TIDAL* and *Add to Library*.

When I first hooked up Tidal to Plex, I would just press *Add to My TIDAL*.

Ok, great, it adds albums to my TIDAL library remote through Plex. Big whoop. A few days later, I accidentally hit *Add to Library* and oh my god.

![A cropped image of the Plexamp macOS application is visible. It is open to the albums page with displays the cover art for a number of albums. Visible are a few Jay-Z albums, the Kane & Lynch OST, the OSTs for Jak 2 and 3, a Pokemon OST and three Kanye West albums.](https://cdn.utf9k.net/blog/plex-tidal-together/plexamp-jak-jay.jpg)

You're telling me I can put Jay right next to Jak? Wrap it up, I think we've got a winner on our hands! At this point, I was sold.

The ability to add virtual streaming items right next to my "local" (streaming from across the living room) items is pretty much the ideal outcome.

In fairness, Google Play Music offered something like this in the past but the idea of investing effort into a Google product is about as attractive as [preordering a coffin](https://music.youtube.com/googleplaymusic).

Anyway, with this, we can tick one piece of criteria off the list:

✅ for **Artists I like** (1/3)

## A quick note on Plexamp

Before we continue, I should note that I mostly interface with my Plex library (and Tidal) through [Plexamp](https://plexamp.com/).

For an audio player that [started life back in 2017](https://medium.com/plexlabs/introducing-plexamp-9493a658847a) as a [Plex Labs](https://medium.com/plexlabs) experiment, it has grown into an entire ecosystem, complete with mobile and desktop apps.

To be clear, it's just streaming content from your plex server through a music-focused client. It doesn't require deploying any additional software. You can also listen to Podcasts (via Plex) on it too although I don't do that myself.

The Tidal integration works perfectly fine with the regular Plex apps as well but the music section in general shines brightest when using Plexamp if you ask me.

## Ok but how well does it actually integrate with Tidal

At this point in our tour, you might be thinking "Ok, sure but I bet under the hood, it's just duct tape and chewing gum" which is definitely what I expected going in.

Thankfully, it really is a first class Plex citizen and I'll even give you a whirlwind tour of my favourite features.

### Cross-platform search

Whether finding something new or something existing, you can search across your entire catalog and Tidal's at the same time which is really appreciated.

![Visible is a screenshot of the Plexamp iOS application. It is open to a search for the phrase "Bad Company". The results are split into sections. The first section called "Albums" contains one result which is the OST for Battlefield: Bad Company 2. The next two sections are "Tidal Artists" and "Tidal Albums" respectively which surface results relating to the phrase "Bad Company".](https://cdn.utf9k.net/blog/plex-tidal-together/plexamp-cross-search.jpg)

### A lively home screen

The home screen is a great example of how Tidal content is interweaved with your local content pretty seamlessly.

The only thing that differentiates the two is a little logo tucked away next to the last played indicator.

![Visible is a screenshot of the Plexamp iOS application. It is open to the home screen which is broken into a two sections: "Recent Plays" and "Recently Added in Music". More sections exist off screen. At the bottom is a currently playing song "Empire State of Mind" by Jay-Z.](https://cdn.utf9k.net/blog/plex-tidal-together/plexamp-home.jpg)

There's much more that isn't illustrated here too. My library is still pretty empty (relatively speaking) but Plexamp will generate mixes for you like this:

![Visible is an animated GIF displaying a section of the Plexamp iOS homescreen. A "Mixes for You" section is being scrolled through, showing mixes for various artist. For example: a 2Pac Mix containing songs by various rap artists.](https://www.plex.tv/wp-content/uploads/2021/08/scrolling-mixes.gif)

To enable automatic mixes, and other features, you'll want to enable [Sonic Analysis](https://support.plex.tv/articles/sonic-analysis-music/). I did a bit of a facepalm when I realised I didn't have this enabled yet. I even read the blog post for it when it launched!

There's also a feature for surfacing what happened "On This Day" in music history:

![Visible is the cover art for the album She's the One by Tom Petty within a section called "On this Day". It states that the album mentioned come out on this day 25 years ago.](https://www.plex.tv/wp-content/uploads/2021/08/on-this-day-crop-800x390.png)

It would have said that February 10th[^feb] is the 28th anniversary of [The College Dropout](https://en.wikipedia.org/wiki/The_College_Dropout) if not for a [pesky oversight](https://twitter.com/plexamp/status/1491497134851428352). Thankfully it should be addressed soon so we can appropriately celebrate ye's 
29th debut next year.

### Viewing albums by mood

There are a couple of cool groups like this such as albums by record labels and so on but mood is one of the more interesting.

![Visible is a screenshot of a desktop with the Plexamp macOS application open. A list called "Belligerent" is open with a handful of albums that reflect that mood or feeling.](https://cdn.utf9k.net/blog/plex-tidal-together/plexamp-mood.jpg)

I haven't taken it for a spin just yet but based on the premise, I can see myself using this quite a bit. It also demonstrates yet again how nicely the two sources (local and tidal) can play together.

It's about time that we look at why they play nicely together so let's take a peek under the hood.

## How's the API though?

If you remember, something I wanted was to continue powering the "Now playing" widget on the front of my website.

![Visible is a screenshot of this website open in a small Safari window. Visible is a Now Playing widget showing Roses by Outkast. It reflects the song playing in Plexamp offscreen.](https://cdn.utf9k.net/blog/plex-tidal-together/utf9k-nowplaying.jpg)

✅ for **A good API** (2/3)

Initially playing Tidal content through the dedicated "Music On TIDAL" library[^source] didn't surface anything in the API but by virtue of adding items to our regular music library instead, we get full metadata available via the `/status/sessions` endpoint.

<details><summary>Here's the absolute mountain of information available for you to play with</summary>

```json
{
  "MediaContainer": {
    "size": 1,
    "Metadata": [
      {
        "addedAt": "1064275200",
        "allowSync": "0",
        "art": "/library/metadata/9560/art/1644407944",
        "attribution": "com.tidal",
        "duration": "369573",
        "grandparentArt": "/library/metadata/9560/art/1644407944",
        "grandparentGuid": "plex://artist/5d07bbfc403c6402904a6105",
        "grandparentKey": "/library/metadata/9560",
        "grandparentRatingKey": "9560",
        "grandparentThumb": "/library/metadata/9560/thumb/1644407944",
        "grandparentTitle": "OutKast",
        "guid": "plex://track/5d07cebf403c6402900cd0d9",
        "index": "10",
        "key": "/library/metadata/9590",
        "lastViewedAt": "1644480645",
        "librarySectionID": "4",
        "librarySectionKey": "/library/sections/4",
        "librarySectionTitle": "Music",
        "oneShot": "1",
        "originallyAvailableAt": "2003-09-23",
        "parentGuid": "plex://album/5d07c173403c640290846b36",
        "parentIndex": "2",
        "parentKey": "/library/metadata/9561",
        "parentRatingKey": "9561",
        "parentStudio": "Arista",
        "parentThumb": "/library/metadata/9561/thumb/1644407962",
        "parentTitle": "Speakerboxxx / The Love Below",
        "parentYear": "2003",
        "ratingKey": "9590",
        "remoteMedia": "1",
        "sessionKey": "453",
        "sourceKey": "/library/metadata/5c038b3e48a2d2001de6a1a6",
        "summary": "",
        "thumb": "/library/metadata/9561/thumb/1644407962",
        "title": "Roses",
        "type": "track",
        "updatedAt": "1644407920",
        "viewCount": "1",
        "viewOffset": "258",
        "Media": [
          {
            "audioCodec": "aac",
            "container": "mp4",
            "duration": "369000",
            "id": "12075",
            "optimizedForStreaming": "1",
            "source": "provider://tv.plex.provider.music",
            "Part": [
              {
                "container": "mp4",
                "duration": "369000",
                "id": "12156",
                "key": "/library/parts/1772296-HIGH",
                "Stream": [
                  {
                    "albumGain": "-9.71",
                    "albumPeak": "0.998444",
                    "albumRange": "10.019548",
                    "bitrate": "320",
                    "codec": "aac",
                    "displayTitle": "AAC",
                    "duration": "369000",
                    "extendedDisplayTitle": "AAC",
                    "gain": "-10.6",
                    "id": "25488",
                    "index": "0",
                    "peak": "0.988556",
                    "selected": "1",
                    "streamType": "2"
                  },
                  {
                    "codec": "lrc",
                    "displayTitle": "LRC (External)",
                    "extendedDisplayTitle": "LRC (External)",
                    "format": "lrc",
                    "id": "26578",
                    "key": "/library/streams/26578",
                    "minLines": "3",
                    "provider": "com.plexapp.agents.lyricfind",
                    "streamType": "4",
                    "timed": "1"
                  },
                  {
                    "codec": "txt",
                    "displayTitle": "TXT (External)",
                    "extendedDisplayTitle": "TXT (External)",
                    "format": "txt",
                    "id": "26579",
                    "key": "/library/streams/26579",
                    "provider": "com.plexapp.agents.lyricfind",
                    "streamType": "4"
                  }
                ]
              }
            ]
          },
          {
            "audioCodec": "aac",
            "container": "mp4",
            "duration": "369000",
            "id": "12076",
            "optimizedForStreaming": "1",
            "source": "provider://tv.plex.provider.music",
            "Part": [
              {
                "container": "mp4",
                "duration": "369000",
                "id": "12157",
                "key": "/library/parts/1772296-LOW",
                "Stream": [
                  {
                    "albumGain": "-9.71",
                    "albumPeak": "0.998444",
                    "albumRange": "10.019548",
                    "bitrate": "96",
                    "codec": "aac",
                    "displayTitle": "AAC",
                    "duration": "369000",
                    "extendedDisplayTitle": "AAC",
                    "gain": "-10.6",
                    "id": "25489",
                    "index": "0",
                    "peak": "0.988556",
                    "selected": "1",
                    "streamType": "2"
                  },
                  {
                    "codec": "lrc",
                    "displayTitle": "LRC (External)",
                    "extendedDisplayTitle": "LRC (External)",
                    "format": "lrc",
                    "id": "26580",
                    "key": "/library/streams/26580",
                    "minLines": "3",
                    "provider": "com.plexapp.agents.lyricfind",
                    "streamType": "4",
                    "timed": "1"
                  },
                  {
                    "codec": "txt",
                    "displayTitle": "TXT (External)",
                    "extendedDisplayTitle": "TXT (External)",
                    "format": "txt",
                    "id": "26581",
                    "key": "/library/streams/26581",
                    "provider": "com.plexapp.agents.lyricfind",
                    "streamType": "4"
                  }
                ]
              }
            ]
          }
        ],
        "User": {
          "id": "1",
          "thumb": "https://plex.tv/users/<me>/avatar?c=1643535847",
          "title": "Sentryism"
        },
        "Player": {
          "address": "172.17.0.1",
          "device": "macOS",
          "machineIdentifier": "<my machine>",
          "model": "",
          "platform": "macOS",
          "platformVersion": "21.4.0",
          "product": "Plexamp",
          "remotePublicAddress": "172.17.0.1",
          "state": "playing",
          "title": "skeith",
          "vendor": "",
          "version": "3.9.1",
          "local": false,
          "relayed": false,
          "secure": true,
          "userID": 1
        }
      }
    ]
  }
}
```

</details>

We can definitely work with that!

It is possible to have multiple sessions at once, and Plexamp often takes a while for sessions to terminate upon closing the app but I just sidestep that by filtering for any sessions that aren't paused. Don't worry, there'll be a section for gotchas like this later on.

I'll also put it into perspective that we're accessing metadata about a third party playing track, in a world that would love to choke you out with Widevine gloves on the mat. Relatively speaking, it's pretty refreshing to see.

As far as how this is possible, what's really going on here is that Plex's own metadata providers are doing the heavy lifting. When playing your local music, you get the exact same payload except for the `"attribution": "com.tidal"` entry at the start.

## What about cross-platform sessions?

Kind of but not really?

At this point, I'll take 2 out of 3 happily but we're apparently getting something in this space very soon!

<%~ await comp.tweet({ user: "plexamp", id: "1489024846033915908" }) %>

❌ but 👀 for **Cross-platform sessions** (2/3)

**UPDATE**: For Valentines Day, we got [a lofty 4.0 update](https://forums.plex.tv/t/plexamp-release-notes/221280/38) which includes, among other things, the ability to control your playback on another device!

![Visible in the background, but obscured by a popup, is the album Fantastic Planet by Failure. Overlaid is a widget asking the user to "Select Player". Visible are two different players: The author's iPhone and the desktop currently playing Fantastic Planet. The implication here is that it is possible to transfer the currently playing album to another device on the network.](https://cdn.utf9k.net/blog/plex-tidal-together/plex-remote-session.jpg)

What you're seeing here is my phone controlling a session that's playing on my laptop.

Given this was part of a larger refactor that unlocked a lot of capabilities, I assume we'll see this fleshed out even more going forward.

I'll be updating this to:

✅ for **Cross-platform sessions** (3/3)

although my fingers are crossed that it gets to be even more seamless than it is in the first release!

## Ok but what's the catch here

In the spirit of fairness, nothing is perfect and there are few things I've stumbled across while using this setup as my daily driver.

Most of these are either fine in moderation or things that I'm sure the [Plexamp team](https://twitter.com/plexamp) are aiming to address. If not, the team can consider this post as my bug report/feature request list!

### Hard dependency on the authentication server

I had the misfortune of having this integration go down briefly due to an outage with the Plex authentication server.

![Visible is a screenshot of the Plex status page cropped to show two sections: "Authentication and API server" and "Plex website". Visible for the first section a couple of outages over a 90 day period equally a total uptime of 99.81%.](https://cdn.utf9k.net/blog/plex-tidal-together/plex-status-page.jpg)

As one might imagine, we're still at the mercy of (fairly invisible) DRM under the hood. No authentication server surely means no way to verify who has rights to play Tidal content.

{{% notice emoji="🔑" title="A tip for Plex server owners" %}}
[Entropy](https://en.wikipedia.org/wiki/Entropy) is a sad fact of life and Plex's authentication servers are no different.

They're relatively stable but it's inevitable that the authentication server will fail again one day.

That isn't a slight towards Plex, it's just an unavoidable reality about computers.

Anyway, to work around this in future, you can [whitelist your local network](https://support.plex.tv/articles/200890058-authentication-for-local-network-access/) so that you can still stream (locally stored) content while you wait for the authentication server to return.
{{% /notice %}}

While this sounds bad on paper, it's not really an issue in that nothing stops me just opening Tidal itself and streaming music from there in the meantime. If you remember, Plex has an "Add to My Tidal" button and this is where it can be useful as a backup.

As an [SRE](https://sre.google/), albeit one currently off the clock, if I'm going to talk shit about availability then I should bring some data and so I did a brief skim of the [Plex status page](https://status.plex.tv/).

Basically, I added up the number of minutes elapsed for every publicly listed outage for the year of 2021 and got something just under 9 hours. That's almost bang on 99.9% (three nines) which is a pretty standard expectation for services.

Arguably you'd hope for something closer to 99.99% (four nines) for a critical piece of infrastructure like that but eh, I'm not exactly doing math out here.

Some of those incidents aren't even attributed to authentication outages but I threw them in there just to look at the worst case scenario.

These outages, when they do happen, are generally about an hour long. The odds of hitting the same hour period in the same month is [pretty slim... right?](https://rachelbythebay.com/w/2019/07/15/giant/). I've used Plex for years prior to this and only run into them a couple of times although I will admit that music streaming is something that I do a lot more than visual media.

My personal opinion is that it's fine. I'm not overly concerned! I have too many local tracks in my backlog to listen to so I'll just take it as an excuse to go through unplayed content instead of consuming the same 5 Outkast albums on a loop until I die.

Besides, every service has outages. This problem isn't unique to Plex.

### DRM...? Maybe yes, maybe no?

I stumbled onto this purely by accident but I guess you can't stream Tidal content if you access your Plex server via your local network (ie; instead of via https://app.plex.net)

Trying to do so gave me an error dialogue with this message:

> An error occurred trying to play this item. Please make sure content from TIDAL is not already playing on another device.

Despite the message, nothing else was playing and despite my best effort, I couldn't get this to go away.

The exact same track would work via the hosted Plex app and I'm not entirely sure.

I'm guessing there is some arbitrary legalese in the deal between Tidal and Plex that says "You must only load our content over an SSL connection" or something to that effect.

It could also just be a bug 🤷‍♀️

Despite the error, it's perfectly possible to play multiple tracks from Tidal at the same time

![Visible is a cropped screenshot of the Plex media server dashboard. Visible are three Tool albums playing on three different Plex/Plexamp instances.](https://cdn.utf9k.net/blog/plex-tidal-together/tool-trio.jpg)

If you're curious, here's how the aural mashup shown above sounded[^riaa]

<center>
  <audio controls>
    <source src="https://cdn.utf9k.net/blog/plex-tidal-together/tool-trio.mp3" type="audio/mpeg">
    Your browser doesn't support the audio tag :(
  </audio>
</center>

### You can't remove Tidal albums

This one seems like a weirdly obvious oversight so I'm going to give the benefit of the doubt here and assume there was some weird technical limitation that mean this was deferred to the backlog.

The team are definitely aware of it:

<%~ await comp.tweet({ user: "plexamp", id: "1491494752327372801" }) %>

It's a little annoying though because I have added one or two albums accidentally and now they're just stuck with me forever but amongst an ocean of albums, it doesn't feel so bad.

### Plexamp sessions are weirdly long lived

Interestingly, Plexamp sessions can't be cancelled by the owner of a Plex server?

With most streaming content, you can force stop a session but here, you can't even kill your own sessions for some reason.

![Visible is a cropped screenshot of the Plex media server dashboard. Visible are two Plexamp streams on different devices.](https://cdn.utf9k.net/blog/plex-tidal-together/plexamp-not-pausing.jpg)

In this screenshot, I've actually paused "Praxis Palace" but the media server continues to show it progressing as normal.

The green padlock indicates that I can't touch the session so I just sort of need to wait for it to expire on its own.

When the track reaches the end, the progress bar just jumps back to where I had gotten up to before closing the player.

My fingers are crossed that this will probably be handled by the refactor that gives us controllability between platforms.

## Closing thoughts

Believe or not, I actually cut this post short because I could gush about Plexamp for quite a while longer.

Suffice to say, I was sold from the minute I was able to weave Tidal tracks alongside my local tracks.

![Visible is a plain screenshot of the Plexamp desktop application with the song "Praise the Lord (Da Shine)" by A$AP Rocky playing.](https://cdn.utf9k.net/blog/plex-tidal-together/plexamp-upnext.jpg)

I've been meaning to listen to a lot more game OSTs and while a heap were added to Spotify, there are still some really niche ones I kick myself for not getting around to.

The main thing that Plexamp offers me is the removal of friction between juggling multiple applications (in this case, Plex and Spotify) since the one I use heaviest will always dominate my focus.

With this setup, I don't have to worry about it because everything is in one place!

Usually that feels like a red flag but I think the integration has been handled really elegantly here. It's simply another provider for Plex with no more or less attention than every other provider. It just kinda works™.

I will reiterate though that if you don't care about local content, just use Spotify.

If you balk at the thought of paying for both Plex and Tidal, maybe this also isn't for you. Personally I've subscribed to [Plex Pass](https://www.plex.tv/plex-pass/) so many years in a row that I ended up just investing in a lifetime subscription.

However, you like tinkering with APIs or you want to consolidate your library in one place, while not being enough of a masochist to build 100% of your library through local files, then maybe you'll enjoy this setup as much as I have.

Plexamp definitely feels like a labour of love and all of the little UI string gag planted throughout the app promote that feeling.

Perhaps the only question left now is whether I can bear to sully my library with [untaggable content](https://www.youtube.com/watch?v=kJunmC9YKQA).

Enjoy!

[^pulling]: It seems that these claims are starting to take effect. I didn't have any doubt but if I had to guess, I figure there's probably some process where Spotify waits out the calendar month in order to calculate compensation. It seems that Neil's entire catalogue has disappeared at the time of publishing. Prior to this, he pulled his catalogue [back in 2015](https://variety.com/2015/digital/news/two-weeks-later-neil-young-finally-removes-his-music-from-spotify-1201550338/) due to "my music [being] devalued by the worst quality in the history of broadcasting or any other form of distribution"

[^subsidy]: On lower plans, they usually pay for half and you just pay the remainder. It shows as an add-on to your mobile plan but it's a little more fiddly to setup than the higher data plan which just pays for the whole thing. If you use Spotify (as I did), it's easy to write off an upgrade to the highest plan as being the same plan + a Spotify sub which you'd have purchased anyway.

[^cafe]: Funnily enough, the first time I heard a Spotify ad was actually at a cafe that was using Spotify's free version. I'm not entirely sure that's legal but damn, those ads really are annoying.

[^discover]: I know some people absolutely swear by Discover Weekly and while I think it is really good, I always forget to listen to it. I'm also not opposed to just viewing it once a week and listening to those songs via an alternative streaming plans. Hell, I might just be able to pull the playlist via an API endpoint and populate an identical playlist somewhere else?

[^nowplaying]: Currently, it shows TV shows, movies and music via Plex and even what I'm playing on my PS5 via the Playstation Network APIs. I'll probably write about it in a future blog post. It was previously powered by both Spotify and [Trakt](https://trakt.tv) before my switch though.

[^vpn]: Especially given all of the traffic would transit through Germany while I lived in New Zealand. It wasn't really the VPN though, more that the traffic passed through two or three different [NATs](https://en.wikipedia.org/wiki/Network_address_translation).

[^eardrums]: But for real though, nothing gets me in the mood to review software like having my eardrums blown out at 11:30pm while in bed :)

[^localfiles]: The feature has degraded over the years so I'm not sure of the current state but last I checked, you can add local files to the desktop client. This doesn't actually sync them like a la Google Music but instead just dumps them all into a basic list that you can play. If you open Spotify on a different desktop, you have to do the same process again from scratch.

[^khinsider]: [*cough*](https://github.com/marcus-crane/khinsider)

[^feb]: The first draft of this post was written on Feb 10th but I didn't get around to editing it until Feb 12th hence this doesn't really line up with the publication date.

[^source]: There are two sources in Plex: One shows your Tidal library by itself and streams direct from Tidal. Given this, Tidal content doesn't show up in the API, as the stream doesn't transit via Plex. The other source is when you add Tidal content to your music library. This does transit via Plex so it shows up via the API.

[^riaa]: Do three audio fingerprints make a unique fingerprint? I hope the RIAA doesn't destroy my blog or I might have to use one of those shady Swiss bulletproof hosts going forward...
