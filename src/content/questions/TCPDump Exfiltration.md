---
category: questions
description: In which I have more data than I know what to do with
output: src/content/questions
publish: true
slug: tcpdump-exfiltration
tags:
  - wireshark
  - networking
title: How can I capture network packets with tcpdump?
---
I always forget the various flags for `tcpdump` but also how to actually get captures off of machines in the rare case that it's useful for low level debugging.

```console
$ tcpdump -i <interface> -s 65535 -w <file>
```

If you're capturing packets inside of a Docker container, you can export the file like so:

```shell
$ docker cp <container_id>:<container_path> ~/Desktop/file.pcap
```

You can also capture specific ports:

```console
$ tcpdump -i <interface> port 8126 -s 65535 -w <file>
```

As for getting files off the host, you'll want to do this:

```console
scp <host>:<path>/file.pcap ~/Desktop/file.pcap
```