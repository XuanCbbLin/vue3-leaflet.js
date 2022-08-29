###### tags: `鐵人賽`

# day5 GeoJSON 使用方式

本篇要來介紹如何將 GeoJSON 的資料顯示在地圖上

GeoJSON 的參數

    L.geoJSON(geojson, options)

## L.geoJSON 的 geojson 參數

先建立 geojson 的資料，這裡的要在地圖上建立 1 個點座標

```javascript!
export const geojsonFeature = {
  type: "Feature",
  geometry: {
    type: "Point",
    coordinates: [-104.96749877929689, 39.73887436009367],
  },
};
```

在 onMounted 階段將 geojson 加到地圖上

```javascript!
<script setup>
import { geojsonFeature } from "./feature.js";

onMounted(() => {
    L.geoJSON(geojsonFeature).addTo(map);
})
</script>
```

或者先建立空的 geoJSON 後續再填加資料

```javascript!

onMounted(() => {
   const myLayer = L.geoJSON().addTo(map);
   myLayer.addData(geojsonFeature);
})

```

地圖上顯示一個點:
![](https://i.imgur.com/gS0KHUO.png)

## L.geoJSON 的 options 參數

### options 裡給特徵設定樣式

在 geoJSON 建立線段，在 L.geoJSON 使用 style 設定線段樣式。

1. 建立線段

```javascript!
export const myLines = [
  // 第一條線
  {
    type: "LineString",
    coordinates: [
      [-105.02500534057619, 39.73979836621592],
      [-105.01058578491212, 39.739666366099804],
    ],
  },
  // 第二條線
  {
    type: "LineString",
    coordinates: [
      [-105.01058578491212, 39.739666366099804],
      [-105.00251770019533, 39.7489057636298],
    ],
  },
];
```

2. 設定線段樣式

```javascript!
export const myStyle = {
  color: "red",
  weight: 5,
  opacity: 0.65,
};
```

color: 設定線段紅色
weight: 設定線的寬度
opacity: 設定線的透明度

3. 使用 L.geoJSON 時將資料和樣式帶入

```javascript!

<script setup>
import { myLines , myStyle } from "./feature.js";

onMounted(() => {
   L.geoJSON(myLines, {
    style: myStyle,
  }).addTo(map);

})
</script>

```

地圖顯示:
![](https://i.imgur.com/Sis4AAU.png)

除了設定共用樣式資料，也可以傳遞函式客制樣式。

這裡建立 2 個多邊形並且設定不同樣式 :

1. 多邊形特徵

```javascript!

export const polygons  = [
  {
    type: "Feature",
    properties: { party: "Republican" },
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [-105.05281448364259, 39.750093596284245],
          [-105.03341674804689, 39.74956567318853],
          [-105.03393173217775, 39.732669998150385],
          [-105.05195617675783, 39.73689430525781],
          [-105.05281448364259, 39.750093596284245],
        ],
      ],
    },
  },
  {
    type: "Feature",
    properties: { party: "Democrat" },
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [-104.97024536132814, 39.749169728211825],
          [-104.95153427124025, 39.74930171012357],
          [-104.95256423950197, 39.732669998150385],
          [-104.9711036682129, 39.732669998150385],
          [-104.97024536132814, 39.749169728211825],
        ],
      ],
    },
  },
];

```

2. L.geoJSON 的 style 設定篩選樣式函式

   多邊形分別設定紅色和藍色

```javascript!
<script setup>
import { polygons } from "./feature.js";

onMounted(() => {

  L.geoJSON(polygons, {
    style: function (feature) {
      switch (feature.properties.party) {
        case "Republican":
          return { color: "#ff0000" };
        case "Democrat":
          return { color: "#0000ff" };
      }
    },
  }).addTo(map);

})
</script>

```

地圖顯示:
![](https://i.imgur.com/bxR0s6e.png)

### options 裡設定 pointToLayer

geoJSON 圖層也可以設定 circleMarker 和 Marker，不過設定方式需要透過 pointToLayer 的方式

1. 建立 2 個 point 資料

```javascript!
export const points = [
  {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [-104.99404, 39.75621],
    },
  },
  {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [-104.98404, 39.74621],
    },
  },
];
```

2. 設定 marker 樣式

```javascript!

export const markerStyle = {
  radius: 8,
  fillColor: "#ff7800",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
};

```

3. 在 L.geoJSON 使用 pointToLayer 設定 marker 和樣式

```javascript!

<script setup>
import { points , markerStyle } from "./feature.js";

onMounted(() => {
    L.geoJSON(points, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, markerStyle);
    },
  }).addTo(map);
})
</script>

```

- 函式接收的參數

  ```javascript!
  function (feature, latlng){}
  ```

  - feature : 2 筆點資料
  - latlng : 2 筆點座標

- L.circleMarker 參數

  `L.circleMarker(latlng, markerStyle)`

  - latlng : 座標
  - markerStyle : marker 樣式

地圖顯示 2 個橘色 marker:

![](https://i.imgur.com/Ujb9SZE.png)

### options 裡設定 onEachFeature

如果需要將資料設定到 geoJSON 圖層時，點擊資料顯示訊息就可以用 onEachFeature 方式處理

1. 準備 1 個點座標

properties: 設定要顯示的訊息

```javascript!
export const point = {
  type: "Feature",
  properties: {
    name: "Coors Field",
    amenity: "Baseball Stadium",
    popupContent: "This is where the Rockies play!",
  },
  geometry: {
    type: "Point",
    coordinates: [-104.96749877929689, 39.73887436009367],
  },
};
```

2. 設定 onEachFeature 接收顯示訊息的函式

```javascript!
export const onEachFeature = (feature, layer) => {
    layer.bindPopup(feature.properties.popupContent);
};
```

feature : 設定的特徵資料

```javascript!
 properties: {
    name: "Coors Field",
    amenity: "Baseball Stadium",
    popupContent: "This is where the Rockies play!",
  },
  geometry: {
    type: "Point",
    coordinates: [-104.96749877929689, 39.73887436009367],
  },
```

layer : 將設定的資料顯示到特徵上
例如顯示訊息 popupContent: "This is where the Rockies play!"

3. 將函式設定到 onEachFeature

```javascript!
<script setup>
import { point , onEachFeature  } from "./feature.js";

onMounted(() => {
    L.geoJSON(point, {
    onEachFeature: onEachFeature,
  }).addTo(map);
})
</script>
```

地圖點擊就會顯示"This is where the Rockies play!"

![](https://i.imgur.com/Fi72PKn.png)

### options 裡設定 filter

使用 filter 可以在 geoJSON 層控制需要顯示的特徵

1. 設定 2 筆資料，並且在資料設定設定 true 或 false

```javascript!
export const someFeatures = [
  {
    type: "Feature",
    properties: {
      name: "Coors Field",
      show_on_map: true,
    },
    geometry: {
      type: "Point",
      coordinates: [-104.99404, 39.75621],
    },
  },
  {
    type: "Feature",
    properties: {
      name: "Busch Field",
      show_on_map: false,
    },
    geometry: {
      type: "Point",
      coordinates: [-104.98404, 39.74621],
    },
  },
];

```

2. L.geoJSON 設定 filter 篩選資料
   透過特徵中的 show_on_map 控制顯示的資料

```javascript!
<script setup>
import { someFeatures } from "./feature.js";

onMounted(() => {
    L.geoJSON(someFeatures, {
    filter: function (feature, layer) {
      return feature.properties.show_on_map;
    },
  }).addTo(map);
})
</script>
```

預設地圖上應該要顯示兩筆資料
![](https://i.imgur.com/fqA8NSI.png)

加入 filter 後只會顯示一筆

![](https://i.imgur.com/ANAee4s.png)
