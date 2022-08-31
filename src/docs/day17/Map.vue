<template>
  <div class="h-full" ref="mapContent"></div>
</template>

<script setup>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { ref, onMounted } from "vue";
import { geoData } from "./map.js";

let map = {};
const mapContent = ref(null);
const polyLineLatLng = [];

onMounted(() => {
  map = L.map(mapContent.value, { center: [23.695, 121.102], zoom: 8, zoomControl: false });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  geoData.features.forEach((obj) => {
    polyLineLatLng.push([obj.geometry.coordinates[1], obj.geometry.coordinates[0]]);
  });

  L.control.zoom({ position: "topright" }).addTo(map);

  L.geoJSON(geoData).addTo(map);

  L.polyline([polyLineLatLng], {
    color: "red",
    weight: 2,
  }).addTo(map);
});
</script>
