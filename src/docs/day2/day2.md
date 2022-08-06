###### tags: `鐵人賽`

# Day ２

# 地圖標記和事件

接下來要介紹地圖新增標記，如何在地圖上使用事件，以及標記上設定訊息框

## 標記

### L.marker

    L.marker(latlng, options)

latlng: 設定圖標經緯度
options : 設定圖標狀態
例如: 圖標設定能拖曳，就在 options 新增 draggable: true 就可以拖曳圖標，draggable 預設為 false

```javascript!
const marker = L.marker([23.465766, 120.448608], {
    draggable: true,
  }).addTo(map);

```

### L.circle

    L.circle(latlng, options)

除了設定一般圖標外也可以在地圖新增圓形，參數設定方式也是跟 L.marker 一樣需要給經緯度和 options 設定圓形狀態

```javascript!

 const circle = L.circle([23.438049, 121.184692], {
    color: "blue",
    fillColor: "green",
    fillOpacity: 1,
    radius: 12000,
  }).addTo(map);

```

color : 圓形錨邊顏色
fillColor : 圓形填充色
fillOpacity : 填充色透明度
radius : 圓形半徑

### L.polygon

    L.polygon(latlngs, options)

latlngs : 設定多個經緯度組成多邊形
options :　設定多邊形狀態

在地圖上顯示多邊形，這裡畫一個正方形

```javascript!

  const polygon = L.polygon(
    [
      [22.687518, 121.449051],
      [22.687518, 121.558914],
      [22.585485, 121.558914],
      [22.585485, 121.449051],
    ],
    {
      color: "#873324",
    }
  ).addTo(map);

```

### 圖標上添加訊息

1. 直接在圖標上使用 bindPopup()設定要顯示的內容

```javascript!

marker.bindPopup("<b>Hello world!</b><br>I am a marker.").openPopup();
circle.bindPopup("<b>Hello world!</b><br>I am a circle.");

```

如果圖標一開始就想要有訊息，設定 bindPopup()後在接上 openPopup()預設就會先顯示訊息，沒有加 openPopup() 就是點擊後會出現訊息

2. 除了在圖標上顯示訊息，也可以在自己設定的經緯度顯示訊息

```javascript!

const popup = L.popup()
    .setLatLng([23.800424, 121.1187742])
    .setContent("I am a standalone popup.")
    .openOn(map);

```

setLatLng : 設定經緯度
setContent : 設定內容
openOn : 將訊息設定到地圖上

## 地圖監聽事件

這裡結合 L.popup()並且在地圖上監聽點擊事件，透過點擊顯示目前經緯度，點擊到的經緯度可在事件中的 latlng 取得

![](https://i.imgur.com/SWpH1nk.png =728x200)

```javascript!

const popup = L.popup();

map.on("click", (e) => {
    popup
      .setLatLng(e.latlng)
      .setContent("You clicked the map at " + e.latlng.toString())
      .openOn(map);
  });

```
