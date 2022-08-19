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
    center: [23.611, 120.768],
    zoom: 8,
  });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // L.marker
  const marker = L.marker([23.465766, 120.448608], {
    draggable: true,
  }).addTo(map);

  // L.circle
  const circle = L.circle([23.438049, 121.184692], {
    color: "blue",
    fillColor: "green",
    fillOpacity: 0.5,
    radius: 12000,
  }).addTo(map);

  // L.polygon
  const polygon = L.polygon(
    [
      [22.687518, 121.449051],
      [22.687518, 121.558914],
      [22.585485, 121.558914],
      [22.585485, 121.449051],
    ],
    {
      color: "#873324",
    }
  ).addTo(map);

  // 圖標上添加訊息

  // 1. 直接在圖標上使用bindPopup()設定要顯示的內容
  marker.bindPopup("<b>Hello world!</b><br>I am a marker.").openPopup();
  circle.bindPopup("<b>Hello world!</b><br>I am a circle.");

  // 2. 除了在圖標上顯示訊息，也可以在自己設定的經緯度顯示訊息
  L.popup().setLatLng([23.800424, 121.1187742]).setContent("I am a standalone popup.").openOn(map);

  // 地圖監聽事件
  const popup = L.popup();
  map.on("click", (e) => {
    console.log(e.latlng);
    popup
      .setLatLng(e.latlng)
      .setContent("You clicked the map at " + e.latlng.toString())
      .openOn(map);
  });
});
</script>

<style lang="scss" scoped>
.mapContainer {
  height: 100vh;
}
</style>
