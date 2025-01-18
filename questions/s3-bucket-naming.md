---
category: questions
description: In which you can seize a cool namespace
lastmod: 2024-01-01
slug: s3-bucket-naming
tags:
  - aws
  - s3
title: How can I check if an S3 bucket name is available?
---
When wanting to create an S3 bucket, you don't always want to go to the effort to actually attempt to make one.

Thankfully it's possible to see if a name is taken without any special auth required.

```console
$ curl -si https://blah.s3.amazonaws.com | grep bucket-region
x-amz-bucket-region: us-east-1
$ curl -si https://fesuihfseiu.s3.amazonaws.com | grep bucket-region
// no response so it's available
```

Here's a full response to illustrate:

```console
$ curl -si https://blah.s3.amazonaws.com
HTTP/1.1 403 Forbidden
x-amz-bucket-region: us-east-1
x-amz-request-id: QHNTTS080AYYG8H6
x-amz-id-2: 5HgWDKk7cDQ41J9zy6kKIdbMA57rtB4NaK/9zzceuNaHa2SSGMJFjHdLlba2j1TFsp35GLBPcvU=
Content-Type: application/xml
Transfer-Encoding: chunked
Date: Mon, 01 Jan 2024 05:19:00 GMT
Server: AmazonS3

<?xml version="1.0" encoding="UTF-8"?>
<Error><Code>AccessDenied</Code><Message>Access Denied</Message><RequestId>QHNTTS080AYYG8H6</RequestId><HostId>5HgWDKk7cDQ41J9zy6kKIdbMA57rtB4NaK/9zzceuNaHa2SSGMJFjHdLlba2j1TFsp35GLBPcvU=</HostId></Error>
```