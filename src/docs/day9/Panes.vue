<template>
  <div class="h-[100vh]" ref="mapContainer"></div>
</template>

<script setup>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { euCountries } from "./euCountries";
import { onMounted, ref } from "vue";

const mapContainer = ref(null);

onMounted(() => {
  const map = L.map(mapContainer.value);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png", {
    attribution: "©OpenStreetMap, ©CartoDB",
  }).addTo(map);

  map.setView({ lat: 47.040182144806664, lng: 9.667968750000002 }, 4);

  //   /* global euCountries */
  //   L.geoJson(euCountries).addTo(map);

  map.createPane("labels");

  L.tileLayer("http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png", {
    attribution: "©OpenStreetMap, ©CartoDB labels",
    // pane: "labels",
  }).addTo(map);
});
</script>

<style lang="scss" scoped></style>
