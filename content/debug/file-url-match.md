---
title: "Check whether file names match their defined slugs"
slug: "file-url-match"
category: "debug"
maxwidth: true
---

Sometimes when moving content around, it's easy to forget to update their slugs.

This can cause a lot of trouble:

* Users may end up viewing the wrong content
* Google may index things incorrectly
* It's just confusing to navigate around the site when files map differently to what has been deployed

{{< fileurlmatch.inline >}}
<table>
  <tr>
    <th>Location</th>
    <th>Slug</th>
    <th>Filename</th>
  </tr>
  {{ range .Site.Pages }}
    {{ if .File }}
      {{ $file := "" }}
      {{ with .File }}{{ $file = . }}{{ end }}
      {{ if and (ne $file.BaseFileName "index") (ne $file.BaseFileName "_index") }}
        <tr class="{{ if (eq $file.BaseFileName .Slug) }}bg-green-200{{ else }}bg-red-200{{ end }}">
          <td>{{ $file.Path }}</td>
          <td>{{ .Slug }}</td>
          <td>{{ $file.BaseFileName }}</td>
        </tr>
      {{ end }}
    {{ end }}
  {{ end }}
</table>
{{< /fileurlmatch.inline >}}