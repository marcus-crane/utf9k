# Recovering lost Python results in the REPL
12 December 2018

I was messing around with some queuing earlier today in order to try out the [Kombu](https://github.com/celery/kombu) library. It works pretty nicely but I goofed up while playing with it.

To add a message to a queue, it looks a little like this:

```python
from kombu import Connection, Queue

conn = Connection() # Defaults to a RabbitMQ Docker container I have running locally
queue = conn.SimpleQueue(&#39;test&#39;)
queue.put(&#39;this is a message i want to put on the queue&#39;)
```

You may want to use a context manager instead but for a simple test, this works fine. Now then, how about getting a message off the queue? It&#39;s straight forward as well.

```python
queue.get()
# &lt;Message object at 0x110a844c8 with details {&#39;state&#39;: &#39;RECEIVED&#39;, &#39;content_type&#39;: &#39;text/plain&#39;, &#39;delivery_tag&#39;: 1, &#39;body_length&#39;: 5, &#39;properties&#39;: {}, &#39;delivery_info&#39;: {&#39;exchange&#39;: &#39;test&#39;, &#39;routing_key&#39;: &#39;test&#39;}}&gt;
```

Cool, we&#39;ve received a message now so next we need to acknowledge it with the ack function…

Wait a minute, we forgot to save that message to a variable so how the hell can we acknowledge it?! Damn, it&#39;s totally just lost in memory, huh?

This is a scenario I ran into and it got me wondering: Is it possible to retrieve a Python object by that hex/memory address? Well, it turns out that you can&#39;t. I haven&#39;t done a deep dive yet but if it&#39;s a continuously running application, it may soon exit memory and be lost forever.

If you&#39;re just running in the Python REPL however, there is actually a way: The handy `_` operator.

```python
# &lt;Message object at 0x110a844c8 with details {&#39;state&#39;: &#39;RECEIVED&#39;, &#39;content_type&#39;: &#39;text/plain&#39;, &#39;delivery_tag&#39;: 1, &#39;body_length&#39;: 5, &#39;properties&#39;: {}, &#39;delivery_info&#39;: {&#39;exchange&#39;: &#39;test&#39;, &#39;routing_key&#39;: &#39;test&#39;}}&gt;
_.ack()
# &lt;Message object at 0x110a844c8 with details {&#39;state&#39;: &#39;ACK&#39;, &#39;content_type&#39;: &#39;text/plain&#39;, &#39;delivery_tag&#39;: 1, &#39;body_length&#39;: 5, &#39;properties&#39;: {}, &#39;delivery_info&#39;: {&#39;exchange&#39;: &#39;test&#39;, &#39;routing_key&#39;: &#39;test&#39;}}&gt;
message = _
print(message)
# &lt;Message object at 0x110a844c8 with details {&#39;state&#39;: &#39;ACK&#39;, &#39;content_type&#39;: &#39;text/plain&#39;, &#39;delivery_tag&#39;: 1, &#39;body_length&#39;: 5, &#39;properties&#39;: {}, &#39;delivery_info&#39;: {&#39;exchange&#39;: &#39;test&#39;, &#39;routing_key&#39;: &#39;test&#39;}}&gt;
```

As you can see, the interpreter actually binds the last result to the `_` character. If you were to do `1 &#43; 1`, the value of `_` would be 2! You can also bind the value to a variable for use later on.

I don&#39;t think I&#39;d need it often but it&#39;s very handy to know.
