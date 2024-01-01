---
title: "How can I decrypt SSL traffic with Wireshark?"
slug: "decrypting-wireshark-ssl-traffic"
description: "In which I sniff my own packets"
category: "questions"
tags:
  - "wireshark"
  - "networking"
  - "reverseengineering"
---

Decrypting some TLS traffic (and other protocols) is possible if you have the private key used to establish a connection on hand.

Under Preferences, head to `Protocols` -> `TLS` and hit `Edit` next to `RSA keys list`.

In the popup, entering in the IP address, port, protocol and key file you want to use to decrypt TLS traffic.