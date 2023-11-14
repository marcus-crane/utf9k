# What is using Port 5000 on macOS Monterey?
01 January 0001

I&#39;ve been fiddling a bit with [Wails](https://github.com/wailsapp/wails) recently and I gave the unreleased v2 alpha a try.

Out of the box, it binds to Port 5000 and I was surprised to receive a `403 Forbidden`.

Definitely not what I expected.

![A Brave browser window showing 403 Forbidden when trying to view localhost port 5000](403-forbidden.png)

We can use the `lsof` utility to figure out what&#39;s holding on to Port 5000. You&#39;ll see in the screenshot below that I use a shell function called `whomport` but under the hood, it&#39;s running `lsof -nP i4TCP:5000 | grep LISTEN`. Let&#39;s see what the output looks like.

![A screenshot showing two windows. One is a Terminal with the output of a command called whomport. It shows Control Center listening on Port 5000 with the Process ID 2273. Behind the Terminal is Activity Monitor. Control Center is highlighted and indeed has the same Process ID of 2273.](whomport.png)

This doesn&#39;t really help us much since Control Centre could be anything but a bit of searching brings up that this change was introduced in macOS Monterey.

In particular, there&#39;s a new setting under `System Preferences` -&gt; `Sharing` called `Airplay Receiver`.
Let&#39;s toggle it off.

![A screenshot showing the Sharing pane of macOS System Preferences. Airplay Receiver has been unticked.](airplay-sharing.png)

Once this is done, you should find Port 5000 instantly freed up. It&#39;s weird that Apple would pick such a commonly used port, especially for developers!