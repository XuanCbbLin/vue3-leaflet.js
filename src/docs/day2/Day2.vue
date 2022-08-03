<template>
  <div class="mapContainer" ref="mapContainer"></div>
</template>

<script setup>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { nextTick, onMounted, ref } from "vue";

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

  // 新增標記
  const marker = L.marker([51.5, -0.09], {
    draggable: true,
  }).addTo(map);

  // draggable: 設定圖標是否可拖曳,預設false

  // 地圖上新增圓形圖標
  const circle = L.circle([51.505, -0.11], {
    color: "blue",
    fillColor: "green",
    fillOpacity: 0.1,
    radius: 500,
  }).addTo(map);

  // const option = {
  //   color: "圓形錨邊顏色",
  //   fillColor: "圓形的填充色",
  //   fillOpacity: "填充色透明度",
  //   radius: "圓形的半徑",
  // };

  // 如果想添加訊息到圖標上leaflet 也有api 能設定
  // 如果 bindPopup 後面沒加openPopup() 訊息會隱藏,需要點擊才會出現
  marker.bindPopup("<b>Hello world!</b><br>I am a popup.");

  // 加上openPopup()
  // marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

  // 地圖監聽事件
  const popup = L.popup();

  map.addEventListener("click", (e) => {
    popup
      .setLatLng(e.latlng)
      .setContent("You clicked the map at " + e.latlng.toString())
      .openOn(map);
  });
});
</script>

<style lang="scss" scoped>
.mapContainer {
  height: 600px;
}
</style>
