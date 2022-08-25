<template>
  <div class="h-[100vh]" ref="mapContainer"></div>
</template>

<script setup>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { addressPoints } from "./addressPoints";
import { onMounted, ref } from "vue";

const mapContainer = ref(null);
const markers = L.markerClusterGroup();

onMounted(() => {
  const map = L.map(mapContainer.value, {
    center: [-37.82, 175.24],
    zoom: 13,
  });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  for (let i = 0; i < addressPoints.length; i++) {
    const feature = addressPoints[i];
    const title = feature[2];
    const marker = L.marker(new L.LatLng(feature[0], feature[1]), { title: title });
    marker.bindPopup(title);
    markers.addLayer(marker);
  }

  map.addLayer(markers);
});
</script>
