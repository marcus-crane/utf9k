---
date: 2016-08-08T00:00:00+1300
description: My first ever blog post
slug: emojis-or-why-cant-i-just-paste-the-hotdog
title: Emojis, Or Why Can't I Just Paste The Hotdog?
---

## I tried to write a super simple program that spat out a 🌭 emoji.

It turns out that it’s not quite as straight forward as I had hoped!

Let’s rewind a bit and I’ll eventually explain what an emoji is since it can be tempting to think it’s just an image.

## ASCII Anyone?

Before we get into the complexities of encoding, let’s learn about ASCII!

Like all names comprised solely of capital letters, they once stood for something and in this case, ASCII stood for the American Standard Code for Information Interchange. I know that because I looked it up on Wikipedia.

ASCII codes are used as a way of representing text with the first 31 characters being special entities. 0 as Null, 4 signaling the End of a Transmission, 8 representing Backspace and so on.

From 23 onwards, you’d find more usable characters like the alphabet (both upper and lowercase), the numbers 0 to 9 and a range of punctuation. If you look at your keyboard, most of it is sitting right there in front of you!

It was initially designed for telecommunications, having spawned from telegraph code so it’s a bit odd that such an old idea would be incorporated in computers but we have a former US President to thank for that.

> “All computers and related equipment configurations brought into the Federal Government inventory on and after July 1, 1969, must have the capability to use the Standard Code for Information Interchange and the formats prescribed by the magnetic tape and paper tape standards when these media are used.”  
> ~ [Lyndon B. Johnson](https://en.wikipedia.org/wiki/Lyndon_B._Johnson)

That’s fancy politician speak for “Hey guys, we’re using ASCII as the standard now, ok? Cool, thanks.”

## So, ASCII is character encoding?

Yes! ASCII is indeed a way of storing characters based on a certain type of encoding. With ASCII, we could refer to a specific number, letter or symbol primarily using a numeric code, at least from the users point of view
	
You’re not just limited to numbers, as some encodings may map out characters based on bytes or [Octets](https://en.wikipedia.org/wiki/Octet_(computing)) rather, [bitstreams](https://en.wikipedia.org/wiki/Bitstream) or even electrical signals. I won’t pretend to know anything about those first two though so don’t tweet me asking about ‘em.

ASCII used to be the standard for character encoding on the Web until UTF-8 caught up but never fear because UTF-8 is backwards compatible with ASCII! Not that we’d probably notice otherwise honestly.

## If we had ASCII, why bother making more types of encoding? Aren’t they all the same?

A-ha! You, dear reader, have fallen into the same trap that quite a number of American computer scientists fell into. At least you can say, relatively speaking, the IQ of said hole is quite high but it’s still a trap nonetheless.

Like most things in America, ASCII catered towards English speakers. Programming in general caters primarily towards English speakers even. Next time you’re on a .jp site, check out the source and you might be surprised to find all of the HTML tags are in English!

A great example of this came out of Europe. The `[`, `]`, `{` and `}` characters were left at the mercy of the users character encoding and on European keyboards, were often swapped out with accented characters.

Ignoring the fact that this is a modern example, a programmer in the US might write a simple Javascript like so:

```js
for (i in dogArray) { console.log(dogArray[i]) }
```

Now, for the sake of historical accuracy, pretend that Denmark in the 1970s were ahead of the game and were writing Javascript before it was invented.

Should that same US programmer visit Denmark for a presentation and live code their prior example on a Danish computer, they would find this monstrosity birthed onto the screen thanks in part to [ISO/IEC 646](https://en.wikipedia.org/wiki/ISO/IEC_646).

```js
for (i in dogArray) æ console.log(dogArrayÆiÅ) å
```

Not exactly ideal for those constantly on the move so it was decided that a universal solution was required and with that, we have the birth of UTF-8

## I’m hungry! Why aren’t we talking about hotdogs?

Ok! Ok! I’m getting there but this is all important backstory to understand how emojis work. Well, I could have probably skipped a fair bit actually but I think it’s all interesting stuff.

## Why didn’t they just stick all of the European characters into ASCII and call it a day?

Oooh, nice try but unfortunately, ASCII utilized a 7-bit system which meant it was only able to store 27 or 128 characters.  
  

| ASCII Characters      | Char Count | Remaining |
| --------------------- | ---------- | --------- |
| Alphabet (Uppercase)  | 26         | 102       |
| Alphabet (Lowercase)  | 26         | 76        |
| Numbers (0 - 9)       | 10         | 66        |
| Control Characters    | 31         | 35        |
| Punctuation + Symbols | 32         | 3         |
| Space                 | 1          | 2         | 
| Delete                | 1          | 1         |
| Escape                | 1          | 0         |

As you can see, all 128 slots are used up! Most charts will actually end at 127 but we’re programmers and as such, you’ll notice those charts tend to start at 0 instead of 1.

Once the English, or rather Latin alphabet was crammed into ASCII, all those 'non-essential' essentials needed in Europe like the [Umlaut](https://en.wikipedia.org/wiki/Umlaut_(linguistics)) or [Diaeresis](https://en.wikipedia.org/wiki/Diaeresis_(diacritic)) are left out in the cold.

## Emojis?

Right, sorry! Just a quick word about UTF-8 though.

Unicode Transformation Format 8-bit (or Universal Coded Character Set Transformation Format depending on who you ask) is an 8-bit system that was designed to allow all possible characters to be encoded in one single system.

It’s able to encode all 1,112,064 valid code points defined by Unicode meaning we don’t have to worry about future proofing for quite some time.

## Code points?

Yes! Notice that I didn’t mention characters this time.

While we tend to use integers as they’re human readable, ASCII assigns each character to a [hexadecimal](https://en.wikipedia.org/wiki/Hexadecimal) code point ranging from 0 to 7F.

Here’s a few examples of hexadecimal used in ASCII

| ASCII Character | Hex |
| --------------- | --- |
| NULL            | 00  |
| ESCAPE          | 1B  |
| DELETE          | 7F  |
| Slash           | 2F  |

Seeing as UTF-8 is able to assign a code point to every character, its range stretches from 0 to 10FFFF!

## Ok, I get the idea! No more tables please

Aww, I liked doing Markdown tables…

Alrighty, so, we know about code points and character encoding so I think we’re finally ready to talk about…

## YES

UTF-16 and UCS-2

## I’M SCREAMING OVER HERE

Don’t worry, we’re super close! We’re like two hops away from uhh

We’re getting there, just chill out. Think about all the cool obscure stuff you now know about how your computer interprets your keypresses and stores language.

Isn’t it neat? I think so.

For reasons I won’t get into here since this post is quite lengthy already, UTF-16 and UCS-2’s initial ‘plane’ contains code points from `U+0000` to `U+FFFF`.

`U+010000` up to `U+10FFFF` are known as the supplementary planes and, in UTF-16, are encoded in surrogate pairs using 16-bit units.

These surrogate pairs however, still represent only a single Unicode character. UCS-2, which Javascript uses, doesn’t implement surrogate pairs.

## 🌭?

Heck yeah. So, as far as codepoints are concerned, here’s how to represent the 🌭 emoji in hexadecimal using surrogate pairs:

`\uD83C\uDF2D`

## One surrogate pair which represents one character right? What’s the issue?

As I said, UCS-2 doesn’t have a concept of surrogate pairs.

If we checked the length of 🌭 it _should_ be 1 character long but Javascript will tell us that it’s actually 2 characters long!

The problem with outputting 🌭 and emojis in general is that we can’t get Javascript to natively read the two pairs as one character.

Instead, you might get something unexpected like a Chinese character or it’ll just break.

## Are there any fixes?

It seems that it’s actually up to the Javascript engines themselves to determine whether or not to use UCS-2 or UTF-16.

There’s a few fixes on the horizon like [String.prototype.CodepointAt()](https://262.ecma-international.org/6.0/#sec-string.prototype.codepointat) which is probably already in the language but may still require Babel? I haven’t really messed around with it.

Hopefully I’ve got my facts straight but if I misinterpreted anything along the way and you think/know you’re an expert unlike myself, feel free to flip your shit in the comments.

That’s assuming I set this blog up correctly and they’ve rendered of course. If not, just send me an [email](mailto:marcus@thingsima.de) or something.