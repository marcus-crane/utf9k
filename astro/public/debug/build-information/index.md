# Build information
01 January 0001

Sometimes it&#39;s handy to check when my site was last built, and with what variables especially if I&#39;m transitioning things behind the scenes such as DNS records or static hosting.

{{&lt; buildinformation.inline &gt;}}
&lt;table&gt;
  &lt;tr&gt;
    &lt;th&gt;Name&lt;/th&gt;
    &lt;th&gt;Value&lt;/th&gt;
  &lt;/tr&gt;
  &lt;tr&gt;
    &lt;td&gt;Build timestamp&lt;/td&gt;
    &lt;td&gt;{{ now }}&lt;/td&gt;
  &lt;/tr&gt;
  &lt;tr&gt;
    &lt;td&gt;Number of pages&lt;/td&gt;
    &lt;td&gt;{{ len .Site.AllPages }}&lt;/td&gt;
  &lt;/tr&gt;
  &lt;tr&gt;
    &lt;td&gt;Number of sections&lt;/td&gt;
    &lt;td&gt;{{ len .Site.Sections }}&lt;/td&gt;
  &lt;/tr&gt;
  &lt;tr&gt;
    &lt;td&gt;Hugo version&lt;/td&gt;
    &lt;td&gt;{{ hugo.Version }}&lt;/td&gt;
  &lt;/tr&gt;
  &lt;tr&gt;
    &lt;td&gt;Hugo server running&lt;/td&gt;
    &lt;td&gt;{{ .Site.IsServer }}&lt;/td&gt;
  &lt;/tr&gt;
  &lt;tr&gt;
    &lt;td&gt;Drafts visible&lt;/td&gt;
    &lt;td&gt;{{ .Site.BuildDrafts }}&lt;/td&gt;
  &lt;/tr&gt;
  &lt;tr&gt;
    &lt;td&gt;Shell language&lt;/td&gt;
    &lt;td&gt;
      &lt;ul&gt;
        &lt;li&gt;LANG: {{ getenv &#34;LANG&#34; }}&lt;/li&gt;
      &lt;/ul&gt;
    &lt;/td&gt;
  &lt;/tr&gt;
  &lt;tr&gt;
    &lt;td&gt;Build tools&lt;/td&gt;
    &lt;td&gt;
      &lt;ul&gt;
        &lt;li&gt;Hugo: {{ hugo.Version }}&lt;/li&gt;
        &lt;li&gt;Node: {{ getenv &#34;NODE_VERSION&#34; }}&lt;/li&gt;
        &lt;li&gt;Python: {{ getenv &#34;PYTHON_VERSION&#34; }}&lt;/li&gt;
      &lt;/ul&gt;
    &lt;/td&gt;
  &lt;/tr&gt;
  &lt;tr&gt;
    &lt;td&gt;CI Info (&lt;a href=&#34;https://docs.github.com/en/actions/learn-github-actions/environment-variables#default-environment-variables&#34;&gt;Github Actions&lt;/a&gt;)&lt;/td&gt;
    &lt;td&gt;
      &lt;ul&gt;
        &lt;li&gt;CI: {{ getenv &#34;CI&#34; }}&lt;/li&gt;
        &lt;li&gt;Github Action: {{ getenv &#34;GITHUB_ACTION&#34; }}&lt;/li&gt;
        &lt;li&gt;Github Actor: {{ getenv &#34;GITHUB_ACTOR&#34; }}&lt;/li&gt;
        &lt;li&gt;Github Job: {{ getenv &#34;GITHUB_JOB&#34; }}&lt;/li&gt;
        &lt;li&gt;Github Ref: {{ getenv &#34;GITHUB_REF&#34; }}&lt;/li&gt;
        &lt;li&gt;Github Run Attempt: {{ getenv &#34;GITHUB_RUN_ATTEMPT&#34; }}&lt;/li&gt;
        &lt;li&gt;Github Run ID: {{ getenv &#34;GITHUB_RUN_ID&#34; }}&lt;/li&gt;
        &lt;li&gt;Github Run Number: {{ getenv &#34;GITHUB_RUN_NUMBER&#34; }}&lt;/li&gt;
        &lt;li&gt;Github SHA: {{ getenv &#34;GITHUB_SHA&#34; }}&lt;/li&gt;
        &lt;li&gt;Runner Arch: {{ getenv &#34;RUNNER_ARCH&#34; }}&lt;/li&gt;
        &lt;li&gt;Runner OS: {{ getenv &#34;RUNNER_OS&#34; }}&lt;/li&gt;
      &lt;/ul&gt;
    &lt;/td&gt;
  &lt;/tr&gt;
&lt;/table&gt;
{{&lt; /buildinformation.inline &gt;}}
