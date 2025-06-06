---
category: blog
date: 2018-12-12T00:00:00+13:00
description: Did you know that Python stores the previous output as a hidden variable?
slug: lost-python-results
tags:
  - python
  - snippet
title: Recovering lost Python results in the REPL
---
I was messing around with some queuing earlier today in order to try out the [Kombu](https://github.com/celery/kombu) library. It works pretty nicely but I goofed up while playing with it.

To add a message to a queue, it looks a little like this:

```python
from kombu import Connection, Queue

conn = Connection() # Defaults to a RabbitMQ Docker container I have running locally
queue = conn.SimpleQueue('test')
queue.put('this is a message i want to put on the queue')
```

You may want to use a context manager instead but for a simple test, this works fine. Now then, how about getting a message off the queue? It's straight forward as well.

```python
queue.get()
# <Message object at 0x110a844c8 with details {'state': 'RECEIVED', 'content_type': 'text/plain', 'delivery_tag': 1, 'body_length': 5, 'properties': {}, 'delivery_info': {'exchange': 'test', 'routing_key': 'test'}}>
```

Cool, we've received a message now so next we need to acknowledge it with the ack function…

Wait a minute, we forgot to save that message to a variable so how the hell can we acknowledge it?! Damn, it's totally just lost in memory, huh?

This is a scenario I ran into and it got me wondering: Is it possible to retrieve a Python object by that hex/memory address? Well, it turns out that you can't. I haven't done a deep dive yet but if it's a continuously running application, it may soon exit memory and be lost forever.

If you're just running in the Python REPL however, there is actually a way: The handy `_` operator.

```python
# <Message object at 0x110a844c8 with details {'state': 'RECEIVED', 'content_type': 'text/plain', 'delivery_tag': 1, 'body_length': 5, 'properties': {}, 'delivery_info': {'exchange': 'test', 'routing_key': 'test'}}>
_.ack()
# <Message object at 0x110a844c8 with details {'state': 'ACK', 'content_type': 'text/plain', 'delivery_tag': 1, 'body_length': 5, 'properties': {}, 'delivery_info': {'exchange': 'test', 'routing_key': 'test'}}>
message = _
print(message)
# <Message object at 0x110a844c8 with details {'state': 'ACK', 'content_type': 'text/plain', 'delivery_tag': 1, 'body_length': 5, 'properties': {}, 'delivery_info': {'exchange': 'test', 'routing_key': 'test'}}>
```

As you can see, the interpreter actually binds the last result to the `_` character. If you were to do `1 + 1`, the value of `_` would be 2! You can also bind the value to a variable for use later on.

I don't think I'd need it often but it's very handy to know.
