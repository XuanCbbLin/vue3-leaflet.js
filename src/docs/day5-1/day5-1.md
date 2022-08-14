###### tags: `鐵人賽`

# Day5-1

# GeoJSON 互動式地圖 Par2

昨天在人口密度地圖實作了摸到區塊會有樣式效果，今天來實作點擊區塊能夠移到區塊範圍，除了新增點擊區塊也新增顯示區塊的資訊和地圖每個人口密度顏色的資訊

## 點擊地圖區塊透過 fitBounds()更清楚的看到該區塊

點擊地圖區塊透過 zoom 更清楚的看到該區塊:

- fitBounds() : 將需要看到的區域經緯度放到該函式，就能將視角移到指定區域
  參數:
  fitBounds(<LatLngBounds> bounds, <fitBounds options> options?)
  其中 LatLngBounds 就是矩形範圍，LatLngBounds 是以東北和西南兩個點形成矩行

- getBounds() 返回經緯對範圍也就是 LatLngBounds

組成的形式:
\_northEast : 東北
\_southWest : 西南
![](https://i.imgur.com/jB8lVvx.png)

```javascript!
<script setup>

let map = {};

const zoomToFeature = (e) => {
  map.fitBounds(e.target.getBounds());
};

const onEachFeature = (feature, layer) => {
    layer.on("click", zoomToFeature);
};


onMounted(() => {

map = L.map(mapContainer.value).setView([37.8, -96], 4);

L.geoJson(statesData, {
    onEachFeature: onEachFeature,
  }).addTo(map);

});

<script>
```

## 摸到區塊顯示人口密度和區域名稱

1. 新增 areaDensity 和 areaName 分別記錄人口密度和區域名稱，初始狀態不顯示任何訊息

![](https://i.imgur.com/GJZnwjX.png)

```htmlmixed!
<template>
  <div class="h-100vh" ref="mapContainer">
   <div class="absolute right-0 top-0 z-500 w-52 p-3 bg-white text-xl">
      <div>人口密度 : {{ areaDensity ? areaDensity : "" }}</div>
      <div>區域 : {{ areaName ? areaName : "" }}</div>
   </div>
  </div>
</template>

```

```javascript!

<script setup>
import { ref } from "vue";

const areaDensity = ref("");
const areaName = ref("");

<script>

```

2. 在 mouseover 事件觸發的 highlightFeature 紀錄該區域的名稱和人口密度

```javascript!

const highlightFeature = (e) => {
  const layer = e.target;

  areaDensity.value = layer.feature.properties.density;
  areaName.value = layer.feature.properties.name;

};

const onEachFeature = (feature, layer) => {
  layer.on("mouseout", resetHighlight);
};

```

3. 離開區域時重置 areaDensity 和 areaName 狀態

```javascript!

const resetHighlight = (e) => {
  areaDensity.value = "";
  areaName.value = "";
};

const onEachFeature = (feature, layer) => {
  layer.on("mouseout", resetHighlight);
};

```

地圖區塊 hover 後:
![](https://i.imgur.com/ikC5Q3J.png)

## 人口密度對應顏色區分資訊

新增人口密度陣列紀錄每個人口

```javascript!
const DensityList = [0, 10, 20, 50, 100, 200, 500, 1000];
```

模板使用 v-for 將人口密度和顏色比對顯示，顏色的部分使用已準備好的 getColor()

```htmlmixed!
<template>
  <div class="h-100vh" ref="mapContainer">
    <ul class="absolute right-[1.25rem] bottom-[1.875rem] z-500 bg-white p-4 text-lg">
      <li v-for="(Density, index) in DensityList" :key="Density">
        <span
          class="inline-block w-4 h-4 mr-2"
          :class="`bg-[${DensityList[index + 1] ? getColor(DensityList[index + 1]) : '#800026'}]`"
        ></span>
        {{ DensityList[index + 1] ? `${Density}-${DensityList[index + 1]}` : `${Density}+` }}
      </li>
    </ul>
  </div>
</template>
```

依照人口密度大小取得顏色

```javascript!

<script setup>
const getColor = (density) => {

  return density > 1000
    ? "#800026"
    : density > 500
    ? "#BD0026"
    : density > 200
    ? "#E31A1C"
    : density > 100
    ? "#FC4E2A"
    : density > 50
    ? "#FD8D3C"
    : density > 20
    ? "#FEB24C"
    : density > 10
    ? "#FED976"
    : "#FFEDA0";
};

<script>
```

地圖區塊人口密度對應顏色:
![](https://i.imgur.com/H0fNpjl.png)
