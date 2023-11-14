# Twitter, could you please fix your image servers?
01 October 2021

For anyone who knows me, it&#39;s no surprise that I&#39;m horribly addicted to [Twitter](https://twitter.com). I joined back in 2009[^1] and I&#39;ve fallen into more [technical rabbit holes](/blog/automation-right/) than I care to.

As a Twitter user who is Very Online, I love to theorise about why services go wrong and poke fun at corporations but as an [SRE](https://en.wikipedia.org/wiki/Site_reliability_engineering) myself, I find it very difficult to direct blame at people.

To be clear, I&#39;ll be talking about Twitter in the brand/persona sense and not as a reflection of the many people who I&#39;m sure work tirelessly behind the scenes.

Some might say they&#39;re one in the same but my general principle is that taking aim at the marketing facade is fair game while the people themselves are off limits.

Not that we&#39;ve addressed that, I feel like the Twitter &#34;experience&#34; has been degraded for a couple of months now with no real acknowledgement that I can see. In short, I&#39;ve seen Twitter DMs intermittently fail to load, images being corrupted upon upload and [replies failing to load](https://twitter.com/wongmjane/status/1440428582308757507).

I&#39;ll be walking through the former two issues as they&#39;ve been plaguing both myself and some friends the most.

When it comes down to it, I&#39;m nothing but a simple armchair critic who doesn&#39;t have any real recourse in this abstract digital &#34;customer support&#34; hell we&#39;ve constructed for ourselves.

Besides trying to raise awareness publically by writing this post, I have absolutely no idea if this has any traction internally.

With all that out of the way, let&#39;s have a look at what has been going on.

## Twitter DM images failing to load

This one has been bugging me and some Twitter mutuals for at least a couple of months now.

What happens is that intermittently, images will fail to load inside of direct messages.

Often times, it isn&#39;t that every image fails to load but one or two that have been recently uploaded. In hindsight, it may be that they all fail to load but prior images are loaded from cache now that I think about it.

It leads to frustrating discussions like this

![A Twitter direct message where the author posts an image that fails to load and the recipient says &#34;huge L the image isn&#39;t loading&#34;.](twitter-dm-huge-l.png)

and this

![A Twitter direct message where the author receives an image that fails to load, asks &#34;got any alt text?&#34; and the other person responds with an accessibility style description of what is in the image. The tone of the interaction is one of lighthearted humour.](twitter-dm-alt-text.png)

and this

![A Twitter direct message where the author receives an image that fails to load and responds with &#34;Guess who has $3 billion in revenue but still can&#39;t display photos in DMs :)&#34;](twitter-dm-revenue.png)

It happened again just the other day and I did a little poking around. It seems that `ton.twitter.com`, the image server used for DMs[^2] times out.

![A screenshot of a terminal window with two curl commands. The first is requesting an image link over http port 80 in verbose mode. It responds as expected, with the content being a redirect to https. The second command is the prior link but accessed via https and it fails with a timeout.](timeout.png)

Upon closer inspection, only Port 80 (http) appears to be open with redirects to Port 443 (https) failing as there is no such port open based on a quick scan using `nmap`.

It&#39;s pretty frustrating and I&#39;ve actually resorted to DMing on other platforms because of how unstable this can get at times!

## Images being mulched

For a period of about 2 weeks, images with transparency such as macOS screenshots were being absolutely destroyed upon upload.

[@benedictevans has since set their account to private so here&#39;s a direct link if you follow them](https://twitter.com/benedictevans/status/1439536308326645767)

You&#39;ll see it looks like someone took the spray can from MS Paint and went to town on the edges of the image. That is supposed to be a nice crisp drop shadow!

{{&lt; tweet user=&#34;sentreh&#34; id=&#34;1436092048914796545&#34; &gt;}}

While this appears to have been fixed recently, it was also not acknowledged as far as I can tell. Just kind of weirdly broken in plain sight for days on end.

## Closing thoughts

It doesn&#39;t take too much to conclude that these are both image related issues which is interesting but it would be a logical leap to conclude that there is any relation between the image processing pipeline and the DM image server so any further speculation would be just that.

As I mentioned before, I don&#39;t want to point fingers at any people but I will say that it frustrated me to no end seeing no acknowlegement of this happening continually.

Instead, right in the middle of those two transparency mulched images, what I experienced was [@TwitterEng](https://twitter.com/TwitterEng) was talking about mechanical keyboards.

{{&lt; tweet user=&#34;TwitterEng&#34; id=&#34;1437857022444138496&#34; &gt;}}

I&#39;m being a bit flippant mind you since it can be true that one team is doing community building while another is working on technical issues of course but at the same time, the optics of it don&#39;t look great as someone experiencing this.

Anyway, really all I want is to be able to use DMs again reliably!

Instead, I can&#39;t help but feel that we&#39;re probably going to get the ability to use [an NFT as an avatar](https://twitter.com/TheSmarmyBum/status/1443259893411049475) or whatever else is cooking over there sooner than a fix :(

[^1]: In a few years, I&#39;ll have been on Twitter longer than I&#39;ve been off it (ie; before I registered/before it existed)
[^2]: As far as I can tell, `ton` is used for DMs while `pbs` is used for the public timeline?
