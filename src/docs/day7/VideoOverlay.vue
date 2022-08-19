<template>
  <div class="mapContainer" ref="mapContainer">
    <div class="absolute z-500 top-5 right-3">
      <div class="text-xl mb-2" @click="videoPause">⏸</div>
      <div class="text-xl" @click="videoPlay">▶️</div>
    </div>
  </div>
</template>

<script setup>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { onMounted, ref } from "vue";

const mapContainer = ref(null);

const videoUrls = [
  "https://www.mapbox.com/bites/00188/patricia_nasa.webm",
  "https://www.mapbox.com/bites/00188/patricia_nasa.mp4",
];
const errorOverlayUrl = "https://cdn-icons-png.flaticon.com/512/110/110686.png";
const bounds = L.latLngBounds([
  [32, -130],
  [13, -100],
]);

let videoOverlay = {};

onMounted(() => {
  const map = L.map(mapContainer.value);
  const tiles = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  map.fitBounds(bounds);

  videoOverlay = L.videoOverlay(videoUrls, bounds, {
    opacity: 1,
    errorOverlayUrl: errorOverlayUrl,
    interactive: true,
    autoplay: true,
    muted: true,
    loop: false,
  }).addTo(map);
});

const videoPause = () => {
  videoOverlay.getElement().pause();
};

const videoPlay = () => {
  videoOverlay.getElement().play();
};
</script>

<style lang="scss" scoped>
.mapContainer {
  height: 100vh;
}
</style>
