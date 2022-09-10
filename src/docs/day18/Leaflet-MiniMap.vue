<template>
  <!-- map -->
  <div class="h-[100vh]" ref="mapContent"></div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-minimap/src/Control.MiniMap";
import "leaflet-minimap/src/Control.MiniMap.css";

let map = {};
const mapContent = ref(null);

const osmUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';

const osm2 = new L.TileLayer(osmUrl, { attribution: attribution });

onMounted(() => {
  map = new L.Map(mapContent.value, {
    center: [23.695, 121.102],
    zoom: 7,
  });

  L.tileLayer(osmUrl, {
    maxZoom: 19,
    attribution: attribution,
  }).addTo(map);

  const miniMap = new L.Control.MiniMap(osm2, {
    width: "250",
    height: "250",
    toggleDisplay: true,
    collapsedWidth: "30",
    collapsedHeight: "30",
    zoomAnimation: true,
    minimized: true,
  }).addTo(map);

  console.log(miniMap);
});
</script>
