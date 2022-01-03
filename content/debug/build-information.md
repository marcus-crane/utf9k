---
title: "Build information"
slug: "build-information"
category: "debug"
---

Sometimes it's handy to check when my site was last built, and with what variables especially if I'm transitioning things behind the scenes such as DNS records or static hosting.

{{< buildinformation.inline >}}
<table>
  <tr>
    <th>Name</th>
    <th>Value</th>
  </tr>
  <tr>
    <td>Build timestamp</td>
    <td>{{ now }}</td>
  </tr>
  <tr>
    <td>Number of pages</td>
    <td>{{ len .Site.AllPages }}</td>
  </tr>
  <tr>
    <td>Number of sections</td>
    <td>{{ len .Site.Sections }}</td>
  </tr>
  <tr>
    <td>Hugo version</td>
    <td>{{ hugo.Version }}</td>
  </tr>
  <tr>
    <td>Hugo server running</td>
    <td>{{ .Site.IsServer }}</td>
  </tr>
  <tr>
    <td>Drafts visible</td>
    <td>{{ .Site.BuildDrafts }}</td>
  </tr>
  <tr>
    <td>Shell language</td>
    <td>
      <ul>
        <li>LANG: {{ getenv "LANG" }}</li>
        <li>LANGUAGE: {{ getenv "LANGUAGE" }}</li>
        <li>LC_ALL: {{ getenv "LC_ALL" }}</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Build tools</td>
    <td>
      <ul>
        <li>Hugo: {{ hugo.Version }}</li>
        <li>Node: {{ getenv "NODE_VERSION" }}</li>
        <li>Python: {{ getenv "PYTHON_VERSION" }}</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Deployment info (<a href="https://netlify.com">netlify</a>)</td>
    <td>
      <ul>
        <li>NODE_ENV: {{ getenv "NODE_ENV" }}</li>
      </ul>
    </td>
  </tr>
  </tr>
  </tr>

</table>
{{< /buildinformation.inline >}}
