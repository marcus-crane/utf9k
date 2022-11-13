---
title: "Remote resources"
slug: "remote-resources"
category: "experiments"
---

{{< remoteresources.inline >}}
{{ with resources.GetRemote "https://example.com" }}
    {{ with .Err }}
      {{ warnf "%s" . }}
    {{ end }}
  {{ end }}
{{< /remoteresources.inline >}}