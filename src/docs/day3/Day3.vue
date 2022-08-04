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
    center: [51.505, -0.09],
    zoom: 13,
  });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}", {
    foo: "bar",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // 創建圖標
  // const greenIcon = L.icon({
  //   iconUrl: "/src/assets/day3-Icons/leaf-green.png",
  //   shadowUrl: "/src/assets/day3-Icons/leaf-shadow.png",

  //   iconSize: [50, 64], // size of the icon
  //   shadowSize: [50, 64], // size of the shadow
  //   iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
  //   shadowAnchor: [4, 62], // the same for the shadow
  //   popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
  // });

  //  L.marker([51.5, -0.09], { icon: greenIcon }).addTo(map);

  //定義圖標
  const LeafIcon = L.Icon.extend({
    options: {
      shadowUrl: "/src/assets/day3-Icons/leaf-shadow.png",
      iconSize: [38, 95],
      shadowSize: [50, 64],
      iconAnchor: [22, 94],
      shadowAnchor: [4, 62],
      popupAnchor: [-3, -76],
    },
  });

  const greenIcon = new LeafIcon({ iconUrl: "/src/assets/day3-Icons/leaf-green.png" });
  const redIcon = new LeafIcon({ iconUrl: "/src/assets/day3-Icons/leaf-red.png" });
  const orangeIcon = new LeafIcon({ iconUrl: "/src/assets/day3-Icons/leaf-orange.png" });

  L.marker([51.5, -0.09], { icon: greenIcon }).addTo(map).bindPopup("I am a green leaf.");
  L.marker([51.495, -0.083], { icon: redIcon }).addTo(map).bindPopup("I am a red leaf.");
  L.marker([51.49, -0.1], { icon: orangeIcon }).addTo(map).bindPopup("I am an orange leaf.");
});
</script>

<style lang="scss" scoped>
.mapContainer {
  height: 600px;
}
</style>
