---
title: "How can I find out why my Mac has restarted?"
slug: "macos-check-shutdown-cause"
category: "questions"
tags:
- "crashes"
- "logging"
- "macos"
---

This is arguably one of the more obscure commands I've come across. At the time, a coworker of mine was having issues where his laptop would restart seemingly at random.

We were able to find out a bit more with the following command:

```bash
log show -predicate 'eventMessage contains "Previous shutdown cause"' -last 24h
```

It may take a minute or so to actually find some logs but it should reveal a shutdown code.

I don't remember where I dug it up but you can see a list of shutdown causes and their meanings [in this PDF](shutdown-causes.pdf).

Here's how the results looks on my machine where I had performed a normal shutdown as a test

If we compare the shutdown code to the PDF above, we can see the description is `Correct shut down` which lines up exactly.

Now let's take this information and use it to see what was potentially happening to my coworkers laptop.

Here's a screenshot of his terminal window with the same command:

Going back to the PDF again, we can see that `-128` is an alias for `-112`. Checking `-112` tells us that it is "Probably memory related" which at least narrows it down.

I don't doubt that result since some of the most authoritative information can often be found in PDFs randomly floating around the internet!

For anyone wondering, my coworker has a new laptop on the way regardless, since he can't work with it constantly rebooting.
