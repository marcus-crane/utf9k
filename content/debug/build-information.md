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
        <li>Branch: {{ getenv "BRANCH" }}</li>
        <li>Build ID: {{ getenv "BUILD_ID" }}</li>
        <li>CI: {{ getenv "CI" }}</li>
        <li>Context: {{ getenv "CONTEXT" }}</li>
        <li>Deploy Prime URL: {{ getenv "DEPLOY_PRIME_URL" }}</li>
        <li>Deploy URL: {{ getenv "DEPLOY_URL" }}</li>
        <li>Git LFS: {{ getenv "GIT_LFS_ENABLED" }}</li>
        <li>Netlify Build Debug: {{ getenv "NETLIFY_BUILD_DEBUG" }}</li>
        <li>Netlify Image CDN: {{ getenv "NETLIFY_IMAGES_CDN_DOMAIN" }}</li>
        <li>Pull request: {{ getenv "PULL_REQUEST" }}</li>
        <li>URL: {{ getenv "URL" }}</li>
      </ul>
    </td>
  </tr>
</table>
{{< /buildinformation.inline >}}
