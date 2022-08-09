<template>
  <div class="mapContainer" ref="mapContainer"></div>
</template>

<script setup>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { onMounted, ref } from "vue";

const mapContainer = ref(null);
const markers = [
  L.marker([39.61, -105.02]).bindPopup("This is Littleton, CO."),
  L.marker([39.74, -104.99]).bindPopup("This is Denver, CO."),
  L.marker([39.73, -104.8]).bindPopup("This is Aurora, CO."),
  L.marker([39.77, -105.23]).bindPopup("This is Golden, CO."),
];

const cities = L.layerGroup([...markers]);
const mbAttr =
  'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
const mbUrl =
  "https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/9/106/193?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw";

const streets = L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
  {
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    attribution: mbAttr,
  }
);

const osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
});

const baseMaps = {
  OpenStreetMap: osm,
  "Mapbox Streets": streets,
};

const overlayMaps = {
  Cities: cities,
};

const crownHill = L.marker([39.75, -105.09]).bindPopup("This is Crown Hill Park.");
const rubyHill = L.marker([39.68, -105.0]).bindPopup("This is Ruby Hill Park.");

const parks = L.layerGroup([crownHill, rubyHill]);
const satellite = L.tileLayer(mbUrl, {
  id: "MapID",
  tileSize: 512,
  zoomOffset: -1,
  attribution: mbAttr,
});

onMounted(() => {
  const map = L.map(mapContainer.value, {
    center: [39.73, -104.99],
    zoom: 10,
    layers: [osm, cities],
  });

  const layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);

  layerControl.addBaseLayer(satellite, "Satellite");
  layerControl.addOverlay(parks, "Parks");
});
</script>

<style lang="scss" scoped>
.mapContainer {
  height: 100vh;
}
</style>
