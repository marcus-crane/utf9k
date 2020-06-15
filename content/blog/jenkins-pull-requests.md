+++
title = "Creatively hacking Jenkins to preview pull request artifacts"
author = ["Marcus Crane"]
date = 2020-06-15
tags = ["jenkins"]
draft = false
+++

<div class="ox-hugo-toc toc">
<div></div>

<div class="heading">Table of Contents</div>

- [The scenario](#the-scenario)
- [The tl;dr](#the-tl-dr)
- [The prerequsities](#the-prerequsities)
- [The pipeline step](#the-pipeline-step)
- [The step where we see our results](#the-step-where-we-see-our-results)

</div>
<!--endtoc-->

This is a bit of a niche thing that probably isn't helpful to anyone. I also wouldn't recommend you do this at all.

Let me outline the situation that lead us down this route.


## The scenario {#the-scenario}

We have a React application in house that uses Okta. For those unfamiliar, it's an [OIDC](https://www.okta.com/openid-connect/) provider. In short, you have one account that you can log into everything with.

Anyway, one of the annoying things about it is that when you define your redirect uri, it [has to be absolute uri](https://tools.ietf.org/html/rfc6749#section-3.1.2)

That rules out the possibility of having a url like `https://pr-123.internal.blah`

Well, that leaves things dead in the water.

Hmm, if you think about it, Jenkins builds everything and has an absolute uri `https://jenkins.internal.blah`

If you could save artifacts, in this case an HTML file that executes Javasript, then naturally that artifact would still have a static, absolute uri you could reference, right?

In our case, it didn't quite work as all of our links look like this: `<Link to='/home'>Home</Link>`

The problem with that is, clicking any button will jump you to the root of the domain, navigating back into Jenkins itself.

Having said all that, it is possible to use this "solution" to render arbitrary HTML and JS


## The tl;dr {#the-tl-dr}

The short version is that we ended up using [HTML Publisher](https://plugins.jenkins.io/htmlpublisher/) to publish our files under the `Artifacts` tab of our test build

It was originally designed for HTML reports but can be used for anything I suppose.


## The prerequsities {#the-prerequsities}

First, you'll need to install the [HTML Publisher](https://plugins.jenkins.io/htmlpublisher/) plugin.

If you're just rendering plain HTML and CSS, you're good to go as far as setup goes. You can move onto the pipeline configuration step.

If you're rendering inline JS and/or external CSS, you'll need to open up Jenkins CSP headers.

I recommend applying these temporarily using [Jenkins Script Console](https://www.jenkins.io/doc/book/managing/script-console/). To get them to persist, you'll need to bake them into your master node which... I didn't get far enough into this hell exercise to even look into

That aside, two handy routes are the Jenkins wiki page on [Configuring Content Security Policy](https://wiki.jenkins.io/display/JENKINS/Configuring+Content+Security+Policy) as well as the MDN page on [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

In short, the following can be run in the Script Console to set a CSP header:

```groovy
System.setProperty("hudson.model.DirectoryBrowserSupport.CSP", "<csp_header_here>")
```

while the following will set it back to the default:

```groovy
System.clearProperty("hudson.model.DirectoryBrowserSupport.CSP")
```

If you're using inline Javascript (either a script tag or a link to a file hosted on the same domain), you'll need to add the `'unsafe-inline'` option like so:

```groovy
System.setProperty("hudson.model.DirectoryBrowserSupport.CSP", "default-src 'self'; img-src 'self'; style-src 'self' 'unsafe-inline';")
```

With that done, you should be set up to start rendering some files.


## The pipeline step {#the-pipeline-step}

I don't really know my way around configuring Jenkins with the GUI so I'm only going to be outlining what to add to a `Jenkinsfile`

Let's say upon every pull request, you wanted to publish a Hugo static site.

For those unfamiliar, it spits out a `public` folder containing static HTML and CSS.

In that case, we'd want a build step like so:

```groovy
// ... rest of my pipeline
stage("Publish preview") {
  when {
    branch 'PR-*'
  }
  steps {
    sh "hugo" // generates a folder called 'public' containing static files
    publishHTML(
      target: [
        allowMissing: false,
        alwaysLinkToLastBuild: true,
        keepAll: true,
        reportDir: 'public',
        reportFiles: 'index.html',
        reportName: 'Pull Request Preview',
        reportTitles: 'Pull Request Preview'
      ]
    )
  }
}
// ... rest of my pipeline
```

Pushing that to a branch, and opening a pull request, should run that pipeline addition and generate your first build preview


## The step where we see our results {#the-step-where-we-see-our-results}

You can see your artifacts in one of two places depending on your UI:

Under `Blue Ocean`, navigate to the most recent build ie `https://jenkins.internal.blah/blue/organizations/jenkins/MyOrg%2FMyRepo/detail/PR-123/1/pipeline/`

You'll see an Artifacts button in the top right and clicking it should show a link with the name of your "report"

Click on it, and if everything is set up correct, it should open your "report" in a new tab.

It'll appear in an iFrame but you can append `index.html` on the end of the URL to go directly to the page itself.

Similarly, in `Classic UI`, you should see the name of the report in the left sidebar. I don't use classic UI so I don't know if it just magically appears along with other artifacts like it seemed to.
