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

```json
{
  "error": "unauthorized_client",
  "error_description": "AADSTS700016: Application with identifier '<client_id>' was not found in the directory 'botframework.com'. This can happen if the application has not been installed by the administrator of the tenant or consented to by any user in the tenant. You may have sent your authentication request to the wrong tenant.\r\nTrace ID: <trace_id>\r\nCorrelation ID: <correlation_id>\r\nTimestamp: 2021-06-20 23:01:29Z",
  "error_codes": [
    700016
  ],
  "timestamp": "2021-06-20 23:01:29Z",
  "trace_id": "<trace_id>",
  "correlation_id": "<correlation_id>",
  "error_uri": "https://login.microsoftonline.com/error?code=700016"
}
```

For example, I've gotten 403 Forbidden for an app registration and it turns out that the client ID isn't registered
