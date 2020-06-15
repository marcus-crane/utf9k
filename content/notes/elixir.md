+++
title = "Elixir"
author = ["Marcus Crane"]
lastmod = 2020-06-15T22:39:51+12:00
slug = "elixir"
draft = false
+++

## View methods associated with an object {#view-methods-associated-with-an-object}

Let's say we have the following module

```elixir
defmodule Reminder do
  def alarm(time, day) do
  end
end
```

We can check what methods are on it by providing a :functions atom

```elixir
Reminder.__info__(:functions)
# [alarm: 2]
```

As we can see, this Reminder module has an alarm method, with an arity of 2.


## Output help documentation for a module {#output-help-documentation-for-a-module}

The iex interpreter includes a function called h which can be used to show documentation for a module

```elixir
h String
# h/1
```
