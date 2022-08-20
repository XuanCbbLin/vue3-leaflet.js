<template>
  <div class="mapContainer" ref="mapContainer">
    <svg viewBox="0 0 200 200" ref="svg">
      <rect width="200" height="200"></rect>
      <rect x="75" y="23" width="50" height="50" fill="red"></rect>
      <rect x="75" y="123" width="50" height="50" fill="#0013ff"></rect>
    </svg>
  </div>
</template>

<script setup>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { onMounted, ref } from "vue";

const mapContainer = ref(null);
const svg = ref(null);
const latLngBounds = L.latLngBounds([
  [32, -130],
  [13, -100],
]);

onMounted(() => {
  const map = L.map(mapContainer.value);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  map.fitBounds(latLngBounds);

  L.svgOverlay(svg.value, latLngBounds, {
    opacity: 0.7,
    interactive: true,
  }).addTo(map);
});
</script>

<style lang="scss" scoped>
.mapContainer {
  height: 100vh;
}
</style>
