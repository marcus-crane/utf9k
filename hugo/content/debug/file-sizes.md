---
title: "Which files are the biggest?"
slug: "file-sizes"
category: "debug"
maxwidth: true
description: "This page lists all site content and their respective file sizes"
tags:
- "debug"
- "hugo"
- "meta"
---

It's handy to know what files are large, in order to see what might be good to compress.

{{< filesizes.inline >}}
{{ if fileExists "data/filesizes.json" }}
<table>
  <tr>
    <th>Location</th>
    <th>Size</th>
    <th>Extension</th>
  </tr>
  {{ range $.Site.Data.filesizes }}
  <tr {{ if in .path ".DS_Store" }}style="background-color: yellow"{{ end }}>
    <td>{{ .path }}</td>
    <td>{{ .size }}</td>
    <td>{{ .type }}</td>
  </tr>
  {{ end }}
</table>
{{ else }}
<h4><code>data/filesizes.json</code> doesn't exist. You need to generate it by running <code>scripts/gather-filesizes.py</code></h4>
{{ end }}
{{< /filesizes.inline >}}
