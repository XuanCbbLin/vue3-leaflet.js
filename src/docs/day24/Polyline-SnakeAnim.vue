<template>
  <!-- map -->
  <div class="h-[100vh]" ref="mapContent"></div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.polyline.snakeanim/L.Polyline.SnakeAnim";

let map = {};
const mapContent = ref(null);

const osmUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const MarkerLatLngs = [
  [25.000994300028957, 121.53076171875001],
  [23.926013033021192, 120.47607421875001],
  [22.243344409235693, 120.71777343750001],
  [23.659619388708066, 121.36047363281251],
  [25.000994300028957, 121.53076171875001],
];

// const line = L.polyline(MarkerLatLngs, { snakingSpeed: 200 });

const route = L.layerGroup(
  [
    L.marker([25.000994300028957, 121.53076171875001]),
    L.polyline([
      [25.000994300028957, 121.53076171875001],
      [23.926013033021192, 120.47607421875001],
    ]),
    L.marker([23.926013033021192, 120.47607421875001]),
  ],
  { snakingPause: 200 }
);

onMounted(() => {
  map = new L.Map(mapContent.value, {
    center: [23.695, 121.102],
    zoom: 8,
  });

  L.tileLayer(osmUrl, {
    maxZoom: 19,
    attribution: attribution,
  }).addTo(map);

  // line.addTo(map);

  route.addTo(map).snakeIn();
});
</script>
