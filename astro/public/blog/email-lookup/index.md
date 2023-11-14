# Double checking if an email address exists
26 September 2019

Sometimes I&#39;ll want to email someone but I don&#39;t know if their email address is valid. Likewise, they might have verbally told it to you, but you can&#39;t remember if it has a dot or a dash! Luckily, there&#39;s a handy way to find out using a mix of nslookup and telnet.

I&#39;ll take you through a recent example where I wanted to email Ian Small, the CEO of Evernote, to thank him and the Evernote team for their wonderful Behind the Scenes videos. You can see them [here](https://www.youtube.com/watch?v=5rNUpXYCcrA) and I think they&#39;re worth a peek.

Anyway, if I had to take a blind guess, ian[at]evernote.com would be a valid email. Well, it is indeed and so that&#39;s why I&#39;ve picked it since it&#39;s such an obvious format. For the sake of learning, let&#39;s just pretend we&#39;re trying to find a valid email from scratch. Naturally, if you have a particular domain you&#39;re interested in, just swap out evernote.com for your domain of choice. Going forward however, I&#39;ll be using evernote.com.

## Finding the mail server (macOS / Linux)

For macOS and Linux, we&#39;ll want to use `nslookup` which should come ready to go as part of your OS/distro of choice. Fire up a terminal and enter `nslookup -q=MX evernote.com` and you should get a bunch of Google domains back like so:

```bash
&gt; nslookup -q=MX evernote.com
Server:         192.168.1.1
Address:        192.168.1.1#53

Non-authoritative answer:
evernote.com    mail exchanger = 20 alt1.aspmx.l.google.com.
evernote.com    mail exchanger = 20 alt2.aspmx.l.google.com.
evernote.com    mail exchanger = 30 aspmx2.googlemail.com.
evernote.com    mail exchanger = 30 aspmx3.googlemail.com.
evernote.com    mail exchanger = 30 aspmx4.googlemail.com.
evernote.com    mail exchanger = 30 aspmx5.googlemail.com.
evernote.com    mail exchanger = 10 aspmx.l.google.com.

Authoritative answers can be found from:
```

What we can see here is a list of the different mail servers used by Evernote. In this case, they&#39;re using Gmail, likely as part of Google&#39;s [GSuite](https://gsuite.google.com/) offering.

Go ahead and copy the highest priority mail server, `aspmx.l.google.com`, to your clipboard as we&#39;ll be interrogating it shortly.

## Finding the mail server (Windows)

Personally, I&#39;m not much of a Windows development person so I actually had to look up the Windows equivalents.

For Powershell, there&#39;s a cmdlet called `Resolve-DnsName` that was surprisingly straight forward to use:

```powershell
PS C:\Users\marcus.crane&gt; Resolve-DnsName -Type MX evernote.com

Name                                     Type   TTL   Section    NameExchange                              Preference
----                                     ----   ---   -------    ------------                              ----------
evernote.com                             MX     43200 Answer     alt1.aspmx.l.google.com                   20
evernote.com                             MX     43200 Answer     alt2.aspmx.l.google.com                   20
evernote.com                             MX     43200 Answer     aspmx2.googlemail.com                     30
evernote.com                             MX     43200 Answer     aspmx3.googlemail.com                     30
evernote.com                             MX     43200 Answer     aspmx4.googlemail.com                     30
evernote.com                             MX     43200 Answer     aspmx5.googlemail.com                     30
evernote.com                             MX     43200 Answer     aspmx.l.google.com                        10
```

As above, you&#39;ll want to copy the mail server with the highest preference, which is `aspmx.l.google.com` in this case.

If you&#39;re a diehard command prompt fan, or just don&#39;t like/have access to Powershell, you can also get by using command prompt. It actually has a tool called `nslookup` that comes with two modes: interactive and non-interactive. I couldn&#39;t get a one liner to work so instead, we&#39;ll just have to settle for the interactive mode.

```bash
C:\Users\marcus.crane&gt;nslookup
Default Server:  UnKnown
Address:  192.168.1.1

&gt; set q=mx
&gt; evernote.com
Server:  UnKnown
Address:  192.168.1.1

Non-authoritative answer:
evernote.com    MX preference = 20, mail exchanger = alt1.aspmx.l.google.com
evernote.com    MX preference = 20, mail exchanger = alt2.aspmx.l.google.com
evernote.com    MX preference = 30, mail exchanger = aspmx2.googlemail.com
evernote.com    MX preference = 30, mail exchanger = aspmx3.googlemail.com
evernote.com    MX preference = 30, mail exchanger = aspmx4.googlemail.com
evernote.com    MX preference = 30, mail exchanger = aspmx5.googlemail.com
evernote.com    MX preference = 10, mail exchanger = aspmx.l.google.com
```

Once more, `aspmx.l.google.com`, the server with the highest preference is the one we&#39;re after so copy it and keep it handy.

If you want to read more about nslookup for command prompt, I dug up [some documentation](https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/nslookup) which lives under the section for Windows Server. Let me know if you figure out how to use nslookup in non-interactive mode!

## Interrogating/whispering to the mail server

Ok, got that mail server address handy? Now the party begins because from this point, the commands should be exactly the same across all major platforms with one quick caveat.

Windows users? You&#39;ll need to enable `telnet` by searching for &#34;Turn Windows features on or off&#34;, ticking `Telnet Client` and restarting to gain access.

Fire up your terminal of choice and enter `telnet aspmx.l.google.com 25`. This is where you&#39;d substitute your own mail server if you were following along at home with a different domain. Still the same port 25 though since we&#39;re dealing with SMTP no matter what.

```bash
&gt; telnet aspmx.l.google.com 25
Trying 172.217.194.26...
Connected to aspmx.l.google.com.
Escape character is &#39;^]&#39;.
220 mx.google.com ESMTP b26si1910042pgs.432 - gsmtp
```

There&#39;s not much to see besides a 200 code, meaning we&#39;ve connected successfully. I feel like a lot of servers usually have a nice message like &#34;hi&#34; or &#34;welcome&#34; and I thought Google did too but I guess not.

Our first step is to say hello to the server, which sounds like a joke but it&#39;s not. Enter `helo hi` and the server should greet you back like so:

```bash
&gt; helo hi
250 mx.google.com at your service
```

I&#39;ve artificially inserted a prompt here to denote what I&#39;ve entered but generally, telnet will have no such prompt.

Next, we&#39;ll need to say who the message is coming from. You can use your own email, or any email really. I like to use test@example.com because it&#39;s a dummy email, but it also comes from a real domain name. If that sounds like news, [IANA](https://www.iana.org) provides example.com as a domain for use in &#34;illustrative documents&#34; like books. Anyway, we provide our identity like so:

```bash
&gt; mail from: &lt;test@example.com&gt;
mail from: &lt;test@example.com&gt;
250 2.1.0 OK b26si1910042pgs.432 - gsmtp
```

We see another `250` response code followed by an `OK` which means that the mail server has accepted. If someone went wrong, we&#39;d see a 500 code. I think I&#39;ve gotten errors on rare occasions where I&#39;ve used fake domain names so I just use example.com to play it safe.

Lately, and where all our hard work pays off, is providing a recipient. This won&#39;t actually send an email, it&#39;ll just let us know if the address is real or not.

```bash
&gt; rcpt to: &lt;ian@evernote.com&gt;
250 2.1.5 OK b26si1910042pgs.432 - gsmtp
rcpt to: &lt;not.ian@evernote.com&gt;
550-5.1.1 The email account that you tried to reach does not exist. Please try
550-5.1.1 double-checking the recipient&#39;s email address for typos or
550-5.1.1 unnecessary spaces. Learn more at
550 5.1.1  https://support.google.com/mail/?p=NoSuchUser b26si1910042pgs.432 - gsmtp
```

As we can see, ian@evernote.com does indeed exist! We&#39;d receive a 550 error if the user was invalid but there are often some catches.

You won&#39;t always get it in the first go, or even necessarily have any leads on what the email structure looks like. All I can really suggest is brute force combinations until you get a response. If ian@evernote.com wasn&#39;t valid, my next step would look like this:

```bash
&gt; rcpt to: &lt;ian.small@evernote.com&gt;
550-5.1.1 The email account that you tried to reach does not exist. Please try
550-5.1.1 double-checking the recipient&#39;s email address for typos or
550-5.1.1 unnecessary spaces. Learn more at
550 5.1.1  https://support.google.com/mail/?p=NoSuchUser b26si1910042pgs.432 - gsmtp
rcpt to: &lt;i.small@evernote.com&gt;
550-5.1.1 The email account that you tried to reach does not exist. Please try
550-5.1.1 double-checking the recipient&#39;s email address for typos or
550-5.1.1 unnecessary spaces. Learn more at
550 5.1.1  https://support.google.com/mail/?p=NoSuchUser b26si1910042pgs.432 - gsmtp
&gt; rcpt to: &lt;ismall@evernote.com&gt;
250 2.1.5 OK b26si1910042pgs.432 - gsmtp
```

The most common formats are probably `first.name`, `f.last` and `flast` but I&#39;m sure you can look up lists of common formats or something.

## Common gotchas

The above usually works out for me most of the time but there&#39;s a few different things I&#39;ve noticed along the way that can throw a spanner in the works.

### Blocked IP addresses

This is one issue I came across while writing this post and it&#39;s to do with mail servers that refer you to a block list.

```bash
&gt; telnet microsoft-com.mail.protection.outlook.com 25
Trying 104.47.53.36...
Connected to microsoft-com.mail.protection.outlook.com.
Escape character is &#39;^]&#39;.
220 BL2NAM06FT004.mail.protection.outlook.com Microsoft ESMTP MAIL Service ready at Thu, 26 Sep 2019 10:51:20 &#43;0000
&gt; helo hi
250 BL2NAM06FT004.mail.protection.outlook.com Hello [121.74.XX.XX]
&gt; mail from: &lt;test@example.com&gt;
250 2.1.0 Sender OK
&gt; rcpt to: &lt;satya.nadella@microsoft.com&gt;
550 5.7.606 Access denied, banned sending IP [121.74.XX.XX]. To request removal from this list please visit https://sender.office.com/ and follow the directions. For more information please go to  http://go.microsoft.com/fwlink/?LinkID=526655 (AS16012609) [BL2NAM06FT004.Eop-nam06.prod.protection.outlook.com]
```

I&#39;ve noticed it with websites that use Microsoft / Outlook primarily where it mentioned that your IP address, or perhaps your entire IP range, is banned and that you should visit a particular link.

Presumably this is because common home address ranges are blocked, as I imagine most spammers just operate from those same ranges. I don&#39;t really have a solution for these cases unfortunately.

### Misleading success codes

Some SMTP servers are configured so that every address returns a success code meaning you can&#39;t tell what exists and what doesn&#39;t

```bash
&gt; mail from: &lt;test@example.com&gt;
250 2.1.0 Sender ok
&gt; rcpt to: &lt;postmaster@fb.com&gt;
250 2.1.5 Recipient ok
&gt; rcpt to: &lt;not.a.real.user@fb.com&gt;
250 2.1.5 Recipient ok
&gt; rcpt to: &lt;mark@fb.com&gt;
250 2.1.5 Recipient ok
```

There&#39;s not really any way around this other than sending a real email I suppose but you can test for it pretty easily. I like to use two emails, `postmaster` and `not.a.real.user` first as a test to see what they return. By default, the large majority of mail servers, if not all, have a postmaster address by default so you can almost guarantee it exists. Likewise, you&#39;d almost never create an address called not.a.real.user so it quickly lets you know if you&#39;re going to be tricked when trying your actual target address.

```bash
&gt; mail from: &lt;test@example.com&gt;
250 2.1.0 OK c127si1944876pga.334 - gsmtp
&gt; rcpt to: &lt;postmaster@evernote.com&gt;
250 2.1.5 OK c127si1944876pga.334 - gsmtp
&gt; rcpt to: &lt;not.a.real.user@evernote.com&gt;
550-5.1.1 The email account that you tried to reach does not exist. Please try
550-5.1.1 double-checking the recipient&#39;s email address for typos or
550-5.1.1 unnecessary spaces. Learn more at
550 5.1.1  https://support.google.com/mail/?p=NoSuchUser c127si1944876pga.334 - gsmtp
&gt; rcpt to: &lt;ian@evernote.com&gt;
250 2.1.5 OK c127si1944876pga.334 - gsmtp
```

## What is this handy for?

I first came across this trick a few years back. I had been talking to someone about a job interview, before I was actually in the tech industry but I… forgot to ask them for their email address. I remembered their name but I didn&#39;t know how it was formatted exactly so that&#39;s where this trick came in handy. It&#39;s useful to have in your back pocket when you want to email a semi-public figure too like the CEO of a company. Just make sure to use it wisely and respectfully. You won&#39;t make any friends by being malicious.

## Fun fact

```bash
&gt; nslookup -q=MX nintendo.co.uk
Server:         192.168.1.1
Address:        192.168.1.1#53

Non-authoritative answer:
nintendo.co.uk  mail exchanger = 20 luigi-mx.nintendo.de.
nintendo.co.uk  mail exchanger = 10 mario-mx.nintendo.de.
```
