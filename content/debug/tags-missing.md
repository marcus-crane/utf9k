---
title: "Content that is missing tags"
slug: "tags-missing"
category: "debug"
maxwidth: true
---

These are pieces of content that are missing tags.

{{< categorymissing.inline >}}
{{ $correct := 0 }}
{{ $incorrect := 0 }}
<table>
  <tr>
    <th>Title</th>
    <th>Location</th>
    <th>Tags</th>
  </tr>
  {{ range .Site.Pages }}
    {{ if .File }}
      {{ $file := "" }}
      {{ with .File }}{{ $file = . }}{{ end }}
      {{ if (isset .Params "tags") }}
        {{ $correct = (add $correct 1) }}
      {{ else }}
        {{ $incorrect = (add $incorrect 1) }}
      {{ end }}
      <tr class='{{ if (isset .Params "tags") }}bg-green-200{{ else }}bg-red-200{{ end }}'>
        <td class="my-6 py-6">{{ .Title }}</td>
        <td><a href="{{ .RelPermalink }}">{{ .RelPermalink }}</a></td>
        <td>
          <ul>
          {{ range .Params.tags }}
            <li><a href="{{ . }}">{{ . }}</a></li>
          {{ end }}
          </ul>
        </td>
      </tr>
    {{ end }}
  {{ end }}
</table>
Remaining items to be fixed: {{ $incorrect }} / {{ add $incorrect $correct }}
{{< /categorymissing.inline >}}