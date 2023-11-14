# Fixing a WSL2 VHD conversion issue
20 July 2019

I recently started running the Windows Insider builds on my desktop so that I could play around with the new Windows Subsystem for Linux but I ran into some trouble. Before I get into the fix, here&#39;s a little bit of history

## The history

For the unfamiliar, it&#39;s a way to run Linux applications inside of a Windows environment using a lightweight VM.

For the familiar, you may have heard of WSL 1, which essentially translated Linux system calls into their appropriate NT kernel counterparts. The downside meant that things were kind of slow, and not everything worked as you would hope.

The biggest downside was perhaps USB devices, in that there were no drivers to support them. Personally, I was unable to use the Yubikey NEO I had at the time, given that [smart cards had no support](https://github.com/microsoft/WSL/issues/1521). Anyone using USB debug interfaces such as [JTAG](https://github.com/microsoft/WSL/issues/2185) or [ADB](https://github.com/microsoft/WSL/issues/2195) was out of luck too.

Thankfully, this should hopefully be in the past now with the [announcement of WSL 2](https://devblogs.microsoft.com/commandline/announcing-wsl-2), a virtual machine that&#39;s supposed to be so light, it&#39;s not like those other slow virtual machines you think of.

## The fix

Long story short, I dove in by following the installation instructions and hit a brick wall once I got to the second step.

```powershell
PS C:\WINDOWS\system32&gt; wsl --set-version Ubuntu 2
Conversion in progress, this may take a few minutes...
For information on key differences with WSL 2 please visit https://aka.ms/wsl2
The requested operation could not be completed due to a virtual disk system limitation.
Virtual hard disk files must be uncompressed and unencrypted and must not be sparse.
```

Upon trying to convert my WSL distros to Version 2, they complained about a virtual disk system limitation. I actually put this on the backburner for months until coming back to it today and the fix felt dumb.

You&#39;d never know it but your WSL packages live under `%LOCALAPPDATA%/packages/&lt;distro title surrounded by nonsense&gt;`. In my case, Debian lives at `C:\Users\Marcus\AppData\Local\Packages\TheDebianProject.DebianGNULinux_76v4gfsz19hv4`. If you visit your distro&#39;s respective folder, you&#39;ll find no virtual disk image in sight.

The terms &#34;uncompressed and unencrypted&#34; tipped me off to check those blasted &#34;advanced settings&#34;. Under `Right Click -&gt; Properties -&gt; General -&gt; Advanced`, I spotted `Compress contents to save disk space` was ticked for some reason. Unchecking it, then rerunning the WSL 1 -&gt; 2 conversion worked as you&#39;d hope.

![A screenshot showing Windows Explorer. It is open to C:/Users/Marcus/AppData/Local/Packages. A folder is highlighted to indicate it was recently clicked on. The properties window for that folder is visible showing metadata. Overlaying the properties window is the Advanced Attributes window where a checkbox labelled &#39;Compress contents to save disk space&#39; is checked. The author is showing that you should uncheck that box to fix the issue described in this post.](compressed.png)

So, if you run into this issue, have a poke around your packages and hopefully you&#39;ll be on your way to a nice, properly Linux-y home on Windows.
