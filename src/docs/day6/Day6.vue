<template>
  <div class="mapContainer" ref="mapContainer"></div>
</template>

<script setup>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { onMounted, ref } from "vue";
import { statesData } from "../day5/us-states";

const mapContainer = ref(null);
let map = null;
let geojson = null;

// 依照人口密度大小取得顏色
const getColor = (density) => {
  return density > 1000
    ? "#800026"
    : density > 500
    ? "#BD0026"
    : density > 200
    ? "#E31A1C"
    : density > 100
    ? "#FC4E2A"
    : density > 50
    ? "#FD8D3C"
    : density > 20
    ? "#FEB24C"
    : density > 10
    ? "#FED976"
    : "#FFEDA0";
};

// 設定每個區塊的樣式
const style = (feature) => {
  return {
    fillColor: getColor(feature.properties.density),
    weight: 2,
    opacity: 1,
    color: "white",
    dashArray: "3",
    fillOpacity: 0.7,
  };
};

const zoomToFeature = (e) => {
  map.fitBounds(e.target.getBounds());
};

const onEachFeature = (feature, layer) => {
  layer.on("mouseover", highlightFeature);
  layer.on("mouseout", resetHighlight);
  layer.on("click", zoomToFeature);
};

const highlightFeature = (e) => {
  const layer = e.target;

  layer.setStyle({
    weight: 5,
    color: "#666",
    dashArray: "",
    fillOpacity: 0.7,
  });

  layer.bringToFront();
};

const resetHighlight = (e) => {
  geojson.resetStyle(e.target);
};

onMounted(() => {
  map = L.map(mapContainer.value).setView([37.8, -96], 4);

  const tiles = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  geojson = L.geoJson(statesData, {
    style: style,
    onEachFeature: onEachFeature,
  }).addTo(map);
});
</script>

<style lang="scss" scoped>
.mapContainer {
  height: 600px;
}
</style>
