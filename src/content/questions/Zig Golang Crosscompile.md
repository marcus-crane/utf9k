---
category: questions
description: In which I don't have to go to the store to buy 6 different laptops
output: src/content/questions
publish: true
slug: zig-golang-crosscompile
tags:
  - golang
  - compilation
  - zig
  - softwaredevelopment
title: How can I cross-compile Golang software using Zig?
---
When trying to cross-compile applications for different operating systems and architectures, you can often hit some niche configurations that are difficult to accomodate.

Thankfully [Zig](https://ziglang.org/) can help to alleviate this pain point as it bundles standard libraries for all major platforms ie; `GNU libc`, `musl libc` and so on.

Assuming you have Zig already installed, you can cross compile a Go application like so:

```console
$ CGO_ENABLED=1 GOOS=linux GOARCH=amd64 CC="zig cc -target x86_64-linux" CXX="zig c++ -target x86_64-linux" go build --tags extended
```

> [!note] 🏏 There are some custom names at play here
>
> You should note that Zig uses the term `amd64` rather than `x86_64`.

While the [list of supported targets is very long](https://ziglang.org/documentation/master/#Targets), here are some most common combinations:

- `x86_64-linux-gnu`
- `x86_64-windows-gnu`
- `x86_64-macos-musl`
- `aarch64-macos-gnu`

As you can tell, the format followed is `<arch>-<os>-<libc>`