###### tags: `鐵人賽`

# day20 leaflet.draw options

官方文件 :
http://leaflet.github.io/Leaflet.draw/docs/leaflet-draw-latest.html#options

```javascript!
const options = {
    position: "topright",
    draw: {
      polyline: {
        shapeOptions: {
          color: "#f357a1",
          weight: 10,
        },
      },
      polygon: {
        allowIntersection: false,
        drawError: {
          color: "red",
          message: "不給香蕉喔!",
        },
        shapeOptions: {
          color: "#f357a1",
          opacity: 0.8,
          clickable: true,
        },
      },
      circle: false,
      rectangle: {
        showArea: false,
      },
    },
    edit: {
      featureGroup: drawnItems,
      remove: true,
    },
  };

```

1. shapeOptions
   圖形的顏色、尺寸等設定

```javascript!
    polyline: {
        shapeOptions: {
          color: "#f357a1",
          weight: 10,
        },
      },
```

2. allowIntersection 和 drawError

allowIntersection :　設定繪圖時是否能跨過
drawError :　顯示繪圖錯誤的訊息

將　 allowIntersection 　設定 false， drawError 設定畫圖錯誤時顯示紅色和訊息，底下使用 polygon 畫圖並且跨過多邊形邊界

![](https://i.imgur.com/Mszagef.png)

```javascript!
    polygon: {
        allowIntersection: false,
        drawError: {
          color: "red",
          message: "不給香蕉喔!",
        },
        shapeOptions: {
          color: "#f357a1",
          opacity: 0.8,
          clickable: true,
        },
      },
```

完整程式碼:

```javascript!
<template>
  <!-- map -->
  <div class="h-[100vh]" ref="mapContent"></div>
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

  const options = {
    position: "topright",
    draw: {
      polyline: {
        shapeOptions: {
          color: "#f357a1",
          weight: 10,
        },
      },
      polygon: {
        allowIntersection: false, // Restricts shapes to simple polygons
        drawError: {
          color: "red", // Color the shape will turn when intersects
          message: "不給香蕉喔!", // Message that will show when intersect
        },
        shapeOptions: {
          color: "#f357a1",
          opacity: 0.8,
          clickable: true,
        },
      },
      circle: false, // Turns off this drawing tool
      rectangle: {
        showArea: false,
      },
    },
    edit: {
      featureGroup: drawnItems, //REQUIRED!!
      remove: true,
    },
  };

  const drawControl = new L.Control.Draw(options);

  map.addControl(drawControl);

  map.on("draw:created", function (e) {
    const layer = e.layer;
    map.addLayer(layer);
  });
});
</script>
```
