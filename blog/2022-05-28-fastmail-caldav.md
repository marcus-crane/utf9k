---
title: "Using Fastmail with CalDAV libraries"
date: "2022-05-28"
description: "A guide to using Fastmail with CalDAV libraries which are often fiddly and struggle to find your calendars"
slug: "fastmail-caldav"
category: "blog"
tags:
- "caldav"
- "calendar"
- "fastmail"
---

I've been a subscriber to [Fastmail](https://fastmail.com) now for probably a good five years at least, if not more at this point.

It's a really nice service, not just for email but also email and contact hosting and for most clients, it all basically works out of the box as you might hope.

A number of services that integration with calendars tend to only offer [Google Calendar](https://en.wikipedia.org/wiki/Google_Calendar) integration but thankfully CalDAV integration pops up from time to time.

One thing that I think can be a little bit confusing for people is the Fastmail documentation.

If we visit the [Server names and ports](https://www.fastmail.help/hc/en-us/articles/1500000278342-Server-names-and-ports#calendar) page, it mentions `https://caldav.fastmail.com/` as the default server for clients with auto-discovery with [a support page](https://www.fastmail.help/hc/en-us/articles/360058752834) for other clients.

That's perfectly correct but a number of CalDAV libraries I've seen around the place tend to complain about that base URL.

Most recently, I ran into this with [obsidian-full-calendar](https://github.com/davish/obsidian-full-calendar/issues/87) where Fastmail integration was considered not working but really, the wrong server name was being used.

If `https://caldav.fastmail.com/` doesn't work, odds are you'll get what you're after by using the following server name:

```text
https://caldav.fastmail.com/dav/principals/user/user@example.com/
```

***user@example.com** is the email address that you use for Fastmail.*

You can confirm that by navigating to your Fastmail inbox and seeing what address in the top left corner if you really need to.

Alternatively, you could also navigate to `Settings` → `Calendars` → `Export` (on one of the calendars) and copy most of the section from `CalDAV URL`.

![A screenshot of the author's Fastmail account, showing the Settings page. The Calendars tab is highlighted in the left sidebar. Three calendars are visible in the background with a modal open in the foreground. The modal has two sections: One deals with exporting a calendar. The other has a text box with the CalDAV URL for the selected calendar. An arrow is pointing to the text box. The contents of the textbox is highlighted up to the end of the segment containing the author's email. The ID at the end is not selected although this is not visible as it is blurred out.](./img/blog/fastmail-caldav/calendar-settings.png)

Putting the whole URL will only load one calendar but odds are, whatever CalDAV client you're struggling with will load all of your calendars by removing the calendar ID at the end.

Why does this work exactly? Well, I'm no expert here but I gave a brief overview of my understanding by way of [this Github comment](https://github.com/davish/obsidian-full-calendar/pull/106#issuecomment-1120536933).

For completeness, I've quoted it verbatim:

> For anyone interested, Fastmail uses [Cyrus IMAP](https://www.cyrusimap.org/) which is an all-in-one IMAP, CalDAV and CardDAV server. As I understand it, it [represents calendars as mailboxes under the hood](https://www.cyrusimap.org/imap/concepts/features/dav-collection-mgmt.html) hence why you use your Fastmail address as the identifier. That is, you have a single "calendar" in the UI but you can have multiple calendars on it eg; one for Events, one for Work and so on.
>
> In fact, we can prove this by requesting a bogus calendar:

```shell
$ curl -u <fastmail-email>:<fastmail-app-password> https://caldav.fastmail.com/dav/calendars/user/<fastmail-email>/blah
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
  <head>
    <title>404 Not Found</title>
  </head>
  <body>
    <h1>Not Found</h1>
    <p>Mailbox does not exist</p>
    <hr>
    <address>Cyrus-HTTP/3.7.0-alpha0-591-gfe6c3a2700-fm-20220427.001-gfe6c3a27 Cyrus-SASL/2.1.27 Lib/XML2.9.10 Jansson/2.13.1 OpenSSL/1.1.1n Wslay/1.1.1 Zlib/1.2.11 Brotli/1.0.9 Xapian/1.5.0 LibiCal/3.0 ICU4C/69.1 SQLite/3.34.1 Server at caldav.fastmail.com Port 2075</address>
  </body>
</html>
```

*Note how it is looking for a mailbox despite being a caldav server*

> So yeah, your calendars are just email inboxes under the hood with Fastmail!
>
> More specifically, there is a mailbox per calendar (I think) and that mailbox is full of [ics](https://en.wikipedia.org/wiki/ICalendar) files
