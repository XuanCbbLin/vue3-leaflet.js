<template>
  <div class="h-[100vh]" ref="mapContent"></div>
  <button @click="startDraw">畫圖</button>
</template>

<script setup>
import { onMounted, ref } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw";
import "leaflet-draw/dist/leaflet.draw.css";

let map = {};
const mapContent = ref(null);

const osmUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';

let drawRectangle = null;

onMounted(() => {
  map = new L.Map(mapContent.value, {
    center: [23.695, 121.102],
    zoom: 7,
  });

  L.tileLayer(osmUrl, {
    maxZoom: 19,
    attribution: attribution,
  }).addTo(map);

  const drawnItems = new L.FeatureGroup();
  map.addLayer(drawnItems);

  drawRectangle = new L.Draw.Rectangle(map);

  drawRectangle.setOptions({
    showArea: false,
  });

  map.on("draw:created", function (e) {
    console.log(e);
    const layer = e.layer;
    map.addLayer(layer);
  });
});

const startDraw = () => {
  drawRectangle.enable();
};
</script>
