window.mapboxgl.accessToken =
  "pk.eyJ1IjoibWFyY3VzLWNyYW5lIiwiYSI6ImNqN3loaHNvdzQ0YzAzM3FyNW1mMndrMXoifQ.b7E6hbK1eDrXOQVrwnc8zQ";

const lightStyle = "mapbox://styles/mapbox/light-v9";
const darkStyle = "mapbox://styles/mapbox/dark-v9";

let defaultStyle = lightStyle;

if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  defaultStyle = darkStyle;
}

let map = new window.mapboxgl.Map({
  container: "map",
  style: defaultStyle,
  center: [174.789296, -36.860538],
  zoom: 14,
});

function buildMapLayer() {
  let filterHour = ["==", ["number", ["get", "hour"]], 12];
  let filterDay = ["!=", ["string", ["get", "day"]], "placeholder"];
  const parkingLayer = {
    id: "tickets",
    type: "line",
    source: {
      type: "geojson",
      data: "/project-src/parnell/streets.geojson",
    },
    paint: {
      "line-color": [
        "interpolate",
        ["linear"],
        ["number", ["get", "tickets"]],
        0,
        "#2DC4B2",
        10,
        "#3BB3C3",
        20,
        "#668EC4",
        30,
        "#8B88B6",
        40,
        "#A2719B",
        50,
        "#AA5E79",
      ],
      "line-opacity": 0.8,
      "line-width": 5,
    },
    layout: {
      "line-cap": "round",
    },
    filter: ["all", filterHour, filterDay],
  };

  map.addLayer(parkingLayer, "admin-2-boundaries-dispute");

  document.getElementById("slider").addEventListener("input", function (e) {
    let hour = parseInt(e.target.value);

    filterHour = ["==", ["number", ["get", "hour"]], hour];
    map.setFilter("tickets", ["all", filterHour, filterDay]);

    let ampm = hour >= 12 ? "PM" : "AM";
    let hour12 = hour % 12 ? hour % 12 : 12;

    document.getElementById("active-hour").innerText = hour12 + ampm;
  });

  document.getElementById("filters").addEventListener("change", function (e) {
    let day = e.target.value;

    if (day === "all") {
      filterDay = ["!=", ["string", ["get", "day"]], "placeholder"];
    } else {
      filterDay = ["==", ["string", ["get", "day"]], day];
    }
    map.setFilter("tickets", ["all", filterHour, filterDay]);
  });
}

map.on("load", function () {
  buildMapLayer();
});

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", () => {
    // Changing the map style would clear the actual data and I had no luck resolving it.
    // Let me know if you have any idea how I can fix this!
    location.reload();
  });
