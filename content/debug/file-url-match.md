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
{{ $correct := 0 }}
{{ $incorrect := 0 }}
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
        {{ if (eq $file.BaseFileName .Slug) }}
          {{ $correct = (add $correct 1) }}
        {{ else }}
          {{ $incorrect = (add $incorrect 1) }}
        {{ end }}
        <tr style="background-color: {{ if (eq $file.BaseFileName .Slug) }}lightgreen{{ else }}lightpink{{ end }}">
          <td>{{ $file.Path }}</td>
          <td>{{ .Slug }}</td>
          <td>{{ $file.BaseFileName }}</td>
        </tr>
      {{ end }}
    {{ end }}
  {{ end }}
</table>
Remaining items to be fixed: {{ $incorrect }} / {{ add $incorrect $correct }}
{{< /fileurlmatch.inline >}}