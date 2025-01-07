---
category: questions
description: In which I sniff my own packets
slug: decrypting-wireshark-ssl-traffic
tags:
  - wireshark
  - networking
  - reverseengineering
title: How can I decrypt SSL traffic with Wireshark?
---
**Source**: https://everything.curl.dev/usingcurl/tls/sslkeylogfile

`curl` supports an environment variable called `SSLKEYLOGFILE` out of the box.

Setting it will place the SSL key used to negotiate sessions at that path which you can then load into Wireshark to inspect secure sessions.

Most browsers support it as well.

With that key in hand, you can provide it to Wireshark like so:

Under Preferences, head to `Protocols` -> `TLS` and hit `Edit` next to `RSA keys list`.

In the popup, entering in the IP address, port, protocol and key file you want to use to decrypt TLS traffic.