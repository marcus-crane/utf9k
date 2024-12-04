---
title: "Build information"
slug: "build-information"
category: "debug"
description: "This page contains build information about this site and the tools that is uses"
tags:
- "debug"
- "hugo"
- "meta"
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
    <td>{{ hugo.IsServer }}</td>
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
    <td>CI Info (<a href="https://docs.github.com/en/actions/learn-github-actions/environment-variables#default-environment-variables">Github Actions</a>)</td>
    <td>
      <ul>
        <li>CI: {{ getenv "CI" }}</li>
        <li>Github Action: {{ getenv "GITHUB_ACTION" }}</li>
        <li>Github Actor: {{ getenv "GITHUB_ACTOR" }}</li>
        <li>Github Job: {{ getenv "GITHUB_JOB" }}</li>
        <li>Github Ref: {{ getenv "GITHUB_REF" }}</li>
        <li>Github Run Attempt: {{ getenv "GITHUB_RUN_ATTEMPT" }}</li>
        <li>Github Run ID: {{ getenv "GITHUB_RUN_ID" }}</li>
        <li>Github Run Number: {{ getenv "GITHUB_RUN_NUMBER" }}</li>
        <li>Github SHA: {{ getenv "GITHUB_SHA" }}</li>
        <li>Runner Arch: {{ getenv "RUNNER_ARCH" }}</li>
        <li>Runner OS: {{ getenv "RUNNER_OS" }}</li>
      </ul>
    </td>
  </tr>
</table>
{{< /buildinformation.inline >}}
