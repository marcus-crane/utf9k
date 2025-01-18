---
category: questions
description: I should have just stayed on Python 2 (kidding!)
lastmod: 2024-11-13
slug: nodegyp-python-distutils-missing
tags:
  - node
  - python
  - node-gyp
  - distutils
  - dependencies
  - breaking-changes
title: Why is node-gyp complaining about missing distutils under Python 3.12?
---
Recently, I was working on an instance of [Backstage](https://backstage.io/) and when reinstalling `node_modules` from scratch, I ran into this interesting error. I've removed most of the output for clarity.

```shell
$ yarn install
➤ YN0000: · Yarn 4.3.1
[...]
➤ YN0000: ┌ Link step
➤ YN0007: │ isolated-vm@npm:4.5.0 must be built because it never has been before or the last one failed
➤ YN0009: │ isolated-vm@npm:4.5.0 couldn't be built successfully (exit code 1, logs can be found here: /private/var/folders/_g/k61b_sdn0q14vn94nkln53_h0000gq/T/xfs-a558ccfc/build.log)
➤ YN0000: └ Completed in 2s 414ms
➤ YN0000: · Failed with errors in 3s 254ms
```

From here, checking the mentioned logs gave me this:

```shell
$ cat /private/var/folders/_g/k61b_sdn0q14vn94nkln53_h0000gq/T/xfs-a558ccfc/build.log
# This file contains the result of Yarn building a package (isolated-vm@npm:4.5.0)
# Script name: install

gyp info it worked if it ends with ok
gyp info using node-gyp@9.3.1
gyp info using node@20.12.2 | darwin | arm64
gyp info find Python using Python version 3.12.7 found at "/Users/marcus/.local/share/mise/installs/python/3.12.7/bin/python3"
gyp info spawn /Users/marcus/.local/share/mise/installs/python/3.12.7/bin/python3
gyp info spawn args [...]
Traceback (most recent call last):
  File "/Users/marcus/blah/node_modules/node-gyp/gyp/gyp_main.py", line 42, in <module>
    import gyp  # noqa: E402
    ^^^^^^^^^^
  File "/Users/marcus/blah/node_modules/node-gyp/gyp/pylib/gyp/__init__.py", line 9, in <module>
    import gyp.input
  File "/Users/marcus/blah/node_modules/node-gyp/gyp/pylib/gyp/input.py", line 19, in <module>
    from distutils.version import StrictVersion
ModuleNotFoundError: No module named 'distutils'
gyp ERR! configure error
gyp ERR! stack Error: `gyp` failed with exit code: 1
gyp ERR! stack     at ChildProcess.onCpExit (/Users/marcus/blah/node_modules/node-gyp/lib/configure.js:325:16)
gyp ERR! stack     at ChildProcess.emit (node:events:518:28)
gyp ERR! stack     at ChildProcess._handle.onexit (node:internal/child_process:294:12)
gyp ERR! System Darwin 24.1.0
gyp ERR! command "/Users/marcus/.local/share/mise/installs/node/20.12.2/bin/node" "/Users/marcus/blah/node_modules/node-gyp/bin/node-gyp.js" "rebuild" "--release" "-j" "4"
gyp ERR! cwd /Users/marcus/blah/node_modules/isolated-vm
gyp ERR! node -v v20.12.2
gyp ERR! node-gyp -v v9.3.1
gyp ERR! not ok
```

For clarity, there's the actually important part pulled out:

```shell
Traceback (most recent call last):
  File "/Users/marcus/blah/node_modules/node-gyp/gyp/gyp_main.py", line 42, in <module>
    import gyp  # noqa: E402
    ^^^^^^^^^^
  File "/Users/marcus/blah/node_modules/node-gyp/gyp/pylib/gyp/__init__.py", line 9, in <module>
    import gyp.input
  File "/Users/marcus/blah/node_modules/node-gyp/gyp/pylib/gyp/input.py", line 19, in <module>
    from distutils.version import StrictVersion
ModuleNotFoundError: No module named 'distutils'
gyp ERR! configure error
gyp ERR! stack Error: `gyp` failed with exit code: 1
```

What we can see here is that some part of trying to build `node-gyp` attempted a call to the Python module `distutils` and we don't have that module installed.

At this point, I realised I had upgraded a bunch of language runtimes recently and sure enough, `distutils` is no longer shipped with Python by default.

This was done via [PEP 632](https://peps.python.org/pep-0632/) and announced at the very top of the Python 3.12 [release notes](https://docs.python.org/3/whatsnew/3.12.html#summary-release-highlights) that I haven't read.

Anyway, for myself on macOS, I did the following to get distutils all set up:

```shell
$ brew install python-setuptools
$ pip install setuptools
```

Both steps are required I believe but I haven't tested to see what if you have one or the other. I do know that running `pip install` fixed it but some claim that `brew install` was the missing half for them.

Anyway, you should be back on your way to javascripting in no time.