# How can I look up my current external IP address?
01 January 0001

DNS! It&#39;s always the answer for your woes :)

While there are a myriad of HTTP servers for seeing your external IP address, you can also use one of the various DNS based services on offer.

These will give you an IPv4 flag. The `-4` flag isn&#39;t necessarily required but without explicitly providing it, you&#39;ll be gambling on the return type.

```
&gt; dig @resolver3.opendns.com myip.opendns.com &#43;short -4
&gt; dig @resolver4.opendns.com myip.opendns.com &#43;short -4
&gt; dig @ns1-1.akamaitech.net ANY whoami.akamai.net &#43;short -4
&gt; dig @ns1.google.com TXT o-o.myaddr.l.google.com &#43;short -4
```

and likewise, for IPv6

```
&gt; dig @resolver1.ipv6-sandbox.opendns.com AAAA myip.opendns.com &#43;short -6
&gt; dig @ns1.google.com TXT o-o.myaddr.l.google.com &#43;short -6
```

You can read more, and see some other providers I left out, in this [detailed StackOverflow thread](https://unix.stackexchange.com/questions/22615/how-can-i-get-my-external-ip-address-in-a-shell-script) but generally speaking, I&#39;ve found OpenDNS&#39;s `resolver4` to be the fastest of the lot on offer.

A very handy thing to have aliased and way quicker than clicking 5 times to navigate to a webpage.
