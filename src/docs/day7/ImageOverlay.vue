<template>
  <div class="mapContainer" ref="mapContainer"></div>
</template>

<script setup>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { onMounted, ref } from "vue";

const mapContainer = ref(null);
const imageUrl = "https://maps.lib.utexas.edu/maps/historical/newark_nj_1922.jpg";
const errorOverlayUrl = "https://cdn-icons-png.flaticon.com/512/110/110686.png";
const altText =
  "Image of Newark, N.J. in 1922. Source: The University of Texas at Austin, UT Libraries Map Collection.";
const latLngBounds = L.latLngBounds([
  [40.799311, -74.118464],
  [40.68202047785919, -74.33],
]);

onMounted(() => {
  const map = L.map(mapContainer.value).setView([37.8, -96], 4);
  const osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  const imageOverlay = L.imageOverlay(imageUrl, latLngBounds, {
    opacity: 0.8,
    errorOverlayUrl: errorOverlayUrl,
    alt: altText,
    interactive: true,
  }).addTo(map);

  L.rectangle(latLngBounds).addTo(map);
  map.fitBounds(latLngBounds);
});
</script>

<style lang="scss" scoped>
.mapContainer {
  height: 100vh;
}
</style>
