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
    zoomSnap: 0.25,
  });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // L.Control.Scale
  // L.control
  //   .scale({
  //     maxWidth: 200,
  //     updateWhenIdle: true,
  //     position: "topright",
  //   })
  //   .addTo(map);

  // setView(center, zoom)
  map.setView([23.611, 120.768], 8);

  // flyTo(center, zoom)
  // map.flyTo([24.27701247166408, 120.96496582031251], 14);

  // zoomIn()/zoomIn(delta)
  // map.zoomIn(0.5);

  // zoomOut()/zoomOut(delta)
  // map.zoomOut(3);

  map.on("click", () => {
    map.zoomIn(0.1);
  });
});
</script>

<style lang="scss" scoped>
.mapContainer {
  height: 100vh;
}
</style>
