---
title: Typography
slug: typography
category: debug
description: This page contains various markdown blocks for testing typographic rendering
layout: page.vto
---

This page is used to test out colour schemes of various elements

## Paragraphs

Any line of text with a space above and below becomes a paragraph.

These two lines don't have a space
so they are merged together.

These two lines are not merged together<br>
because they contain an explicit line break.

This is a large amount of text that will render as a paragraph and despite what you might imagine will happen, there will be no magical line breaks or anything else that will save you from this extremely long run-off sentence so your only hope is that I will run out of text to type.

## Headings

# This is an H1

## This is an H2

### This is an H3

#### This is an H4

##### This is an H5

###### This is an H6

## Typography

This is a paragraph with some regular text.

This is a paragraph with some **bold** text.

This is a paragraph with some *italic* text.

This is a paragraph with some _**bold and italic**_ text.

This is a paragraph with some ~strikethrough~ text.

This is a paragraph with some ~*italic strikethrough*~ text.

This is a paragraph with some ~**bold strikethrough**~ text.

This is a paragraph with some <sub>subscript</sub> text.

This is a paragraph with some <sup>superscript</sup> text.

This is a paragraph with some <ins>underlined</ins> text.

This is a paragraph telling you to press <kbd>CTRL</kbd> + <kbd>ALT</kbd> + <kbd>DELETE</kbd>.

This is a paragraph with some <mark>marked</mark> text.

## Blockquotes

This is regular text.

> This is a regular blockquote.

This is also regular text.

> This is something that someone might have once said
>
> — Some Person

## Code Blocks

> [!TIP]
> A list of valid language identifiers can be found [here](https://gohugo.io/content-management/syntax-highlighting/#languages).

Here is some JSON that is indented with two spaces:

```json
{
  "nice": true
}
```

Here is a bash script:

```bash
#!/usr/bin/env bash
echo "something"
```

Here is some Python that is intended with 4 spaces:

```python
with open("file.txt", "w") as file:
    if something:
        file.write(data)
```

## Links

This is a paragraph containing a [link](https://example.com) using Markdown syntax.

This is a paragraph containing a <a href="https://example.com">link</a> using HTML syntax.

## Images

This is an image rendered using Markdown syntax:

![Image by Robert Clark on Unsplash](https://cdn.utf9k.net/images/robert-clark-streak.jpg)

This is an image rendered using HTML syntax:

<img alt="Image by Robert Clark on Unsplash" src="https://cdn.utf9k.net/images/robert-clark-streak.jpg" />

This is an image rendered using HTML syntax, and a trailing `figcaption`:

<img alt="Image by Robert Clark on Unsplash" src="https://cdn.utf9k.net/images/robert-clark-streak.jpg" style="border-radius: 3px;" />
<figcaption style="display: none;">You can see the source image <a target="_blank" href="https://unsplash.com/photos/a-blurry-photo-of-a-red-and-orange-object-YetawMqixFs">here</a></figcaption>

## Lists

This is an unordered list:

- Item 1
- Item 2
- Item 3

This is an ordered list:

1. Item 1
2. Item 2
3. Item 3

This is a nested list:

- Item 1
  - Subitem 1
  - Subitem 2
- Item 2
  - Subitem 1
    - Subitem 1

This is a task list:

- [ ] Do this
- [x] Do this as well
- [ ] Finally, do this

## Footnotes

Here is a some text with a footnote containing more information.[^1]

## Comments

You are able to see this

<!-- but you are not able to see this -->

## Escaping

Using a backslash means that \*this text\* is not bolded.

## Tables

| Name | Notes | Setting |
| ---- | ----- | ------- |
| Blah | Neat  | Yes     |
| Bleh | Rude  | No      |

## Callouts (Github Syntax)

> [!NOTE]
> Useful information that users should know, even when skimming content.

> [!TIP]
> Helpful advice for doing things better or more easily.

> [!IMPORTANT]
> Key information users need to know to achieve their goal.

> [!WARNING]
> Urgent info that needs immediate user attention to avoid problems.

> [!CAUTION]
> Advises about risks or negative outcomes of certain actions.

> [!CAUTION]
> Here is a multi-line alert
>
> - It can contain a list
> - With many items
>   - Even subitems
>   - [x] and tasks

[^1]: Here is some more information.