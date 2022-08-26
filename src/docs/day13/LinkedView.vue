<template>
  <div class="flex">
    <div class="w-full" ref="mapContainer"></div>
    <ul class="h-[900px] w-[300px] overflow-y-scroll">
      <li
        class="text-center cursor-pointer px-2 py-3 hover:bg-dark-700 hover:text-light-200"
        :class="currentCity === city.id ? 'bg-dark-700 text-white' : ''"
        v-for="city in cityData.features"
        :key="city"
        @mouseover="areaHighlight(city)"
        @mouseout="resetAreaHighlight(city)"
      >
        {{ city.properties.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { cityData } from "./us-states.js";
import { onMounted, ref } from "vue";

const mapContainer = ref(null);
const currentCity = ref("");
let geoJSON = [];
let map = {};

const getFilterArea = (city) => {
  return geoJSON.getLayers().filter((area) => {
    return area.feature.properties.name === city.properties.name;
  });
};

const areaHighlight = (city) => {
  getFilterArea(city)[0].setStyle({
    weight: 4,
    fillOpacity: 0.7,
  });
};

const resetAreaHighlight = (city) => {
  geoJSON.resetStyle(getFilterArea(city)[0]);
};

const onEachFeature = (feature, layer) => {
  layer.addEventListener("mouseover", (e) => {
    e.target.setStyle({
      weight: 4,
      fillOpacity: 0.7,
    });

    currentCity.value = e.target.feature.id;
  });

  layer.addEventListener("mouseout", (e) => {
    geoJSON.resetStyle(e.target);

    currentCity.value = "";
  });
};

onMounted(() => {
  map = L.map(mapContainer.value).setView([53.8, -110], 4);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  geoJSON = L.geoJSON(cityData, {
    style: {
      color: "#e91e63",
      weight: 2,
      fillColor: "#ffeb3b",
      fillOpacity: 0.15,
    },
    onEachFeature: onEachFeature,
  });

  geoJSON.addTo(map);
});
</script>
