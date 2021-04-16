---
title: "Retrieving credentials from Jenkins"
date: "2019-07-29T00:00:00+1300"
slug: "retrieving-jenkins-credentials"
category: "blog"
tags:
- "cicd"
- "jenkins"
- "security"
---

Have you ever stored a password in Jenkins, only to forget later on what the value is? You might try logging it from inside an existing job, but you'll find that Jenkins goes out of its way to mask that value from you (and any potential attackers!)

There's a sneaky way to get those credentials out of a Jenkins agent that requires only a little bit of wrangling. It may be possible to lock this down, I haven't looked, so it's good to be aware of it, in order to consider the security implications too.

Find the password you want to get your hands on

{{< figure
  src="credential-view.png"
  link="credential-view.png"
  alt="A screenshot of the Jenkins UI. It is showing the credentials section. It depicts a password entry called 'My super secret password' although no actual credentials are visible."
>}}

Click `Update` which will show you an obscured version of the secret

{{< figure
  src="credential-update.png"
  link="credential-update.png"
  alt="A screenshot of the Jenkins UI progressed from the previous image. Metadata about the selected credential are visible such as scope, ID and description. There is a secret field but it just contains dots like any normal password field does, rather than the actual password text."
>}}

Right click on the `Secret` field and hit `Inspect Element` to bring up the developer tools for your browser

{{< figure
  src="inspect-element.png"
  link="inspect-element.png"
  alt="A screenshot of the Jenkins UI. The user has right clicked on the secret field of the credential metadata. Their browser context menu is visible, invoked by right clicking. The 'Inspect Element' item is highlighted but not yet clicked."
>}}

Either right click on the `value` part of the input field, or double click on the value area and copy the wonky looking hash. It'll be surrounded with braces eg; `{ABC123=}`

{{< figure
  src="credential-hash.png"
  link="credential-hash.png"
  alt="A screenshot of the Firefox browser tools. The user has found the DOM node for the redacted input in the element selector pane. They have right clicked it, bringing up the browser context menu and have highlighted 'Copy attribute value' under the 'Attributes' submenu."
>}}

With that value in your clipboard, go to `/script` eg; `https://jenkins.example.com/script` or from the homepage, visit `Manage Jenkins -> Script Console`

{{< figure
  src="script-console.png"
  link="script-console.png"
  alt="A screenshot of the Jenkins UI. It shows the 'Script Console' page which lives under /script by default."
>}}

Enter the following into the script console: `println(hudson.util.Secret.decrypt('<paste hash here>'))`. Make sure to include the braces and the single quotes. You should see your credential output as seen below

{{< figure
  src="final-result.png"
  link="final-result.png"
  alt="A screenshot of the Jenkins Script Console UI. The user has pasted the copied input from the Firefox browser tools that was open in an earlier screenshot. This input has been wrapped in some Jenkins functions. Below the Script Console is an output area with the actual password of the credential that was previously redacted."
>}}

It's a pretty handy trick, but quite obviously a borderline exploit at the same time. It's up to you to use it responsibly!
