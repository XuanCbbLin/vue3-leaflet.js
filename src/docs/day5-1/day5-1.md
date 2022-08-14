###### tags: `鐵人賽`

# Day5-1

# GeoJSON 互動式地圖 Par2

1. 點擊地圖區塊透過 fitBounds()更清楚的看到該區塊

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
