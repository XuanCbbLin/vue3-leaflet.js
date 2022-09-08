# day13 實作選單對應 GeoJSON 地圖

今天要來用 GeoJSON 產生地圖，並且用選單觸摸時顯示對應的區塊。

功能說明:

1. 產生選單對應 GeoJson 地圖
2. GeoJson 地圖區塊觸摸時也會連動到選單

## 實作

1. 準備 GeoJSON 地圖
   這裡新增 us-states.js 裝 GeoJSON 所有地區內容，並且在 onMounted 設定每個區塊的顏色和新增到地圖上。

```javascript!
import { cityData } from "./us-states.js";

let geoJSON = [];
let map = {};

onMounted(() => {
   map = L.map(mapContainer.value).setView([53.8, -110], 4);

   geoJSON = L.geoJSON(cityData, {
    style: {
      color: "#e91e63",
      weight: 2,
      fillColor: "#ffeb3b",
      fillOpacity: 0.15,
    },
  });

  geoJSON.addTo(map);
}

```

初始化 GeoJson

![](https://i.imgur.com/msfhRXp.png)

2. 建立選單
   這裡拆出 menu 元件並且傳入城市的資料和目前城市的 id。

```javascript!
<Menu :currentCityId="currentCityId"  :cityData="cityData" />
```

```javascript!
import { cityData } from "./us-states.js";

const currentCityId = ref("");

```

初始化選單
![](https://i.imgur.com/FxA51XV.png)

3. 在 menu 元件監聽 mouse 事件
   在選單元件上監聽 mouseover 和 mouseout 事件，當摸到選單觸發 setAreaHighlight 函式，離開選單觸發 resetAreaHighlight 函式，父層接收到 emit 後對內容篩選或重置狀態。

menu 元件

```javascript!

<li @mouseover="$emit('setAreaHighlight', city)"
    @mouseout="$emit('resetAreaHighlight', city)"></li>

```

父層

```javascript!
<Menu @setAreaHighlight="setAreaHighlight"
      @resetAreaHighlight="resetAreaHighlight" />
```

setStyle() 設定摸到區塊時的顏色

```javascript!

const setAreaHighlight = (city) => {
  getFilterArea(city)[0].setStyle({
    weight: 4,
    fillOpacity: 0.7,
  });
};

const resetAreaHighlight = (city) => {
  geoJSON.resetStyle(getFilterArea(city)[0]);
};


```

4. GeoJson 地區監聽 mouse 事件
   在 onMounted 階段透過 onEachFeature 也是監聽 mouseover 和 mouseout 事件，並且離開地圖時重置 currentCityId 狀態。

```javascript!

const onEachFeature = (feature, layer) => {
  layer.addEventListener("mouseover", (e) => {
    e.target.setStyle({
      weight: 4,
      fillOpacity: 0.7,
    });

    currentCityId.value = e.target.feature.id;
  });

  layer.addEventListener("mouseout", (e) => {
    geoJSON.resetStyle(e.target);

    currentCityId.value = "";
  });
};

```

```javascript!

onMounted(() => {
  L.geoJSON(cityData, {
    onEachFeature: onEachFeature,
  });
})

```

範例完成
![](https://i.imgur.com/oDl6Lzw.png)

範例連結

https://github.com/XuanCbbLin/Vue3-leaflet/tree/master/src/components/LinkedView
