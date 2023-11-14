# How can I find out where Emacs is checking for passwords?
01 January 0001

You can see a list of current `auth-sources` by running the following `elisp` function

```lisp
&gt; auth-sources
(password-store &#34;~/.authinfo.gpg&#34;)
```
