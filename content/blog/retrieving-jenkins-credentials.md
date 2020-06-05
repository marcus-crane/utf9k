+++
title = "Retrieving credentials from Jenkins"
author = ["Marcus Crane"]
date = 2019-07-29
tags = ["cicd", "jenkins", "security"]
draft = false
+++

<div class="ox-hugo-toc toc">
<div></div>

<div class="heading">Table of Contents</div>

- [Find the password you want to get your hands on](#find-the-password-you-want-to-get-your-hands-on)
- [Click `Update` which will show you an obscured version of the secret](#click-update-which-will-show-you-an-obscured-version-of-the-secret)
- [Right click on the `Secret` field and hit `Inspect Element` to bring up the developer tools for your browser](#right-click-on-the-secret-field-and-hit-inspect-element-to-bring-up-the-developer-tools-for-your-browser)
- [Either right click on the `value` part of the input field, or double click on the value area and copy the wonky looking hash. It'll be surrounded with braces eg; `{ABC123=}`](#either-right-click-on-the-value-part-of-the-input-field-or-double-click-on-the-value-area-and-copy-the-wonky-looking-hash-dot-it-ll-be-surrounded-with-braces-eg-abc123)
- [With that value in your clipboard, go to `/script` eg; `https://jenkins.example.com/script` or from the homepage, visit `Manage Jenkins -> Script Console`](#with-that-value-in-your-clipboard-go-to-script-eg-https-jenkins-dot-example-dot-com-script-or-from-the-homepage-visit-manage-jenkins-script-console)
- [Enter the following into the script console: `println(hudson.util.Secret.decrypt('<paste hash here>'))`. Make sure to include the braces and the single quotes. You should see your credential output as seen below](#enter-the-following-into-the-script-console-println--hudson-dot-util-dot-secret-dot-decrypt-paste-hash-here---dot-make-sure-to-include-the-braces-and-the-single-quotes-dot-you-should-see-your-credential-output-as-seen-below)

</div>
<!--endtoc-->

Have you ever stored a password in Jenkins, only to forget later on what the value is? You might try logging it from inside an existing job, but you'll find that Jenkins goes out of its way to mask that value from you (and any potential attackers!)

There's a sneaky way to get those credentials out of a Jenkins agent that requires only a little bit of wrangling. It may be possible to lock this down, I haven't looked, so it's good to be aware of it, in order to consider the security implications too.


## Find the password you want to get your hands on {#find-the-password-you-want-to-get-your-hands-on}

{{< figure src="./img/jenkins-credentials/credential-view.png" >}}


## Click `Update` which will show you an obscured version of the secret {#click-update-which-will-show-you-an-obscured-version-of-the-secret}

{{< figure src="./img/jenkins-credentials/credential-update.png" >}}


## Right click on the `Secret` field and hit `Inspect Element` to bring up the developer tools for your browser {#right-click-on-the-secret-field-and-hit-inspect-element-to-bring-up-the-developer-tools-for-your-browser}

{{< figure src="./img/jenkins-credentials/inspect-element.png" >}}


## Either right click on the `value` part of the input field, or double click on the value area and copy the wonky looking hash. It'll be surrounded with braces eg; `{ABC123=}` {#either-right-click-on-the-value-part-of-the-input-field-or-double-click-on-the-value-area-and-copy-the-wonky-looking-hash-dot-it-ll-be-surrounded-with-braces-eg-abc123}

{{< figure src="./img/jenkins-credentials/credential-hash.png" >}}


## With that value in your clipboard, go to `/script` eg; `https://jenkins.example.com/script` or from the homepage, visit `Manage Jenkins -> Script Console` {#with-that-value-in-your-clipboard-go-to-script-eg-https-jenkins-dot-example-dot-com-script-or-from-the-homepage-visit-manage-jenkins-script-console}

{{< figure src="./img/jenkins-credentials/script-console.png" >}}


## Enter the following into the script console: `println(hudson.util.Secret.decrypt('<paste hash here>'))`. Make sure to include the braces and the single quotes. You should see your credential output as seen below {#enter-the-following-into-the-script-console-println--hudson-dot-util-dot-secret-dot-decrypt-paste-hash-here---dot-make-sure-to-include-the-braces-and-the-single-quotes-dot-you-should-see-your-credential-output-as-seen-below}

{{< figure src="./img/jenkins-credentials/final-result.png" >}}

It's a pretty handy trick, but quite obviously a borderline exploit at the same time. It's up to you to use it responsibly!
