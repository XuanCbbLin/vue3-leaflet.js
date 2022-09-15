<template>
  <!-- map -->
  <div class="h-[100vh]" ref="mapContent"></div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/leaflet.markercluster";
import "leaflet.markercluster/dist/markercluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

let map = {};
const mapContent = ref(null);

const osmUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const markers = L.markerClusterGroup();

const addressPoints = [
  [-37.8210922667, 175.2209316333, "2"],
  [-37.8210819833, 175.2213903167, "3"],
  [-37.8210881833, 175.2215004833, "3A"],
  [-37.80970685, 175.2221815833, "178"],
  [-37.8102146667, 175.2211562833, "190"],
  [-37.8088037167, 175.2242227, "156"],
];

for (let i = 0; i < addressPoints.length; i++) {
  const address = addressPoints[i];
  const title = address[2];
  const marker = L.marker(new L.LatLng(address[0], address[1]), { title: title });
  marker.bindPopup(title);
  markers.addLayer(marker);
}

onMounted(() => {
  map = new L.Map(mapContent.value, {
    center: [-37.82, 175.24],
    zoom: 13,
  });

  L.tileLayer(osmUrl, {
    maxZoom: 19,
    attribution: attribution,
  }).addTo(map);

  map.addLayer(markers);
});
</script>
