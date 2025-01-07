---
category: questions
description: In which I get some nice icons without too much effort
slug: macos-generating-iconsets
tags:
  - macos
  - design
  - utilities
  - macos
  - resources
  - design
title: How can I easily bulk generate icons on macOS?
---
**Source**: [Originally mentioned by strogonoff on Hacker News](https://news.ycombinator.com/item?id=36495008)

> You can use sips together with iconutil to generate a complete .icns file for your app from a single 1024 by 1024 PNG without any third party software:

```shell
mkdir MyIcon.iconset
cp Icon1024.png MyIcon.iconset/icon_512x512@2x.png
sips -z 16 16     Icon1024.png --out MyIcon.iconset/icon_16x16.png
sips -z 32 32     Icon1024.png --out MyIcon.iconset/icon_16x16@2x.png
sips -z 32 32     Icon1024.png --out MyIcon.iconset/icon_32x32.png
sips -z 64 64     Icon1024.png --out MyIcon.iconset/icon_32x32@2x.png
sips -z 128 128   Icon1024.png --out MyIcon.iconset/icon_128x128.png
sips -z 256 256   Icon1024.png --out MyIcon.iconset/icon_128x128@2x.png
sips -z 256 256   Icon1024.png --out MyIcon.iconset/icon_256x256.png
sips -z 512 512   Icon1024.png --out MyIcon.iconset/icon_256x256@2x.png
sips -z 512 512   Icon1024.png --out MyIcon.iconset/icon_512x512.png
iconutil -c icns MyIcon.iconset
```

> As a bonus, generate .ico with ffmpeg:

```shell
ffmpeg -i MyIcon.iconset/icon_256x256.png icon.ico
```
