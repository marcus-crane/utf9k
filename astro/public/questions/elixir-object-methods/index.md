# How can I view methods associated with an Elixir object?
01 January 0001

Let&#39;s say we have the following module

```elixir
defmodule Reminder do
  def alarm(time, day) do
  end
end
```

We can check what methods are on it by providing a `:functions` atom

```elixir
Reminder.__info__(:functions)
# [alarm: 2]
```

As we can see, this Reminder module has an alarm method, with an arity of 2.
