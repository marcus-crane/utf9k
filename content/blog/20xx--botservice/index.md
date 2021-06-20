---
title: "Azure Bot Service guide"
date: "2099-06-21T11:37:27+12:00"
slug: "azure-bot-service-guide"
category: "blog"
draft: true
tags:
- "azure"
- "guide"
---

You can test if your Service Principle is valid by issuing a request for some credentials

```http
POST /botframework.com/oauth2/v2.0/token HTTP/1.1
Host: login.microsoftonline.com

grant_type=client_credentials&client_id=blah=client_secret=blah&scope=https%3A%2F%2Fapi.botframework.com%2F.default
```

```curl
curl -k -X POST https://login.microsoftonline.com/botframework.com/oauth2/v2.0/token -d "grant_type=client_credentials&client_id=APP_ID&client_secret=APP_PASSWORD&scope=https%3A%2F%2Fapi.botframework.com%2F.default"
```
