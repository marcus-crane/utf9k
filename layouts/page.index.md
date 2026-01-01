---
{{ with .Description }}description: {{ . }}{{- end }}
{{ with .Param "lastmod" }}lastmod: {{ .Format "2006-01-02" }}{{- end }}
{{ with .Param "slug" }}slug: {{ . }}{{- end }}
{{- with .Param "tags" }}
tags:
{{- range . }}
- "{{ . }}"
{{- end }}
{{- end }}
title: {{ .Title }}
---
{{ .RawContent }}