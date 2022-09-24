###### tags: `鐵人賽`

# day27 Extending Leaflet Layers

leaflet.js 還能夠自己建立圖層

- L.TileLayer.Kitten : 建立圖層資料
- L.tileLayer.kitten : 接收擴充圖層的資料

```javascript!
L.TileLayer.Kitten = L.TileLayer.extend({
  getTileUrl: function (coords) {
    var i = Math.ceil(Math.random() * 4);
    return "https://placekitten.com/256/256?image=" + i;
  },
  getAttribution: function () {
    return "<a href='https://placekitten.com/attribution.html'>PlaceKitten</a>";
  },
});

L.tileLayer.kitten = function () {
  return new L.TileLayer.Kitten();
};

onMounted(() => {
  map = new L.Map(mapContent.value, {
    center: [23.695, 121.102],
    zoom: 8,
  });

  L.tileLayer.kitten().addTo(map);
});

```

## 完整程式碼

```javascript!
<template>
  <div class="h-[100vh]" ref="mapContent"></div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

let map = {};
const mapContent = ref(null);

L.TileLayer.Kitten = L.TileLayer.extend({
  getTileUrl: function () {
    var i = Math.ceil(Math.random() * 4);
    return "https://placekitten.com/256/256?image=" + i;
  },
  getAttribution: function () {
    return "<a href='https://placekitten.com/attribution.html'>PlaceKitten</a>";
  },
});

L.tileLayer.kitten = function () {
  return new L.TileLayer.Kitten();
};

onMounted(() => {
  map = new L.Map(mapContent.value, {
    center: [23.695, 121.102],
    zoom: 8,
  });

  L.tileLayer.kitten().addTo(map);
});
</script>


```

## 參考資料

https://leafletjs.com/examples/extending/extending-2-layers.html
