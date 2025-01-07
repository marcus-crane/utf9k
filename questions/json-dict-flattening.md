---
category: questions
description: In which I save myself a little bit of time
slug: json-dict-flattening
tags:
  - json
  - python
  - software
  - programming
title: How can I quickly flatten a JSON dictionary?
---
A very niche use case but I had a use case once for flattening a JSON object such that it went from this

```json
{
  "source": {
    "service": "blah"
  }
}
```

into this

```json
{
  "source.service": "blah"
}
```

In this case, the latter was easy to parse dynamically because it means the file would always have a depth of 1 instead of a possibly infinite depth to recurse through.

Anyway, this was thankfully easier than I expected using a Python library called [FlatDict](https://flatdict.readthedocs.io/en/stable/)

Here's an example of how to use it:

```python
import flatdict

d = flatdict.FlatDict(expect, delimiter='.')
```

How easy was that?

I haven't checked if the `FlatDict` type is serialisable as JSON but if not, you can just convert back to a dictionary using `dict(d)`.

A fuller example can be found in the form of [this Github Gist](https://gist.github.com/marcus-crane/5cb35112f33111fc1887e427e3488405).