###### tags: `鐵人賽`

# Day6

# GeoJSON 互動式地圖

本篇使用 leaflet 官方提供的範例完成人口密度地圖,使用已準備好的 GeoJSON 資料產生多邊形，並且摸到該區塊加入樣式

範例網址: https://leafletjs.com/examples/choropleth/

主要功能如下:

1. 滑鼠摸到地圖區域的邊框變色
2. 滑鼠離開地圖，區域的邊框樣式重置

GeoJSON 資料:

使用官方提供的 js 檔案 https://leafletjs.com/examples/choropleth/us-states.js

在 index.html 引入 GeoJSON

```htmlmixed!
  <body>
    <script src="https://leafletjs.com/examples/choropleth/us-states.js"></script>
  </body>
```

## 設定地圖區塊樣式

將 GeoJSON 資料載入地圖

```javascript!
<script setup>
let map = {};

onMounted(() => {
  map = L.map(mapContainer.value).setView([37.8, -96], 4);

  const tiles = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a      href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  geojson = L.geoJson(statesData).addTo(map);
});

</script>

```

初始地圖狀態:
![](https://i.imgur.com/VNkNgYY.png)
多邊形區域的樣式是 leaflet 的預設

將地圖區塊樣式客製化:
因為要顯示各區域的人口密度，所以每個區域依照密度設定樣式

設定依照人口密度獲取樣式的函式

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

L.geoJson 使用 style 獲取客制樣式

```javascript!
<script setup>

const getStyle = (feature) => {
  return {
    fillColor: getColor(feature.properties.density),
    weight: 2,
    opacity: 1,
    color: "white",
    dashArray: "3",
    fillOpacity: 0.7,
  };
};

onMounted(() => {
  L.geoJson(statesData, {
    style: getStyle,
  }).addTo(map);
});

<script>
```

地圖每個區塊的人口密度樣式:
![](https://i.imgur.com/egR7xlE.png)

設定區塊摸到時變色，L.geoJson 裡設定 onEachFeature ，接收 onEachFeature 函式監聽 mouseover 事件。

- setStyle : 可以設定 geojson 圖層區塊的樣式
- bringToFront() : 將圖層拉到頂端

如果沒有設定 bringToFront()，摸到區塊時該區塊圖層樣式就看不到
![](https://i.imgur.com/ZGUHGsU.png)

設定 bringToFront()就可以看到圖層的樣式
![](https://i.imgur.com/obyilFh.png)

```javascript!
<script setup>

const highlightColor = (e) => {
  const layer = e.target;

  layer.setStyle({
    weight: 5,
    color: "#666",
    dashArray: "",
    fillOpacity: 0.7,
  });

  layer.bringToFront();
};

const onEachFeature = (feature, layer) => {
  layer.on("mouseover", highlightColor);
};


onMounted(() => {
 L.geoJson(statesData, {
    onEachFeature: onEachFeature,
  }).addTo(map);

});

<script>
```

滑鼠離開地圖，區域的邊框樣式重置:
也是設定 onEachFeature 監聽 mouseout 事件， 觸發 mouseout 事件時將前一個區域的樣式移除

```javascript!
<script setup>

const resetHighlight = (e) => {
  geojson.resetStyle(e.target);
};

const onEachFeature = (feature, layer) => {
   layer.on("mouseout", resetHighlight);
};


onMounted(() => {
 L.geoJson(statesData, {
    onEachFeature: onEachFeature,
  }).addTo(map);

});

<script>
```
