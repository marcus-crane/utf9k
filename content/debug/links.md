---
title: "Links"
slug: "links"
category: "debug"
description: "This page contains metadata about all of the links present on this site"
---

There are many links present on this site that can slowly die over time.

This page helps me keep track of them and their latest checked status

{{< links.inline >}}
{{ $alive := 0 }}
{{ $dead := 0 }}
{{ if fileExists "data/links.json" }}
<table>
  <tr>
    <th>Link</th>
    <th>Status</th>
    <th>Alive</th>
    <th>Source</th>
  </tr>
  {{ range $.Site.Data.links }}
    {{ $bgColour := "lightgreen" }}
    {{ if .alive }}
      {{ $alive = (add $alive 1) }}
    {{ else }}
      {{ $dead = (add $dead 1) }}
      {{ $bgColour = "lightpink" }}
    {{ end }}
    {{ if and (eq (int .status) 0) (eq .alive false) }}
      {{ $bgColour = "yellow" }}
    {{ end }}
    <tr style="background-color: {{ $bgColour }}">
      <td><a href="{{ .url }}">{{ .url }}</a></td>
      <td>{{ .status }}</td>
      <td>{{ .alive }}</td>
      <td>{{ .source }}</td>
    </tr>
  {{ end }}
</table>
Links that are dead: {{ $dead }} / {{ add $alive $dead }}
{{ else }}
<h4><code>data/links.json</code> doesn't exist. You need to generate it by running <code>scripts/validate-urls.py</code></h4>
{{ end }}
{{< /links.inline >}}
