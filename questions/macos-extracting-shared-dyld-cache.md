---
category: questions
description: In which I have no idea what is going on with shared libraries
output: src/content/questions
publish: true
slug: macos-extracting-shared-dyld-cache
tags:
  - macos
  - libraries
  - reverseengineering
title: How can I extract stuff from the macOS shared dyld cache?
---
**Source**: https://alinpanaitiu.com/blog/turn-off-macbook-display-clamshell/

Since macOS Big Sur shipped, Apple have started shipping system libraries as one big cache blob.

We can use [dyld-shared-cache-extractor](https://github.com/keith/dyld-shared-cache-extractor) to pull out these libraries for fun and reverse engineering.

This will require a full version of XCode to be installed however.

On macOS Ventura and above, you can run the following to extract shared libraries:

```console
$ dyld-shared-cache-extractor /System/Volumes/Preboot/Cryptexes/OS/System/Library/dyld/dyld_shared_cache_arm64e /tmp/libraries
```

We can also extract lists of symbols from System frameworks like so:

```console
$ mkdir symbols private-symbols

$ fd --maxdepth 1 -t f \
    . ./System/Library/*Frameworks/*.framework/Versions/A/ \
    -x sh -c 'nm --demangle --defined-only --extern-only {} > symbols/{/}'
$ fd --maxdepth 1 -t f \
    . ./System/Library/*Frameworks/*.framework/Versions/A/ \
    -x sh -c 'nm --demangle --defined-only {} > private-symbols/{/}'
```
