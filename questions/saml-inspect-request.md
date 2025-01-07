---
category: questions
description: In which I remind myself how to dig into a SAML payload
slug: saml-inspect-request
tags:
  - authentication
  - saml
title: How can I inspect a SAML request?
---
Until recently, I never had to go near SAML with a 10 foot pole but I was recently helping out a coworker with adding SAML authentication to an Elasticsearch cluster.

I had never seen one before but a SAML request looks a little like this:

```text
https://idp.example.org/SAML2/SSO/Redirect?SAMLRequest=fZFfa8IwFMXfBb9DyXvaJtZ1BqsURRC2Mabbw95ivc5Am3TJrXPffmmLY3%2FA15Pzuyf33On8XJXBCaxTRmeEhTEJQBdmr%2FRbRp63K3pL5rPhYOpkVdYib%2FCon%2BC9AYfDQRB4WDvRvWWksVoY6ZQTWlbgBBZik9%2FfCR7GorYGTWFK8pu6DknnwKL%2FWEetlxmR8sBHbHJDWZqOKGdsRJM0kfQAjCUJ43KX8s78ctnIz%2Blp5xpYa4dSo1fjOKGM03i8jSeCMzGevHa2%2FBK5MNo1FdgN2JMqPLmHc0b6WTmiVbsGoTf5qv66Zq2t60x0wXZ2RKydiCJXh3CWVV1CWJgqanfl0%2Bin8xutxYOvZL18NKUqPlvZR5el%2BVhYkAgZQdsA6fWVsZXE63W2itrTQ2cVaKV2CjSSqL1v9P%2FAXv4C
```

I took [this example](https://en.wikipedia.org/wiki/SAML_2.0) from Wikipedia and it's a pretty good illustration of where the juicy part of the request probably is.

A basic way to inspect this request in Python would look like the following. I don't claim that this will work on all requests. For that, try something like [python3-saml](https://github.com/onelogin/python3-saml).

```python
from base64 import b64decode
from urllib.parse import unquote
import zlib

url = "fZFfa8IwFMXfBb9DyXvaJtZ1BqsURRC2Mabbw95ivc5Am3TJrXPffmmLY3%2FA15Pzuyf33On8XJXBCaxTRmeEhTEJQBdmr%2FRbRp63K3pL5rPhYOpkVdYib%2FCon%2BC9AYfDQRB4WDvRvWWksVoY6ZQTWlbgBBZik9%2FfCR7GorYGTWFK8pu6DknnwKL%2FWEetlxmR8sBHbHJDWZqOKGdsRJM0kfQAjCUJ43KX8s78ctnIz%2Blp5xpYa4dSo1fjOKGM03i8jSeCMzGevHa2%2FBK5MNo1FdgN2JMqPLmHc0b6WTmiVbsGoTf5qv66Zq2t60x0wXZ2RKydiCJXh3CWVV1CWJgqanfl0%2Bin8xutxYOvZL18NKUqPlvZR5el%2BVhYkAgZQdsA6fWVsZXE63W2itrTQ2cVaKV2CjSSqL1v9P%2FAXv4C"
urldecoded_url = unquote(url)
b64decoded_url = b64decode(url)
request = zlib.decompress(b64decoded_url, -15).decode()
print(request) // '<?xml version="1.0" encoding="UTF-8"?>\r\n<samlp:AuthnRequest\r\n  xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol"\r\n  xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion"\r\n  ID="aaf23196-1773-2113-474a-fe114412ab72"\r\n  Version="2.0"\r\n  IssueInstant="2004-12-05T09:21:59Z"\r\n  AssertionConsumerServiceIndex="0"\r\n  AttributeConsumingServiceIndex="0">\r\n  <saml:Issuer>https://sp.example.com/SAML2</saml:Issuer>\r\n  <samlp:NameIDPolicy\r\n    AllowCreate="true"\r\n    Format="urn:oasis:names:tc:SAML:2.0:nameid-format:transient"/>\r\n</samlp:AuthnRequest>\r\n'
```

If you're feeling a bit lazy, like I often am, you can use any of the online decoders, such as [this one by PingID](https://developer.pingidentity.com/en/tools/saml-decoder.html).

If you're dealing with sensitive credentials however, it's best to decode it locally rather than trusting a third party.
