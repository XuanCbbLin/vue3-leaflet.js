<template>
  <div class="flex">
    <div class="w-full" ref="mapContainer"></div>
    <ul class="h-[900px] w-[300px] overflow-y-scroll">
      <li
        class="text-center cursor-pointer px-2 py-3 hover:bg-dark-700 hover:text-light-200"
        v-for="city in cityData.features"
        :key="city"
      >
        {{ city.properties.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { staticData } from "./us-states.js";
import { onMounted, ref, reactive } from "vue";

const mapContainer = ref(null);
const cityData = reactive(JSON.parse(JSON.stringify(staticData)));
let map = {};

onMounted(() => {
  map = L.map(mapContainer.value).setView([37.8, -96], 5);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  L.geoJSON(cityData, {
    style: {
      color: "#e91e63",
      weight: 2,
      fillColor: "#ffeb3b",
    },
  }).addTo(map);
});
</script>
