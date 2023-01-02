---
title: "Remote resources"
slug: "remote-resources"
category: "experiments"
tags:
- "experiments"
- "hugo"
- "meta"
---

{{< remoteresources.inline >}}
{{ with resources.GetRemote "https://example.com" }}
    {{ with .Err }}
      {{ warnf "%s" . }}
    {{ end }}
  {{ end }}
{{< /remoteresources.inline >}}