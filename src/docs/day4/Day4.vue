<template>
  <div class="mapContainer" ref="mapContainer"></div>
</template>

<script setup>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { onMounted, ref } from "vue";

const mapContainer = ref(null);

onMounted(() => {
  const map = L.map(mapContainer.value, {
    center: [25.03388, 121.56531],
    zoom: 19,
  });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  const circle = L.circle([25.03388, 121.56531], {
    color: "red",
    fillColor: "red",
    fillOpacity: 0.5,
    radius: 2,
  })
    .addTo(map)
    .bindPopup("[25.03388, 121.56531]")
    .openPopup();

  // 創建圖標
  const greenIcon = L.icon({
    iconUrl: "/src/assets/day3-Icons/leaf-green.png",
    shadowUrl: "/src/assets/day3-Icons/leaf-shadow.png",

    iconSize: [38, 95], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 75], // the same for the shadow
    popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
  });

  L.marker([25.03388, 121.56531], { icon: greenIcon })
    .addTo(map)
    .bindPopup("[25.03388, 121.56531]");

  // 定義圖標
  // const LeafIcon = L.Icon.extend({
  //   options: {
  //     shadowUrl: "/src/assets/day3-Icons/leaf-shadow.png",
  //     iconSize: [38, 95],
  //     shadowSize: [50, 64],
  //     iconAnchor: [22, 94],
  //     shadowAnchor: [4, 62],
  //     popupAnchor: [-3, -76],
  //   },
  // });

  // const greenIcon = new LeafIcon({ iconUrl: "/src/assets/day3-Icons/leaf-green.png" });
  // const redIcon = new LeafIcon({ iconUrl: "/src/assets/day3-Icons/leaf-red.png" });
  // const orangeIcon = new LeafIcon({ iconUrl: "/src/assets/day3-Icons/leaf-orange.png" });

  // L.marker([25.03388, 121.56531], { icon: greenIcon }).addTo(map).bindPopup("I am a green leaf.");
  // L.marker([25.033, 121.56531], { icon: redIcon }).addTo(map).bindPopup("I am a red leaf.");
  // L.marker([25.0334, 121.564], { icon: orangeIcon }).addTo(map).bindPopup("I am an orange leaf.");
});
</script>

<style lang="scss" scoped>
.mapContainer {
  height: 600px;
}
</style>
