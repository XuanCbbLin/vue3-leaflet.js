###### tags: `鐵人賽`

# Day4

# 客制化圖標和 GeoJSON 介紹

除了可以用 L.marker()或 L.circle()等方式建立基本圖標，也可以用 L.icon()客製圖標

## L.icon()

    L.icon(options)

先準備需要用到的圖標，這裡我先用官方的圖標
顯示的圖標: ![](https://i.imgur.com/rlkW5RN.png)
陰影圖標 : ![](https://i.imgur.com/uJxxlqr.png)

使用 L.icon() 建立圖標

```javascript!
  const greenIcon = L.icon({
    iconUrl: "/src/assets/day3-Icons/leaf-green.png",
    shadowUrl: "/src/assets/day3-Icons/leaf-shadow.png",

    iconSize: [50, 64],
    shadowSize: [50, 64],
    iconAnchor: [0, 0],
    shadowAnchor: [4, 62],
    popupAnchor: [-3, -76],
  });

L.marker([25.03388, 121.56531], { icon: greenIcon }).addTo(map);
```

- iconUrl : 設定圖片路徑
- shadowUrl : 設定陰影圖片路徑
- iconSize : 圖標尺寸
- shadowSize : 陰影尺寸
- iconAnchor : 圖標相對於經緯度的偏移量也就是[25.03388, 121.56531]的偏移

例如目前經緯度在[25.03388, 121.56531] 這個地方
![](https://i.imgur.com/Qd4Eklg.png)

接下來 L.icon 的 option 中設定 iconAnchor，我先設定[0,0]查看一開始渲染的位置
![](https://i.imgur.com/TF8Mw3t.png)
圖片位置會在初始經緯度也就是[25.03388, 121.56531]開始往下渲染

- shadowAnchor : 陰影相對於經緯度的偏移量
- popupAnchor : 圖標的訊息相對於 iconAnchor 的偏移

這時候在地圖上就能看到設定的圖標

![](https://i.imgur.com/DMCtfUh.png)

## 圖標共用設定

如果有多個圖標有共同的設定，leaflet 有提供 L.Icon.extend 協助設定

假如圖標有共同的陰影，這時透過 L.Icon.extend 設定

```javascript!
 const LeafIcon = L.Icon.extend({
    options: {
      shadowUrl: "/src/assets/day3-Icons/leaf-shadow.png",
      iconSize: [38, 95],
      shadowSize: [50, 64],
      iconAnchor: [22, 94],
      shadowAnchor: [4, 62],
      popupAnchor: [-3, -76],
    },
  });
```

然後創造 3 個分別是紅、綠、橘色圖標

```javascript!

const greenIcon = new LeafIcon({ iconUrl: "/src/assets/day3-Icons/leaf-green.png" });
const redIcon = new LeafIcon({ iconUrl: "/src/assets/day3-Icons/leaf-red.png" });
const orangeIcon = new LeafIcon({ iconUrl: "/src/assets/day3-Icons/leaf-orange.png" });

```

最後將 3 個圖標加到地圖上

```javascript!
L.marker([25.03388, 121.56531], { icon: greenIcon }).addTo(map).bindPopup("I am a green leaf.");
L.marker([25.033, 121.56531], { icon: redIcon }).addTo(map).bindPopup("I am a red leaf.");
L.marker([25.0334, 121.564], { icon: orangeIcon }).addTo(map).bindPopup("I am an orange leaf.");

```

查看地圖
![](https://i.imgur.com/lofyebN.png)

## GeoJSON 介紹

GeoJSON 是一種處理地理資訊的 JSON 格式，GeoJSON 支援像是點、線、多邊形的幾何形狀，當中也包含了特徵或特徵的集合資訊，組成資料如下

```javascript!

const freeBus = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [
          [-105.00341892242432, 39.75383843460583],
          [-105.0008225440979, 39.751891803969535],
        ],
      },
      properties: {
        popupContent: "This is a free bus line that will take you across downtown.",
        underConstruction: false,
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [
          [-105.0008225440979, 39.751891803969535],
          [-104.99820470809937, 39.74979664004068],
        ],
      },
      properties: {
        popupContent: "This is a free bus line that will take you across downtown.",
        underConstruction: true,
      },
    },
  ],
};


```

- FeatureCollection : 代表特徵集合資訊
- features 屬性 : 包含許多 feature(特徵)的物件
- geometry :
  - type: 可以是 Point(點) LineString(線段)等幾何
  - coordinates : 組成幾何圖形的座標
- properties : 存放關於圖形的資訊
