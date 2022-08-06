# 鐵人賽 Day2

# Leaflet.js 介紹和起手式

## Leaflet.js 是什麼

Leaflet 是一個開源的函式庫,能夠實現基本的地圖操作,建立圖層,標記,彈出窗口,縮放等操作

## 怎麼導入 Leaflet.js

1. CDN 引入

```javascript!
 <link rel="stylesheet" href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css" integrity="sha512-hoalWLoI8r4UszCkZ5kL8vayOGVae1oxXe/2A4AO6J9+580uKHDO3JdHb7NzwwzK5xr/Fs0W40kiNHxM9vyTtQ==" crossorigin="" />

<script src="https://unpkg.com/leaflet@1.8.0/dist/leaflet.js" integrity="sha512-BB3hKbKWOc9Ez/TAwyWxNXeoV9c1v6FIeYiBieIWkpLjauysF18NzgR1MBNBXf8/KABdlkX68nAhlwcDFLGPCQ==" crossorigin="">
</script>
```

2. 直接下載再引入檔案

   官網載點: https://leafletjs.com/download.html

   ![](https://i.imgur.com/u3aio4O.png)

   下載後解壓縮將檔案引入

   ```javascript!
   <link rel="stylesheet" href="/path/to/leaflet.css" />
   <script src="/path/to/leaflet.js"></script>
   ```

3. 下載至 package.json

   在專案終端機執行 npm install leaflet

   這時候看 package.json 的 dependencies 就能看到目前安裝的版本

   ```javascript!
   "dependencies": {
       "leaflet": "^1.8.0",
   },
   ```

## 開始使用

因為我是用 npm install 的方式所以使用 import 將 leaflet 引入

```javascript!
<script setup>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
</script>
```

產生地圖:
建立地圖區塊,用 ref 獲取節點

```htmlmixed!
<template>
  <div class="mapContainer" ref="mapContainer"></div>
</template>
```

```javascript!
<script setup>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { ref } from "vue";

const mapContainer = ref(null);
</script>
```

在 Vue onMounted 階段建立地圖物件

```javascript!
onMounted(() => {
  const map = L.map(mapContainer.value, {
    center: [23.611, 120.768],
    zoom: 8,
  });


  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
});

```

### L.map 初始化地圖設定:

    L.map(<String> id | <HTMLElement> el , options)

L.map 第 1 個參數能接收 ID 選取器或 DOM, 第 2 個參數 options 用物件設定需要的屬性,以上面為例

```javascript!
{
    L.map(mapContainer.value, {
    center: [23.611, 120.768],
    zoom: 8,
  })
}
```

第二個參數 options

center : 設定地圖經緯度
zoom : 設定地圖縮放層級

### L.tileLayer 設定圖資:

這裡我使用官方範例 openstreetmap 建立圖資

    L.tilelayer(<String> urlTemplate, <TileLayer options> options?)

```javascript!

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

```

urlTemplate : 圖資請求設定
attribution : 圖資版權設定

設定圖資後使用 addTo()進入 map 物件
