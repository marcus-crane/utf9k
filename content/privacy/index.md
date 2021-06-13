---
title: "Privacy"
slug: "privacy"
---

Curious about how the anonymous feedback function works? It's all open source so you can be assured I'm not interested in your data.

The client side script can be found [here](https://github.com/marcus-crane/utf9k/blob/next/assets/js/thanks.js) and is visible below the footer upon inspecting most content pages. I'd link it here directly but it has a random fingerprint [so if it changes, you get the new version](https://www.keycdn.com/support/what-is-cache-busting).

Upon closer inspection, you can see that all it does is send the current URL. I did make an attempt at even concealing your [User-Agent](https://en.wikipedia.org/wiki/User_agent) but for the life of me, I can't get it to change? I guess browsers just hardcode it basically.

The backend server I use is open source as well and the relevant code all lives [here](https://github.com/marcus-crane/gunslinger/blob/main/handlers/notification.go). If you try to send me more than just a URL (or even someone elses URL), it's rejected.

If you click the button from a valid (ie; on the utf9k.net domain) page, then I use [Pushover](https://pushover.net) to forward a message to my iPhone.

At no point do I find out who you are. You can verify for yourself that I don't run any tracker or store any cookies.

I should mention that [Netlify](https://netlify.com) does store server logs of course, as does basically every website. The closest it gets to anything "identifying" is the country you're browsing from. Not the city or the town, just the country.

Now, if you would actually like to provide some non-anonymous feedback, you can "opt in" by sending me an email. Hah!
