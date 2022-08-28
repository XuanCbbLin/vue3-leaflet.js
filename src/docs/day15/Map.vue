<template>
  <div class="h-[100vh]" ref="mapContent"></div>
</template>

<script setup>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { ref, onMounted, watch } from "vue";

const props = defineProps({
  dom: Object,
});

let map = {};
const mapContent = ref(null);
const icon = L.icon({
  iconUrl: "/src/assets/day14-icon/maps-and-flags.png",
  iconSize: [60, 60],
  iconAnchor: [30, 60],
  popupAnchor: [0, -60],
});

const customOptions = {
  minWidth: "300",
};

let marker = {};

onMounted(() => {
  map = L.map(mapContent.value).setView([23.695, 121.102], 8);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  marker = L.marker([23.58412603264412, 120.83038330078126], { icon }).bindPopup("", customOptions);

  marker.addTo(map).openPopup();
});

watch(
  () => props.dom,
  (newDom) => {
    marker.bindPopup(newDom);
  }
);
</script>
