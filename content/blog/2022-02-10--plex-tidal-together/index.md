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

{{< image src="plexamp-add-to-library.jpg" style="height: 500px" noshadow=true >}}
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

✅ for **Artists I like**

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

{{< image src="plexamp-cross-search.jpg" style="height: 500px" >}}
{{< /image >}}

### An lively home screen

The home screen is a great example of how Tidal content is interweaved with your local content pretty seamlessly.

The only thing that differentiates the two is a little logo tucked away next to the last played indicator.

{{< image src="plexamp-home.jpg" style="height: 500px"  >}}
{{< /image >}}

There's much more that isn't illustrated here too. My library is still pretty empty (relatively speaking) but Plexamp will generate mixes for you like this:

{{< image src="https://www.plex.tv/wp-content/uploads/2021/08/scrolling-mixes.gif" >}}
{{< /image >}}

There's also a feature for surfacing what happened "On This Day" in music history:

{{< image src="https://www.plex.tv/wp-content/uploads/2021/08/on-this-day-crop-800x390.png" >}}
{{< /image >}}

It would have said that today is the 28th anniversary of [The College Dropout](https://en.wikipedia.org/wiki/The_College_Dropout) if not for a [pesky oversight](https://twitter.com/plexamp/status/1491497134851428352). Thankfully it should be addressed soon so we can appropriately celebrate ye's 29th debut next year.

### Viewing albums by mood

There are a couple of cool groups like this such as albums by record labels and so on but mood is one of the more interesting.

{{< image src="plexamp-mood.jpg" >}}
{{< /image >}}

I haven't taken it for a spin just yet but the premise of it is really cool and another example of the two track sources (local and tidal) playing nicely together.

With that, let's take a look at what makes this possible

## How's the API though?

If you remember, something I wanted was to continue powering the "Now playing" widget on the front of my website.

{{< image src="utf9k-nowplaying.jpg" >}}
{{< /image >}}

✅ for **A good API**

Initially playing Tidal content through Plex (there's a separate "music source") didn't surface anything in the API but by virtue of adding items to our library, we get full metadata available via the `/status/sessions` endpoint.

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

It is possible to have multiple sessions at once, and Plexamp often takes a while for sessions to terminate upon closing the app but I just sidestep that by filtering for any sessions that aren't paused.

I'll also point out that this is metadata about a third party playing track, in a world that would love to choke you out with Widevine. Relatively speaking, it's pretty refreshing.

What's really going on here is that Plex's own metadata providers are doing the heavy lifting which works for us. When playing your local music, you get the exact same payload except for the `"attribution": "com.tidal"` pairing at the start.

## What about cross-platform sessions?

Kind of but not really?

At this point, I'll take 2 out of 3 happily but we're apparently getting something in this space very soon!

{{< tweet "plexamp" "1489024846033915908" >}}

❌ but 👀 for **Cross-platform sessions**

## Ok but what's the catch here

In the spirit of fairness, nothing is perfect and there are few things I've stumbled across while using this setup as my daily driver.

Most of these are either fine in moderation or things that I'm sure the [Plexamp team](https://twitter.com/plexamp) are aiming to address. If not, this is my bug report/feature request list!

### Hard dependency on the authentication server

I had the misfortune of having this integration go down briefly due to an outage with the Plex authentication server.

{{< image src="plex-status-page.jpg" >}}
{{< /image >}}

As one might imagine, we're still at the mercy of (fairly invisible) DRM under the hood. No authentication server surely means no way to verify who has rights to play Tidal content.

{{% notice title="🔑 A tip for Plex server owners" %}}
[Entropy](https://en.wikipedia.org/wiki/Entropy) is a sad fact of life and Plex's authentication servers are no different.

They're relatively stable but it's inevitable that the authentication server will fail again one day.

That isn't a slight towards Plex, it's just an unavoidable reality about computers.

Anyway, to work around this in future, you can [whitelist your local network](https://support.plex.tv/articles/200890058-authentication-for-local-network-access/) so that you can still stream (locally stored) content while you wait for the authentication server to return.
{{% /notice %}}

While this sounds bad on paper, it's not really an issue in that nothing stops me just opening Tidal itself and streaming music from there like nothing happened. If you remember, Plex has an "Add to My Tidal" button and this where it can be useful as a backup.

Anyway, as an [SRE](https://sre.google/), if I'm going to talk about availability, I should bring some data and so I did a brief skim of the [Plex status page](https://status.plex.tv/).

Basically, I added up the number of minutes elapsed for every publically listed outage for the year of 2021 and got something just under 9 hours. That's almost bang on 99.9% (three nines) which is a pretty standard expectation for services.

Arguably you'd hope for something closer to 99.99% (four nines) for a critical piece of infrastructure like that but eh, I'm not exactly doing math out here.

Some of those incidents aren't even attributed to authentication outages but I threw them in there just to look at the worst case scenario.

These outages, when they do happen, are generally about an hour long. The odds of hitting the same hour period in the same month is pretty slim. I've used Plex for years prior to this and only run into them a couple of times although I will admit that music streaming is something that I do a lot more than visual media.

Anyway, whatever, it's fine. I don't care and I'm not overly concerned :) I have too many local tracks to listen to anyway so I'll just take it as an excuse to go through my back catalogue of unplayed content instead of consuming the same 5 Outkast albums on a loop until I die.

Also, every service has outages. This isn't unique to Plex.

### DRM...? Maybe yes, maybe no?

I stumbled onto this purely by accident but I guess you can't stream Tidal content if you access your Plex server via your local network (ie; instead of via https://app.plex.net)

Trying to do so gave me an error dialogue with this message:

> An error occured trying to play this item. Please make sure content from TIDAL is not already playing on another device.

Despite the message, nothing else was playing and despite my best effort, I couldn't get this to go away.

The exact same track would work via the hosted Plex app and I'm not entirely sure.

Given mixed content only works one way (http can load https but not vice versa), I'm guessing it's some arbitrary legalese that says "You must only load our content over an SSL connection" or something.

It could also just be a bug 🤷‍♀️

Despite the error, it's perfectly possible to play multiple tracks from Tidal at the same time

{{< image src="tool-trio.jpg" >}}
{{< /image >}}

If you're curious, here's how the aural mashup shown above sounded[^riaa]

<center>
  <audio controls>
    <source src="tool-trio.mp3" type="audio/mpeg">
    Your browser doesn't support the audio tag :(
  </audio>
</center>

### You can't remove Tidal albums

This one seems like a weirdly obvious oversight so I'm going to give the benefit of the doubt here and assume there was some weird technical limitation that resulting in this being deferred.

The team are definitely aware of it

{{< tweet "plexamp" "1491494752327372801" >}}

It's a little annoying though because I have added one or two albums accidentally and now they're just stuck with me forever but amongst an ocean of albums, it doesn't feel so bad.

### Plexamp session are weirdly long lived

Interestingly, Plexamp sessions are not cancelled by the owner of a Plex server.

With most streaming content, you can force stop a session but here, you can't even kill your own sessions for some reason.

{{< image src="plexamp-not-pausing.jpg" >}}
{{< /image >}}

In this screenshot, I've actually paused "Praxis Palace" but the media server continues to show it progressing as normal. The green padlock indicates that I can't touch the session so I just sort of need to wait for it to expire on its own.

My fingers are crossed that this will probably be handled by the refactor that gives us controllability between platforms.

## Closing thoughts

Believe or not, I actually cut this post short because I could gush about Plexamp for quite a while longer.

Suffice to say, I was sold from the minute I was able to weave Tidal tracks alongside my local tracks.

{{< image src="plexamp-upnext.jpg" >}}
{{< /image >}}

I've been meaning to listen to a lot more game OSTs and while a heap were added to Spotify, there are still some really niche ones I kick myself for not getting around to.

The main thing that Plexamp offers me is the removal of friction between handling multiple applications (in this case, Plex and Spotify) since the one I use heaviest will always dominate my focus.

With this setup, I don't have to think because everything is in one place. Usually that feels like a red flag but I think the integration has been handled really elegantly here. It's basically just another provider for Plex with no more or less attention than every other provider. It just kinda worksTM.

I will reiterate though that if you don't care about local content, just use Spotify.

If you balk at the thought of paying for both Plex and Tidal, maybe this isn't for you. I don't think I've mentioned it yet but I've subscribed for Plex's annual plan so many years in a row that I just invested in a lifetime subscription.

If you like tinkering with APIs or you want to consolidate your library in one place, while not being enough of a macochist to source your entire library as local files, then maybe you'll find something to really enjoy with this setup.

Plexamp definitely feels like a labour of love and all of the little gags in the form of UI strings tucked in the app definitely promote that feeling.

Perhaps the only question left now is whether I can bear to sully my library with [untaggable content](https://www.youtube.com/watch?v=kJunmC9YKQA).

Enjoy!

[^subsidy]: On lower plans, they usually pay for half and you just pay the remainder. It shows as an addon to your mobile plan but it's a little more fiddly to setup than the higher data plan which just pays for the whole thing. If you use Spotify (as I did), it's easy to write off an upgrade to the highest plan as being the same plan + a Spotify sub which you'd have purchased anyway.

[^cafe]: Funnily enough, the first time I heard a Spotify ad was actually at a cafe that was using Spotify's free version. I'm not entirely sure that's legal but damn, those ads really are annoying.

[^discover]: I know some people absolutely swear by Discover Weekly and while I think it is really good, I always forget to listen to it. I'm also not opposed to just viewing it once a week and listening to those songs via an alternative streaming plans. Hell, I might just be able to pull the playlist via an API endpoint and populate an identical playlist somewhere else?

[^nowplaying]: Currently, it shows TV shows, movies and music via Plex and even what I'm playing on my PS5 via the Playstation Network APIs. I'll probably write about it in a future blog post. It was previously powered by both Spotify and [Trakt](https://trakt.tv) before my switch though.

[^vpn]: Especially given all of the traffic would transit through Germany while I lived in New Zealand.

[^eardrums]: But for real though, nothing gets me in the mood to review software like having my eardrums blown out at 11:30pm while in bed :)

[^localfiles]: The feature has degraded over the years so I'm not sure of the current state but last I checked, you can add local files to the Desktop client. This doesn't actually sync them like with the short lived Google Music but instead just dumps them all into a basic list that you can play while using that device.

[^khinsider]: [*cough*](https://github.com/marcus-crane/khinsider)

[^riaa]: Do three audio fingerprints make a unique fingerprint? I hope the RIAA doesn't destroy my blog or I might have to use one of those shady Swiss bulletproof hosts going forward...