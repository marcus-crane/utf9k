# Why do some of my applications suddenly get muted on Linux?
01 January 0001

I recently ran into this issue when switching my distro to [Manjaro](https://manjaro.org).

I&#39;d find that whenever a different audio source would start playing such as a voice call, notification or even a silent video on the web, my Spotify audio would drop to 0 instantly

In order to fix this, all I needed to do was unload the `module-role-cork` module presumably used by `pulseaudio`

You can toggle via your terminal to test that it works like so:

```shell
&gt; pactl unload-module module-role-cork # disabled, try spotify and another audio source
&gt; pactl load-module module-role-cork   # enabled, spotify should be interrupted
```

While I&#39;m not sure how long `unload-module` persists (I&#39;m guessing until the next restart), you can achieve the same effect by commenting out the module in the configuration for `pulseaudio` like so:

```shell
&gt; grep &#34;cork&#34; /etc/pulse/default.pa -B 3
### Cork music/video streams when a phone stream is active
# Disabling this allows audio streams to run over the top of each other
# Before this, a newer stream (notification, video) would mute Spotify
#load-module module-role-cork
```

Once that&#39;s done, you should be good to go. It seems to work as expected for me anyway.