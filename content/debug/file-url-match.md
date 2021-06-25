---
title: "Check whether file names match their defined slugs"
slug: "file-url-match"
category: "debug"
maxwidth: true
---

{{< fileurlmatch.inline >}}
<table>
  <tr>
    <th>Title</th>
    <th>Slug</th>
    <th>Filename</th>
  </tr>
  {{ range .Site.Pages }}
  <tr>
    <td>{{ .Title }}</td>
    <td>{{ .Slug }}</td>
    <td>{{ with .File }}{{ .BaseFileName }}{{ end }}</td>
    <td>{{ .Params.category }}
  </tr>
  {{ end }}
</table>
{{< /fileurlmatch.inline >}}