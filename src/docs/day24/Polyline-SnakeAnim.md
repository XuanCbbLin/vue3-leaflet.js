###### tags: `鐵人賽`

# day24 Leaflet.Polyline.SnakeAnim

Leaflet.Polyline.SnakeAnim 這個套件能夠在地圖上形成有動畫的 polyline

## 安裝套件

1. pnpm i leaflet.polyline.snakeanim
2. 引入 js

```javascript!
import "leaflet.polyline.snakeanim/L.Polyline.SnakeAnim";
```

## 開始使用

### 線段跑起來

建立 4 個經緯度座標，再啟動 snakeIn() 讓線段跑起來

latLngs : 4 個經緯度座標資料
snakingSpeed : 動畫的速度，默認 200
snakeIn() : 啟動動畫

```javascript!
const latLngs = [
  [25.000994300028957, 121.53076171875001],
  [23.926013033021192, 120.47607421875001],
  [22.243344409235693, 120.71777343750001],
  [23.659619388708066, 121.36047363281251],
  [25.000994300028957, 121.53076171875001],
];

const line = L.polyline(MarkerLatLngs, { snakingSpeed: 200 });

onMounted(() => {
  line.addTo(map).snakeIn();
});

```

完整程式碼:

```javascript!
<template>
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

const line = L.polyline(MarkerLatLngs, { snakingSpeed: 200 });

onMounted(() => {
  map = new L.Map(mapContent.value, {
    center: [23.695, 121.102],
    zoom: 8,
  });

  L.tileLayer(osmUrl, {
    maxZoom: 19,
    attribution: attribution,
  }).addTo(map);

  line.addTo(map);

});
```

### 線段移動過程中新增 marker

透過 L.layerGroup 新增 marker 和 polyline

兩個 marker 和 marker 座標的連接

```javascript!
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
```

```javascript!
onMounted(() => {
  route.addTo(map).snakeIn();
});
```

完整程式碼:

```javascript!
<template>
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

  route.addTo(map).snakeIn();
});
</script>

```

## 參考資料

https://github.com/IvanSanchez/Leaflet.Polyline.SnakeAnim
