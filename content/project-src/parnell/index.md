---
title: "Parnell"
slug: "parnell"
includes_js: true
extra_js:
  - "https://api.mapbox.com/mapbox-gl-js/v2.2.0/mapbox-gl.js"
includes_css: true
extra_css:
  - "https://api.mapbox.com/mapbox-gl-js/v2.2.0/mapbox-gl.css"
---

<div id="map"></div>
<div id="console">
  <h1>Issued Parking tickets (Parnell)</h1>
  <p>Source: <a href="https://fyi.org.nz/request/8643-request-for-parking-ticket-data-for-the-parnell-area">Auckland Transport</a></p>
  <div class="session">
    <h2>Tickets</h2>
    <div class="row colors"></div>
    <div class="row labels">
      <div class="label">0</div>
      <div class="label">10</div>
      <div class="label">20</div>
      <div class="label">30</div>
      <div class="label">40</div>
      <div class="label">50</div>
    </div>
  </div>
  <div class="session" id="sliderbar">
    <h2>Hour: <label for="slider" id="active-hour">12PM</label></h2>
    <input id="slider" class="row" type="range" min="0" max="23" step="1" value="12" autocomplete="off" />
  </div>
  <div class="session">
    <h2>Day of the week</h2>
    <div class="row" id="filters">
      <input id="monday" type="radio" name="toggle" value="monday" autocomplete="off">
      <label for="monday">Mon</label>
      <input id="tuesday" type="radio" name="toggle" value="tuesday" autocomplete="off">
      <label for="tuesday">Tue</label>
      <input id="wednesday" type="radio" name="toggle" value="wednesday" autocomplete="off">
      <label for="wednesday">Wed</label>
      <input id="thursday" type="radio" name="toggle" value="thursday" autocomplete="off">
      <label for="thursday">Thu</label>
      <input id="friday" type="radio" name="toggle" value="friday" autocomplete="off">
      <label for="friday">Fri</label>
      <!-- <input id="sat" type="radio" name="toggle" value="sat" autocomplete="off">
      <label for="sat">Sat</label>
      <input id="sun" type="radio" name="toggle" value="sun" autocomplete="off">
      <label for="sun">Sun</label> -->
    </div>
  </div>
</div>


