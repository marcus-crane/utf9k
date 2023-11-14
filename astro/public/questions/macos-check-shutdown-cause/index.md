# How can I find out why my Mac has restarted?
01 January 0001

This is arguably one of the more obscure commands I&#39;ve come across. At the time, a coworker of mine was having issues where his laptop would restart seemingly at random.

We were able to find out a bit more with the following command:

```bash
log show -predicate &#39;eventMessage contains &#34;Previous shutdown cause&#34;&#39; -last 24h
```

It may take a minute or so to actually find some logs but it should reveal a shutdown code.

I don&#39;t remember where I dug it up but you can see a list of shutdown causes and their meanings [in this PDF](shutdown-causes.pdf).

Here&#39;s how the results looks on my machine where I had performed a normal shutdown as a test

![An iTerm2 window showing the results of the command mentioned above. There is one result for a previous shutdown with the cause code of 5. This indicates a normal shutdown.](normal-shutdown.png)

If we compare the shutdown code to the PDF above, we can see the description is `Correct shut down` which lines up exactly.

Now let&#39;s take this information and use it to see what was potentially happening to my coworkers laptop.

Here&#39;s a screenshot of his terminal window with the same command:

![A macOS Terminal window showing the results of the previous command on a different machine. There are seven results for a cause code of -128. This indicates an abnormal shutdown.](abnormal-shutdown.png)

Going back to the PDF again, we can see that `-128` is an alias for `-112`. Checking `-112` tells us that it is &#34;Probably memory related&#34; which at least narrows it down.

I don&#39;t doubt that result since some of the most authoritative information can often be found in PDFs randomly floating around the internet!

For anyone wondering, my coworker has a new laptop on the way regardless, since he can&#39;t work with it constantly rebooting.
