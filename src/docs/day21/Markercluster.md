###### tags: `鐵人賽`

# day21 Leaflet.markercluster 套件

markercluster 這個套件可以將座標群組起來不會散落在每個地方。

## 安裝套件和引入檔案

1. pnpm install leaflet.markercluster

2. 引入 JS 和 CSS 檔案

```javascript!
import "leaflet.markercluster/dist/leaflet.markercluster";
import "leaflet.markercluster/dist/markercluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
```

## 準備座標

```javascript!
const addressPoints = [
  [-37.8210922667, 175.2209316333, "2"],
  [-37.8210819833, 175.2213903167, "3"],
  [-37.8210881833, 175.2215004833, "3A"],
  [-37.80970685, 175.2221815833, "178"],
  [-37.8102146667, 175.2211562833, "190"],
  [-37.8088037167, 175.2242227, "156"],
];
```

## day21 建立群組 marker 加到地圖上

這邊將建立的 marker 加入到 L.markerClusterGroup() 群組起來

```javascript!
const markers = L.markerClusterGroup();

for (let i = 0; i < addressPoints.length; i++) {
  const address = addressPoints[i];
  const title = address[2];
  const marker = L.marker(new L.LatLng(address[0], address[1]), { title: title });
  marker.bindPopup(title);
  markers.addLayer(marker);
}


onMounted(() => {
  ...略
  map.addLayer(markers);
});
```

畫面:
![](https://i.imgur.com/WFXUY16.png)

完整範例:

```javascript!
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

```

## 參考資料

https://github.com/Leaflet/Leaflet.markercluster#using-the-plugin
