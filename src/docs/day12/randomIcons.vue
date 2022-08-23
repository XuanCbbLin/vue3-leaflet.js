<template>
  <div ref="mapContent" class="h-[100vh]"></div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const mapContent = ref(null);

const getRandom = (min, max) => {
  return Math.random() * (max - min) + min;
};

onMounted(() => {
  const map = L.map(mapContent.value).setView([23.695, 121.102], 8);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  for (let i = 0; i < 20; i++) {
    const latitude = getRandom(22, 25);
    const longtitude = getRandom(120, 122);
    const marker = L.marker([latitude, longtitude]);

    marker.bindPopup(`${latitude} , ${longtitude}`).openPopup();

    marker.on("click", () => {
      map.flyTo([latitude, longtitude], 9);
    });

    marker.addTo(map);
  }
});
</script>
