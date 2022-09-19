###### tags: `鐵人賽`

# day25 leaflet.draw 的 Handler 設定

這裡要介紹不設定工具欄繪圖，但希望透過某些操作時能夠在地圖上畫畫。
官方文件:
http://leaflet.github.io/Leaflet.draw/docs/leaflet-draw-latest.html#l-draw-rectangle

參考文章
https://www.796t.com/post/MWI3dmE=.html

設定當點擊按鈕時能夠在地圖上畫矩形

```javascript!
<button @click="startDraw">畫圖</button>
```

也是要將圖形資料加到地圖

```javascript!
onMounted(() => {
    const drawnItems = new L.FeatureGroup();
     map.addLayer(drawnItems);
}
```

設定矩形加到地圖上，並且使用 setOptions 將 showArea 設定 false

```javascript!
let drawRectangle = null;

onMounted(()=>{
    drawRectangle = new L.Draw.Rectangle(map);

    drawRectangle.setOptions({
        showArea: false,
      });
})

```

點擊按鈕時設定 enable() 啟動繪畫

```javascript!
const startDraw = () => {
  drawRectangle.enable();
};
```

完整程式碼:

```javascript!
<template>
  <div class="h-[100vh]" ref="mapContent"></div>
  <button @click="startDraw">畫圖</button>
</template>

<script setup>
import { onMounted, ref } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw";
import "leaflet-draw/dist/leaflet.draw.css";

let map = {};
const mapContent = ref(null);

const osmUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';

let drawRectangle = null;

onMounted(() => {
  map = new L.Map(mapContent.value, {
    center: [23.695, 121.102],
    zoom: 7,
  });

  L.tileLayer(osmUrl, {
    maxZoom: 19,
    attribution: attribution,
  }).addTo(map);

  const drawnItems = new L.FeatureGroup();
  map.addLayer(drawnItems);

  drawRectangle = new L.Draw.Rectangle(map);

  drawRectangle.setOptions({
    showArea: false,
  });

  map.on("draw:created", function (e) {
    console.log(e);
    const layer = e.layer;
    map.addLayer(layer);
  });
});

const startDraw = () => {
  drawRectangle.enable();
};
</script>
```
