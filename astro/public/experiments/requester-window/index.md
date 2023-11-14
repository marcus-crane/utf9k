# Requester window
01 January 0001

&lt;p&gt;This experiment prints out the contents of the &lt;code&gt;window&lt;/code&gt; variable for anyone requesting this page.&lt;/p&gt;
  
&lt;p&gt;It&#39;s a tool for myself so I can pop up my website on embedded devices and see what they surface.&lt;/p&gt;

&lt;div id=&#34;environment&#34;&gt;&lt;/div&gt;

&lt;script type=&#34;application/javascript&#34;&gt;
  let environmentBlock = document.getElementById(&#34;environment&#34;)

  let navigatorBlock = document.createElement(&#34;div&#34;)
  let navigatorHeading = document.createElement(&#34;h2&#34;)
  navigatorHeading.innerText = &#34;Navigator&#34;
  navigatorBlock.insertAdjacentElement(&#39;beforeend&#39;, navigatorHeading)
  let navi = document.createElement(&#34;ul&#34;)
  navi.style.marginBottom = &#39;1.5rem&#39;
  for (let item of Object.keys(window.navigator.__proto__)) {
    if (typeof(window.navigator[item]) !== &#34;function&#34; &amp;&amp; typeof(window.navigator[item]) !== &#34;object&#34;) {
      let naviEntry = document.createElement(&#34;li&#34;)
      naviEntry.innerText = `${item}=${window.navigator[item]}`
      navi.insertAdjacentElement(&#39;beforeend&#39;, naviEntry)
    }
  }
  navigatorBlock.append(navi)
  environmentBlock.insertAdjacentElement(&#39;beforeend&#39;, navigatorBlock)

  const localStorage = JSON.stringify(window.localStorage)
  const lsBlock = document.createElement(&#34;div&#34;)
  lsBlock.style.marginBottom = &#39;1.5rem&#39;
  let lsHeading = document.createElement(&#34;h2&#34;)
  lsHeading.innerText = &#34;Local Storage (JSON serialised)&#34;
  lsBlock.insertAdjacentElement(&#39;beforeend&#39;, lsHeading)
  const lsCode = document.createElement(&#34;code&#34;)
  lsCode.innerText = localStorage
  lsBlock.insertAdjacentElement(&#39;beforeend&#39;, lsCode)
  environmentBlock.insertAdjacentElement(&#39;beforeend&#39;, lsBlock)

  let locationBlock = document.createElement(&#34;div&#34;)
  let locationHeading = document.createElement(&#34;h2&#34;)
  locationHeading.innerText = &#34;Location&#34;
  locationBlock.insertAdjacentElement(&#39;beforeend&#39;, locationHeading)
  let loc = document.createElement(&#34;ul&#34;)
  loc.style.marginBottom = &#39;1.5rem&#39;
  for (let item of Object.keys(window.location)) {
    if (typeof(window.location[item]) !== &#34;function&#34; &amp;&amp; typeof(window.location[item]) !== &#34;object&#34;) {
      let locEntry = document.createElement(&#34;li&#34;)
      locEntry.innerText = `${item}=${window.location[item]}`
      loc.insertAdjacentElement(&#39;beforeend&#39;, locEntry)
    }
  }
  locationBlock.append(loc)
  environmentBlock.insertAdjacentElement(&#39;beforeend&#39;, locationBlock)

  let screenBlock = document.createElement(&#34;div&#34;)
  let screenHeading = document.createElement(&#34;h2&#34;)
  screenHeading.innerText = &#34;Screen&#34;
  screenBlock.insertAdjacentElement(&#39;beforeend&#39;, screenHeading)
  let s = document.createElement(&#34;ul&#34;)
  s.style.marginBottom = &#39;1.5rem&#39;
  for (let item of Object.keys(window.screen.__proto__)) {
    if (typeof(window.screen[item]) !== &#34;function&#34; &amp;&amp; typeof(window.screen[item]) !== &#34;object&#34;) {
      let screenEntry = document.createElement(&#34;li&#34;)
      screenEntry.innerText = `${item}=${window.screen[item]}`
      s.insertAdjacentElement(&#39;beforeend&#39;, screenEntry)
    }
  }
  screenBlock.append(s)
  environmentBlock.insertAdjacentElement(&#39;beforeend&#39;, screenBlock)

  let ipBlock = document.createElement(&#34;div&#34;)
  let ipHeading = document.createElement(&#34;h2&#34;)
  ipHeading.innerText = &#34;IP Info&#34;
  ipBlock.insertAdjacentElement(&#39;beforeend&#39;, ipHeading)
  let i = document.createElement(&#34;code&#34;)
  fetch(&#34;https://api.ipinfodb.com/v3/ip-city/?key=402383f5158c20d3af9b1694f85d0aa2e6067727537dc9f9d741e0b1f3c9f1d5&amp;format=json&#34;)
    .then(res =&gt; res.json())
    .then(data =&gt; {
      i.innerText = JSON.stringify(data)
    })
    .catch(err =&gt; console.log(err))
  ipBlock.append(i)
  environmentBlock.insertAdjacentElement(&#39;beforeend&#39;, ipBlock)

&lt;/script&gt;