---
title: "Barrier (and routing tables)"
date: "2099-12-29T00:00:00+1300"
slug: "barrier-and-routing"
category: "blog"
draft: true
tags:
- "convenience"
- "networking"
---

## Using Barrier while using a VPN

While a mostly seemless piece of software, it does rely on being able to connect to the host machine and as I pretty quickly found out working from home, being on a VPN can quickly make your devices unresolvable.

In order to work around this, we can force macOS to route any local traffic (not just barrier) through your home router, rather than trying to send it through your VPN gateway.

To clarify further, we want Barrier to find out what computer lives in your home range of `192.168.x.x`. With its traffic being forwarded through the VPN gateway, it ends up trying to look around somewhere in an Azure data centre for a matching IP address and finds nothing.

The way we can go about this is by adding a route table entry which matches on traffic bound for `192.168.x.x` and send it out via your WiFi interface rather than attempting to use the VPN tunnel interface.

For starters, let's see an example of this in action. Currently, I have my work VPN turned on and you'll see it has an interface named `utun6`. For traffic that isn't going via the VPN, it uses the interface named `en0`.

By default, my laptop can query my home router but that's about it so lets see what a local request looks like:

```bash
> route get 192.168.1.1
   route to: 192.168.1.1
destination: 192.168.1.1
  interface: en0
      flags: <UP,HOST,DONE,LLINFO,WASCLONED,IFSCOPE,IFREF,ROUTER>
 recvpipe  sendpipe  ssthresh  rtt,msec    rttvar  hopcount      mtu     expire
       0         0         0         0         0         0      1500      1188
```

We can see that traffic being sent to `192.168.1.1` will indeed end up at `192.168.1.1` and it'll exist via the `en0` interface. There's also no `gateway` specified so we can assume it'll use the default gateway which is just my home router.

Now lets look at our barrier host and see what it's reporting back:

```bash
> route get 192.168.1.103
   route to: 192.168.1.103
destination: 192.168.1.103
    gateway: 33.12.129.142
  interface: utun6
      flags: <UP,GATEWAY,HOST,DONE,WASCLONED,IFSCOPE,IFREF>
 recvpipe  sendpipe  ssthresh  rtt,msec    rttvar  hopcount      mtu     expire
       0         0         0         0         0         0      1400         0
```

Hmm, it all looks the same except we now have a `gateway` attribute that is pointing to `33.12.129.142`. It'll definitely try to access `192.168.1.103` rather than switching it for some entirely different address.

```bash
> sudo route add -host 192.168.1.103 -interface en0
add host 192.168.1.103: gateway en0
```
