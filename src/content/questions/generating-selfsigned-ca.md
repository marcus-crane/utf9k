---
category: questions
description: In which I pretend to make computers secure
output: src/content/questions
publish: true
slug: generating-selfsigned-ca
tags:
  - security
  - certificates
  - openssl
title: How can I generate a self-signed CA certificate chain?
---
Here is how to generate a self-signed client CA for an extremely long period of time. You probably shouldn't do this for anything important though!

```bash
$ openssl genpkey -algorithm RSA -out ca-key.pem
$ openssl req -new -x509 -key ca-key.pem -out ca-cert.pem -days 9999
```

Next, let's generate a server key and certificate

```bash
$ openssl genpkey -algorithm RSA -out server-key.pem
$ openssl req -new -key server-key.pem -out server-csr.pem
$ openssl x509 -req -in server-csr.pem -CA ca-cert.pem -CAkey ca-key.pem -out server-cert.pem -CAcreateserial -days 9999
```

Finally, we'll do the same for the client

```bash
$ openssl genpkey -algorithm RSA -out client-key.pem
$ openssl req -new -key client-key.pem -out client-csr.pem
$ openssl x509 -req -in client-csr.pem -CA ca-cert.pem -CAkey ca-key.pem -out client-cert.pem -CAcreateserial -days 9999
```

You can use the following command to test a request to the server using the client certificate

```bash
$ openssl s_client -connect <host>:<port> -CAfile client-cert.pem -key client-key.key
```
