---
category: blog
date: 2019-09-26T00:00:00+13:00
description: There are some tricks you can use to figure out if an email address is legit
slug: email-lookup
tags:
  - email
  - nslookup
  - telnet
  - tip
title: Double checking if an email address exists
---
Sometimes I'll want to email someone but I don't know if their email address is valid. Likewise, they might have verbally told it to you, but you can't remember if it has a dot or a dash! Luckily, there's a handy way to find out using a mix of nslookup and telnet.

I'll take you through a recent example where I wanted to email Ian Small, the CEO of Evernote, to thank him and the Evernote team for their wonderful Behind the Scenes videos. You can see them [here](https://www.youtube.com/watch?v=5rNUpXYCcrA) and I think they're worth a peek.

Anyway, if I had to take a blind guess, ian[at]evernote.com would be a valid email. Well, it is indeed and so that's why I've picked it since it's such an obvious format. For the sake of learning, let's just pretend we're trying to find a valid email from scratch. Naturally, if you have a particular domain you're interested in, just swap out evernote.com for your domain of choice. Going forward however, I'll be using evernote.com.

## Finding the mail server (macOS / Linux)

For macOS and Linux, we'll want to use `nslookup` which should come ready to go as part of your OS/distro of choice. Fire up a terminal and enter `nslookup -q=MX evernote.com` and you should get a bunch of Google domains back like so:

```bash
> nslookup -q=MX evernote.com
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

What we can see here is a list of the different mail servers used by Evernote. In this case, they're using Gmail, likely as part of Google's [GSuite](https://gsuite.google.com/) offering.

Go ahead and copy the highest priority mail server, `aspmx.l.google.com`, to your clipboard as we'll be interrogating it shortly.

## Finding the mail server (Windows)

Personally, I'm not much of a Windows development person so I actually had to look up the Windows equivalents.

For Powershell, there's a cmdlet called `Resolve-DnsName` that was surprisingly straight forward to use:

```powershell
PS C:\Users\marcus.crane> Resolve-DnsName -Type MX evernote.com

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

As above, you'll want to copy the mail server with the highest preference, which is `aspmx.l.google.com` in this case.

If you're a diehard command prompt fan, or just don't like/have access to Powershell, you can also get by using command prompt. It actually has a tool called `nslookup` that comes with two modes: interactive and non-interactive. I couldn't get a one liner to work so instead, we'll just have to settle for the interactive mode.

```bash
C:\Users\marcus.crane>nslookup
Default Server:  UnKnown
Address:  192.168.1.1

> set q=mx
> evernote.com
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

Once more, `aspmx.l.google.com`, the server with the highest preference is the one we're after so copy it and keep it handy.

If you want to read more about nslookup for command prompt, I dug up [some documentation](https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/nslookup) which lives under the section for Windows Server. Let me know if you figure out how to use nslookup in non-interactive mode!

## Interrogating/whispering to the mail server

Ok, got that mail server address handy? Now the party begins because from this point, the commands should be exactly the same across all major platforms with one quick caveat.

Windows users? You'll need to enable `telnet` by searching for "Turn Windows features on or off", ticking `Telnet Client` and restarting to gain access.

Fire up your terminal of choice and enter `telnet aspmx.l.google.com 25`. This is where you'd substitute your own mail server if you were following along at home with a different domain. Still the same port 25 though since we're dealing with SMTP no matter what.

```bash
> telnet aspmx.l.google.com 25
Trying 172.217.194.26...
Connected to aspmx.l.google.com.
Escape character is '^]'.
220 mx.google.com ESMTP b26si1910042pgs.432 - gsmtp
```

There's not much to see besides a 200 code, meaning we've connected successfully. I feel like a lot of servers usually have a nice message like "hi" or "welcome" and I thought Google did too but I guess not.

Our first step is to say hello to the server, which sounds like a joke but it's not. Enter `helo hi` and the server should greet you back like so:

```bash
> helo hi
250 mx.google.com at your service
```

I've artificially inserted a prompt here to denote what I've entered but generally, telnet will have no such prompt.

Next, we'll need to say who the message is coming from. You can use your own email, or any email really. I like to use test@example.com because it's a dummy email, but it also comes from a real domain name. If that sounds like news, [IANA](https://www.iana.org) provides example.com as a domain for use in "illustrative documents" like books. Anyway, we provide our identity like so:

```bash
> mail from: <test@example.com>
mail from: <test@example.com>
250 2.1.0 OK b26si1910042pgs.432 - gsmtp
```

We see another `250` response code followed by an `OK` which means that the mail server has accepted. If someone went wrong, we'd see a 500 code. I think I've gotten errors on rare occasions where I've used fake domain names so I just use example.com to play it safe.

Lately, and where all our hard work pays off, is providing a recipient. This won't actually send an email, it'll just let us know if the address is real or not.

```bash
> rcpt to: <ian@evernote.com>
250 2.1.5 OK b26si1910042pgs.432 - gsmtp
rcpt to: <not.ian@evernote.com>
550-5.1.1 The email account that you tried to reach does not exist. Please try
550-5.1.1 double-checking the recipient's email address for typos or
550-5.1.1 unnecessary spaces. Learn more at
550 5.1.1  https://support.google.com/mail/?p=NoSuchUser b26si1910042pgs.432 - gsmtp
```

As we can see, ian@evernote.com does indeed exist! We'd receive a 550 error if the user was invalid but there are often some catches.

You won't always get it in the first go, or even necessarily have any leads on what the email structure looks like. All I can really suggest is brute force combinations until you get a response. If ian@evernote.com wasn't valid, my next step would look like this:

```bash
> rcpt to: <ian.small@evernote.com>
550-5.1.1 The email account that you tried to reach does not exist. Please try
550-5.1.1 double-checking the recipient's email address for typos or
550-5.1.1 unnecessary spaces. Learn more at
550 5.1.1  https://support.google.com/mail/?p=NoSuchUser b26si1910042pgs.432 - gsmtp
rcpt to: <i.small@evernote.com>
550-5.1.1 The email account that you tried to reach does not exist. Please try
550-5.1.1 double-checking the recipient's email address for typos or
550-5.1.1 unnecessary spaces. Learn more at
550 5.1.1  https://support.google.com/mail/?p=NoSuchUser b26si1910042pgs.432 - gsmtp
> rcpt to: <ismall@evernote.com>
250 2.1.5 OK b26si1910042pgs.432 - gsmtp
```

The most common formats are probably `first.name`, `f.last` and `flast` but I'm sure you can look up lists of common formats or something.

## Common gotchas

The above usually works out for me most of the time but there's a few different things I've noticed along the way that can throw a spanner in the works.

### Blocked IP addresses

This is one issue I came across while writing this post and it's to do with mail servers that refer you to a block list.

```bash
> telnet microsoft-com.mail.protection.outlook.com 25
Trying 104.47.53.36...
Connected to microsoft-com.mail.protection.outlook.com.
Escape character is '^]'.
220 BL2NAM06FT004.mail.protection.outlook.com Microsoft ESMTP MAIL Service ready at Thu, 26 Sep 2019 10:51:20 +0000
> helo hi
250 BL2NAM06FT004.mail.protection.outlook.com Hello [121.74.XX.XX]
> mail from: <test@example.com>
250 2.1.0 Sender OK
> rcpt to: <satya.nadella@microsoft.com>
550 5.7.606 Access denied, banned sending IP [121.74.XX.XX]. To request removal from this list please visit https://sender.office.com/ and follow the directions. For more information please go to  http://go.microsoft.com/fwlink/?LinkID=526655 (AS16012609) [BL2NAM06FT004.Eop-nam06.prod.protection.outlook.com]
```

I've noticed it with websites that use Microsoft / Outlook primarily where it mentioned that your IP address, or perhaps your entire IP range, is banned and that you should visit a particular link.

Presumably this is because common home address ranges are blocked, as I imagine most spammers just operate from those same ranges. I don't really have a solution for these cases unfortunately.

### Misleading success codes

Some SMTP servers are configured so that every address returns a success code meaning you can't tell what exists and what doesn't

```bash
> mail from: <test@example.com>
250 2.1.0 Sender ok
> rcpt to: <postmaster@fb.com>
250 2.1.5 Recipient ok
> rcpt to: <not.a.real.user@fb.com>
250 2.1.5 Recipient ok
> rcpt to: <mark@fb.com>
250 2.1.5 Recipient ok
```

There's not really any way around this other than sending a real email I suppose but you can test for it pretty easily. I like to use two emails, `postmaster` and `not.a.real.user` first as a test to see what they return. By default, the large majority of mail servers, if not all, have a postmaster address by default so you can almost guarantee it exists. Likewise, you'd almost never create an address called not.a.real.user so it quickly lets you know if you're going to be tricked when trying your actual target address.

```bash
> mail from: <test@example.com>
250 2.1.0 OK c127si1944876pga.334 - gsmtp
> rcpt to: <postmaster@evernote.com>
250 2.1.5 OK c127si1944876pga.334 - gsmtp
> rcpt to: <not.a.real.user@evernote.com>
550-5.1.1 The email account that you tried to reach does not exist. Please try
550-5.1.1 double-checking the recipient's email address for typos or
550-5.1.1 unnecessary spaces. Learn more at
550 5.1.1  https://support.google.com/mail/?p=NoSuchUser c127si1944876pga.334 - gsmtp
> rcpt to: <ian@evernote.com>
250 2.1.5 OK c127si1944876pga.334 - gsmtp
```

## What is this handy for?

I first came across this trick a few years back. I had been talking to someone about a job interview, before I was actually in the tech industry but I… forgot to ask them for their email address. I remembered their name but I didn't know how it was formatted exactly so that's where this trick came in handy. It's useful to have in your back pocket when you want to email a semi-public figure too like the CEO of a company. Just make sure to use it wisely and respectfully. You won't make any friends by being malicious.

## Fun fact

```bash
> nslookup -q=MX nintendo.co.uk
Server:         192.168.1.1
Address:        192.168.1.1#53

Non-authoritative answer:
nintendo.co.uk  mail exchanger = 20 luigi-mx.nintendo.de.
nintendo.co.uk  mail exchanger = 10 mario-mx.nintendo.de.
```
