# Content that contains aliases
01 January 0001

These are pieces of content that contain alias entries eg; [/questions](/questions) used to live at [/notes](/notes) and a redirect is set up in the frontmatter for the category.

Sometimes these aliases may not map 1:1 to a piece of content, such as if a post was broken up into multiple, smaller posts.

{{&lt; aliasedcontent.inline &gt;}}
&lt;table&gt;
  &lt;tr&gt;
    &lt;th&gt;Title&lt;/th&gt;
    &lt;th&gt;URL&lt;/th&gt;
    &lt;th&gt;Aliases&lt;/th&gt;
  &lt;/tr&gt;
  {{ range .Site.Pages }}
    {{ if isset .Params &#34;aliases&#34; }}
      &lt;tr&gt;
        &lt;td&gt;{{ .Title }}&lt;/td&gt;
        &lt;td&gt;&lt;a href=&#34;{{ .RelPermalink }}&#34;&gt;{{ .RelPermalink }}&lt;/a&gt;&lt;/td&gt;
        &lt;td&gt;
          {{ range .Params.aliases }}
            &lt;a href=&#34;{{ . }}&#34;&gt;{{ . }}&lt;/a&gt;
          {{ end }}
        &lt;/td&gt;
      &lt;/tr&gt;
    {{ end }}
  {{ end }}
&lt;/table&gt;
{{&lt; /aliasedcontent.inline &gt;}}