---
title: "How can I view methods associated with an Elixir object?"
slug: "elixir-object-methods"
description: "In which I remember how to introspect in Elixir"
category: "questions"
tags:
  - "elixir"
---

Let's say we have the following module

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
