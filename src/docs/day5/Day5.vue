<template>
  <div class="mapContainer" ref="mapContainer"></div>
</template>

<script setup>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { onMounted, ref } from "vue";
import { statesData } from "../day5/us-states";

const mapContainer = ref(null);

onMounted(() => {
  var map = L.map(mapContainer.value).setView([37.8, -96], 4);

  var tiles = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  /* global statesData */
  var geojson = L.geoJson(statesData).addTo(map);
});
</script>

<style lang="scss" scoped>
.mapContainer {
  height: 600px;
}
</style>
