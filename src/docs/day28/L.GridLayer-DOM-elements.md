###### tags: `鐵人賽`

# day28 L.GridLayer 和 DOM

昨天介紹 L.TileLayer 建立圖層，今天要介紹另一種方式 L.GridLayer

- L.GridLayer.DebugCoords : 建立網格座標
- L.gridLayer.debugCoords : 接收網格座標資料

```javascript!
L.GridLayer.DebugCoords = L.GridLayer.extend({
  createTile: function (coords) {
    var tile = document.createElement("div");
    tile.innerHTML = [coords.x, coords.y, coords.z].join(", ");
    tile.style.outline = "1px solid red";
    return tile;
  },
});

L.gridLayer.debugCoords = function (opts) {
  return new L.GridLayer.DebugCoords(opts);
};

onMounted(() => {
  map = new L.Map(mapContent.value, {
    center: [23.695, 121.102],
    zoom: 8,
  });

  map.addLayer(L.gridLayer.debugCoords());
});
```

## 參考資料

https://leafletjs.com/examples/extending/extending-2-layers.html

## 完整程式碼

```javascript!
<template>
  <!-- map -->
  <div class="h-[100vh]" ref="mapContent"></div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

let map = {};
const mapContent = ref(null);

const osmUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';

L.GridLayer.DebugCoords = L.GridLayer.extend({
  createTile: function (coords) {
    var tile = document.createElement("div");
    tile.innerHTML = [coords.x, coords.y, coords.z].join(", ");
    tile.style.outline = "1px solid red";
    return tile;
  },
});

L.gridLayer.debugCoords = function (opts) {
  return new L.GridLayer.DebugCoords(opts);
};

onMounted(() => {
  map = new L.Map(mapContent.value, {
    center: [23.695, 121.102],
    zoom: 8,
  });

  map.addLayer(L.gridLayer.debugCoords());
});
</script>

```
