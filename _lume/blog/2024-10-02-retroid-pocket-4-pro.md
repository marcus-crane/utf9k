---
category: blog
date: 2024-10-02T10:40:00+13:00
description: I finally found a handheld that I really enjoy
output: src/content/blog
publish: true
slug: retroid-pocket-4-pro
tags:
  - emulation
  - gaming
  - syncthing
title: Portable gaming with the Retroid Pocket 4 Pro
---
So far, my favourite purchase of the year has to be the [Retroid Pocket 4 Pro](https://www.goretroid.com/products/retroid-pocket-4-handheld).

![A photo of the author holding a Retroid Pocket 4 Pro with their left hand. Visible on the screen is Steins;Gate for the Playstation Portable. It's not entirely clear from the image but they are on a train.](https://cdn.utf9k.net/blog/retroid-pocket-4-pro/steinsgate-train.jpg)

It's a handheld Android device that is powerful enough to play PS2 and Gamecube games, in addition to everything that came before those generations.

Holding it is very nice because it's just the right size, not too small or too big. The buttons, joysticks and triggers all feel great.

I dunno, I'm not a reviewer so all I can say is that it feels pretty comfy.

One main thing that was always a question mark for me though is as much as I like the idea of a portable handheld, there are some titles I prefer to play on my desktop when I get the chance.

What would be great is "[transfarring](https://youtu.be/flK748GogoA)" but baked in at the OS layer which got me looking into [Syncthing](https://syncthing.net/).

I'd been aware of it for a long time but I never really had a use case for it. It never seemed quite like the right thing to replace say; Google Drive or Dropbox because you have to handle backups yourself.

Technically Dropbox and Google Drive work but one issue I quickly ran into is that some save files are stored in locations that are not easily accessible. You could drag and drop them into Drive on a mobile device but then to pick up your progress on a desktop, you'd have to then copy the file back out of Drive for example.

You could use symlinks I'm sure but they're not always trivial to set up.

Anyway, it turns out Syncthing is perfect for this use case.

The short version is that you point it at a directory and then you can share that directory with another computer running Syncthing. Each device syncing files can store them in their own unique location.

![A screenshot of the Syncthing GUI running on a Windows desktop. Visible are shared folders for PS2, PS3 and PSP save directories.](https://cdn.utf9k.net/blog/retroid-pocket-4-pro/syncthing-desktop.png)

As an example, on my desktop, I store my PS2 memory cards somewhere like `C:\Users\Marcus\Documents\PCSX2\MemoryCards` while on my Retroid Pocket 4 Pro, they're stored roughly in `/Android/data/xyz.aethersx2.android/files/memcards`.

When I arrive home, the Retroid Pocket eventually connects to WiFi and then Syncthing transfers my PS2 memory cards over to my desktop (and vice versa).

I also sync these to my Synology NAS as well, where they're replicated into a [Backblaze B2](https://www.backblaze.com/cloud-storage) bucket along with a bunch of other files I have in cold storage.

One elephant in the room of sorts is Retroachievements. I'm a big fan of the idea and even updated my library to only have RA compatible ROMs.

That said, I *think* you have to be online for achievements to unlock? This seems to differ between emulators where I think most do fetch a list of achievements on game start, so you at least need to be online when you begin a session but it's not entirely clear to me if emulators will store unlocks while offline and then sync them when you're next online?

It's not a huge deal in that I just always have my Retroid tethered via my phone but this can obviously be a pain point for those who don't have such a luxury.

Anyway, if you're looking for an emulation device, so far I'm quite happy and I've been playing a bit more here and there on the train as I head to work.