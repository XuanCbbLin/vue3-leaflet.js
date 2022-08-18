###### tags: `鐵人賽`

# Day7-ImageOverlay

# 地圖設定 ImageOverlay

地圖如果需要加載圖片可使用 ImageOverlay 這個功能

參數介紹:

    L.imageOverlay(<String> imageUrl, <LatLngBounds> bounds, <ImageOverlay options> options?)

imageUrl : 圖片的路徑
LatLngBounds : 圖片顯示的位置
options : 關於圖片的狀態設定

1. 先 L.tileLayer 透過產生底圖,並且加到地圖上

```javascript!

const map = L.map(mapContainer.value).setView([37.8, -96], 4);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

```

底圖顯示:
![](https://i.imgur.com/FcWsACc.png)

2. 準備圖片和圖片顯示的位置

```javascript!

<script setup>

const imageUrl = "https://maps.lib.utexas.edu/maps/historical/newark_nj_1922.jpg";

const latLngBounds = L.latLngBounds([
  [40.799311, -74.118464],
  [40.68202047785919, -74.33],
]);

</script>
```

3. onMounted 階段使用 imageOverlay 並且使用 options 設定圖片狀態

```javascript!

 L.imageOverlay(imageUrl, latLngBounds, {
    opacity: 0.8,
    errorOverlayUrl: errorOverlayUrl,
    alt: "Image of Newark, N.J. in 1922. Source: The University of Texas at Austin, UT Libraries Map Collection.",
    interactive: true,
  }).addTo(map);

```

- opacity : 圖片的透明度，預設值為 1
- errorOverlayUrl : 原圖片加載失敗，需要替換的圖片
- alt : 當圖片沒加載成功，顯示替代文字
- interactive : 設定圖片是否能夠觸發 Mouse 事件，預設為 fasle

例如一開始 L.imageOverlay 的 interactive 設定為 false，並且監聽 click 事件，當點擊圖片透過 bindPopup 出現我是圖片的訊息，但因為 interactive 設定為 false 的關係，圖片不會觸發 click 事件

```javascript!

  const imageOverlay = L.imageOverlay(imageUrl, latLngBounds, {
    interactive: false,
  }).addTo(map);

  imageOverlay.on("click", (e) => {
    imageOverlay.bindPopup("我是圖片");
  });


```
