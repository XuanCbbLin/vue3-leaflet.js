<template>
  <div class="flex">
    <div class="w-full" ref="mapContainer"></div>
    <Menu
      :currentCityId="currentCityId"
      :cityData="cityData"
      @setAreaHighlight="setAreaHighlight"
      @resetAreaHighlight="resetAreaHighlight"
    />
  </div>
</template>

<script setup>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Menu from "./Menu.vue";
import { cityData } from "./us-states.js";
import { onMounted, ref } from "vue";

const mapContainer = ref(null);
const currentCityId = ref("");

let geoJSON = [];
let map = {};

const getFilterArea = (city) => {
  return geoJSON.getLayers().filter((area) => {
    return area.feature.properties.name === city.properties.name;
  });
};

const setAreaHighlight = (city) => {
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

    currentCityId.value = e.target.feature.id;
  });

  layer.addEventListener("mouseout", (e) => {
    geoJSON.resetStyle(e.target);

    currentCityId.value = "";
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
