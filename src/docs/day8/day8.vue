<template>
  <div class="mapContainer" ref="mapContainer"></div>
</template>

<script setup>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { onMounted, ref } from "vue";

const mapContainer = ref(null);

onMounted(() => {
  const map = L.map(mapContainer.value, {
    center: [23.611, 120.768],
    zoom: 8,
    zoomSnap: 0.5,
  });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // L.Control.Scale
  L.control
    .scale({
      maxWidth: 100,
      updateWhenIdle: false,
      position: "bottomright",
    })
    .addTo(map);

  // setView(center, zoom)
  // map.setView([53, 123]);

  // flyTo(center, zoom)
  // map.flyTo([0, 0]);

  // zoomIn()/zoomIn(delta)
  // map.zoomIn(3);

  // zoomOut()/zoomOut(delta)
  // map.zoomOut(3);
});
</script>

<style lang="scss" scoped>
.mapContainer {
  height: 100vh;
}
</style>
