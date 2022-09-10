###### tags: `鐵人賽`

# day18 Leaflet.MiniMap 套件

## 下載套件

1. pnpm i leaflet-minimap

2. 引入 JS 和 CSS 檔案

```javascript!

import "leaflet-minimap/src/Control.MiniMap";
import "leaflet-minimap/src/Control.MiniMap.css";

```

## 地圖建立小地圖

因為小地圖的圖資跟主地圖一樣，這邊用個變數將圖資和圖資版權資訊裝起來，在 onMounted 建立小地圖。

```javascript!
const osmUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';

const osm2 = new L.TileLayer(osmUrl, { attribution: attribution });

onMounted(() => {
    const miniMap = new L.Control.MiniMap(osm2).addTo(map);
})

```

小地圖建立:

![](https://i.imgur.com/LkuJwX6.png)

## leaflet-minimap 設定 option

```javascript!
onMounted(() => {
  const miniMap = new L.Control.MiniMap(osm2, {
    width: "250",
    height: "250",
    toggleDisplay: true,
    collapsedWidth: "30",
    collapsedHeight: "30",
    zoomAnimation: true,
    minimized: true,
  }).addTo(map);
});

```

- width : 設定小地圖寬度，預設 150px
- height :　設定小地圖高度，預設 150px
- toggleDisplay : 小地圖是否能設定放大縮小，預設 false

如果 toggleDisplay 設定 true，小地圖會像以下出現 toggle

![](https://i.imgur.com/tz9RvmJ.png)

- collapsedWidth : 設定 toggle 的寬度，預設 19px
- collapsedHeight : 設定 toggle 的高度，預設 19px
- zoomAnimation : 設定小地圖在縮放時是否用動畫呈現
- minimized : 設定小地圖在初始化時是否用最小的方式呈現

minimized 設定 true 初始化時地圖如以下顯示

![](https://i.imgur.com/jutp5J2.png)

參考資料 :
https://github.com/Norkart/Leaflet-MiniMap
