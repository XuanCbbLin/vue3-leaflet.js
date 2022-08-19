###### tags: `鐵人賽`

# day8

文檔:https://leafletjs.com/examples/layers-control/

# 切換圖層和組合圖層資料

之前都是在地圖上切換單一圖層，今天要來學習怎麼在地圖上切換不同圖層

## 透過 L.layerGroup() 組合圖層資料

之前地圖上如果需要添加不同的 marker，可能需要以下方式建立

我先建立 4 個圖標並且加在地圖上

```javascript!

<script setup>

onMounted(() => {

  L.marker([39.61, -105.02]).bindPopup("This is Littleton, CO.").addTo(map);
  L.marker([39.74, -104.99]).bindPopup("This is Denver, CO.").addTo(map);
  L.marker([39.73, -104.8]).bindPopup("This is Aurora, CO.").addTo(map);
  L.marker([39.77, -105.23]).bindPopup("This is Golden, CO.").addTo(map);

});

<script>
```

像上面程式碼需要一個一個將標記加到地圖上很麻煩 leaflet 提供 L.layerGroup()的方式將標記放到陣列裡，之後再將標記添加到地圖上。

### L.layerGroup() 參數介紹

    L.layerGroup(<Layer[]> layers?, <Object> options?)

而 layers 就是需要添加的資料以陣列表示，如下:

一樣創造標記然後用陣列裝起來

```javascript!

const markers = [
  L.marker([39.61, -105.02]).bindPopup("This is Littleton, CO."),
  L.marker([39.74, -104.99]).bindPopup("This is Denver, CO."),
  L.marker([39.73, -104.8]).bindPopup("This is Aurora, CO."),
  L.marker([39.77, -105.23]).bindPopup("This is Golden, CO."),
];

```

宣告 cities 將 markers 裝在 L.layerGroup

```javascript!
const cities = L.layerGroup(markers);
```

最後在 onMounted 階段將 cities 添加到地圖上

```javascript!
onMounted(() => {

    const map = L.map(mapContainer.value, {
    center: [39.73, -104.99],
    zoom: 10,
  });

  const tiles = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  cities.addTo(map);

});
```

## 切換圖層

這裡要介紹如何在地圖上切換不同圖層

1. 建立第一個圖層

建立圖資

```javascript!
const osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
});

```

透過 L.map 中 options 的 layers 載入圖資

```javascript!

onMounted(() => {
  const map = L.map(mapContainer.value, {
    center: [39.73, -104.99],
    zoom: 10,
    layers: [osm],
  });

});

```

第一次建立的圖層:
![](https://i.imgur.com/2hyZd0W.png)

2. 新增第 2 個圖層

mbAttr: 存放授權的資料

```javascript!

const mbAttr =
  'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';

const streets = L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
  {
    id: "mapbox/streets-v11",
    attribution: mbAttr,
  }
);

```

地圖上要顯示的第 2 個圖層:
![](https://i.imgur.com/Qzfxt07.png)

3. 將前兩項建立的圖層切換
   將兩個圖層 osm 和 streets 裝在建立的 baseMaps 物件中

```javascript!
const baseMaps = {
  OpenStreetMap: osm,
  MapBoxStreets: streets,
};
```

在 onMounted 階段建立圖層並且能切換，使用 L.control.layers 建立 2 個圖層的控制選項:

    L.control.layers(baseLayers, overlays)

baseLayers : 圖層上的底圖，也就是 baseMaps 裡的 2 個圖層
overlays : 底圖上的圖層

```javascript!
onMounted(() => {
  const map = L.map(mapContainer.value, {
    center: [39.73, -104.99],
    zoom: 10,
    layers: [osm],
  });

 L.control.layers(baseMaps).addTo(map);
});
```

這樣就可以切換圖層:
圖層目前在 OpenStreetMap 這個選項

![](https://i.imgur.com/L6WCGn5.png)

![](https://i.imgur.com/hhw2eaH.png)

切換至 MapBoxStreets

![](https://i.imgur.com/4OAiloi.png)

![](https://i.imgur.com/3XrD9u3.png)

4. 在底圖上面新增另一個圖層
   這部份接著第 3 點使用 L.control.layers 新增 overlays

建立 markers 當作 overlays

```javascript!
const markers = [
  L.marker([39.61, -105.02]).bindPopup("This is Littleton, CO."),
  L.marker([39.74, -104.99]).bindPopup("This is Denver, CO."),
  L.marker([39.73, -104.8]).bindPopup("This is Aurora, CO."),
  L.marker([39.77, -105.23]).bindPopup("This is Golden, CO."),
];

const cities = L.layerGroup([markers]);
```

建立 overlayMaps 物件裝剛剛建立的 cities

```javascript!
const overlayMaps = { cities };
```

onMounted 階段的 L.control.layers 多新增一個 overlayMaps

```javascript!
onMounted(() => {
  const map = L.map(mapContainer.value, {
    center: [39.73, -104.99],
    zoom: 10,
    layers: [osm],
  });

  L.control.layers(baseMaps, overlayMaps).addTo(map);
});
```

在底圖上切換 overlayMaps:

目前沒有點擊 cities 所以地圖不會有圖標
![](https://i.imgur.com/XlrUS0x.png)

![](https://i.imgur.com/6CJAXJJ.png)

點擊 cities 圖標跑出來

![](https://i.imgur.com/i27INbh.png)

![](https://i.imgur.com/hFK4mlG.png)
