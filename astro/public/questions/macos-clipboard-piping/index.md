# How can I access my clipboard contents inside my terminal?
01 January 0001

I&#39;ve known about this tool for some time now but I&#39;m writing about it because I ALWAYS forget to use it.

`pbcopy`, and as I just discovered, `pbpaste` are two tools that are built into macOS.

You can pipe data into the former to add it to your clipboard and similarly, you can use the latter as input into a unix pipeline.

Let&#39;s look at an example:

```bash
&gt; echo &#34;see you on the other side&#34; | pbcopy
```

You can now use `Ctrl&#43;V` to paste this text into any GUI application. Saves you having to mouse over to the terminal and highlight text but I still do it every darn time.

We can also use our clipboard contents too as mentioned. You could have copied some text from a GUI application and you want to use it in your terminal.

```bash
# Clipboard contains &#34;utf9k.net&#34; that I copied from my browser
&gt; pbpaste | xargs dig TXT | grep &#34;I see&#34;
utf9k.net.    3444  IN  TXT &#34;I see you snoopin&#39; around ;) If you&#39;re after something, you can feel fr\010ee to email me at marcus@utf9k.net&#34;
```

What I&#39;m trying to say is that I have all of the tools at my disposal to avoid [RSI](https://en.wikipedia.org/wiki/Repetitive_strain_injury) but I just need to remember they exist...