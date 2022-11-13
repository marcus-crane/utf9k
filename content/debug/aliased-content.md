---
title: "Content that contains aliases"
slug: "aliased-content"
category: "debug"
maxwidth: true
---

These are pieces of content that contain alias entries eg; [/questions](/questions) used to live at [/notes](/notes) and a redirect is set up in the frontmatter for the category.

Sometimes these aliases may not map 1:1 to a piece of content, such as if a post was broken up into multiple, smaller posts.

{{< aliasedcontent.inline >}}
<table>
  <tr>
    <th>Title</th>
    <th>URL</th>
    <th>Aliases</th>
  </tr>
  {{ range .Site.Pages }}
    {{ if isset .Params "aliases" }}
      <tr>
        <td>{{ .Title }}</td>
        <td><a href="{{ .RelPermalink }}">{{ .RelPermalink }}</a></td>
        <td>
          {{ range .Params.aliases }}
            <a href="{{ . }}">{{ . }}</a>
          {{ end }}
        </td>
      </tr>
    {{ end }}
  {{ end }}
</table>
{{< /aliasedcontent.inline >}}