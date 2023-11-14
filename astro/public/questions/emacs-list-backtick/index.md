# Why do some Emacs lists start with a backtick instead of a comma?
01 January 0001

Lists that start with a `` ` `` end up having values interpolated.

Compare the following two examples:

```lisp
&#39;(,(concat &#34;Hello, &#34; &#34;World&#34;), &#34;Nice to meet you?&#34;)
; (,(concat &#34;Hello, &#34; &#34;World&#34;)
;   ,&#34;Nice to meet you?&#34;)
```

As you can see, we got the exact same list that we defined when starting with a `&#39;`

How about using a `` ` ``?

```lisp
`(,(concat &#34;Hello, &#34; &#34;World&#34;), &#34;Nice to meet you?&#34;)
; (&#34;Hello, World&#34; &#34;Nice to meet you?&#34;)
```

The `concat` expression is evaluated and we get back two strings!