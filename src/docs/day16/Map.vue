<template>
  <div class="w-full h-full" ref="mapContent"></div>
</template>

<script setup>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { ref, onMounted } from "vue";

let map = {};
const mapContent = ref(null);

onMounted(() => {
  map = L.map(mapContent.value, { center: [23.695, 121.102], zoom: 8, zoomControl: false });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  L.control.zoom({ position: "topright" }).addTo(map);
});
</script>

<style scoped></style>
