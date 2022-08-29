###### tags: `鐵人賽`

# day11 地圖上建立 video 圖層和 svg 圖層

## video 圖層

一般在建立播放器時會使用 video 標籤建立播放器，在地圖上可以用 L.videoOverlay() 方式建立 video

L.videoOverlay 參數:

    L.videoOverlay(<String|Array|HTMLVideoElement> video, <LatLngBounds> bounds, <VideoOverlay options> options?)

- video: 可用字串、陣列、html 標籤建立播放器
- bounds 播放器在地圖上的座標
- options 設定播放器狀態

1. 建立地圖和底圖

```javascript!

onMounted(() => {
  const map = L.map(mapContainer.value);
  const tiles = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

});

```

2. 先建立播放器連結

```javascript!

const videoUrls = "https://www.mapbox.com/bites/00188/patricia_nasa.mp4";

```

3. 使用 L.latLngBounds 建立播放器座標

```javascript!

const bounds = L.latLngBounds([
  [32, -130],
  [13, -100],
]);

```

4. 使用 L.videoOverlay 將播放器新增到地圖上，並且使用 fitBounds() 設定到播放器位置

```javascript!

const errorOverlayUrl = "https://cdn-icons-png.flaticon.com/512/110/110686.png";

let videoOverlay = {};

onMounted(() => {

  map.fitBounds(bounds);

  videoOverlay = L.videoOverlay(videoUrls, bounds, {
    opacity: 1,
    errorOverlayUrl: errorOverlayUrl,
    interactive: true,
    autoplay: true,
    loop: false,
  }).addTo(map);
});

```

- opacity 設定播放器的透明度，預設 1
- errorOverlayUrl : 播放器來源壞掉時取代的連結
- interactive : 設定是否能在播放器設定 mouse 事件
- autoplay : 設定播放器加載時是否先播放
- loop :　設定播放器是否重複播放

建立的播放器：
![](https://i.imgur.com/2tPpAg3.png)

### 播放器新增播放和暫停

1. 建立暫停和播放按鈕，監聽 click 事件觸發 videoPause 和 videoPlay

```htmlmixed!

<div class="absolute z-500 top-5 right-3 text-xl">
    <div class="mb-2" @click="videoPause">⏸</div>
    <div @click="videoPlay">▶️</div>
</div>

```

2. 使用 getElement() 獲取當下的播放器，並且用 pause() 或 play() 控制播放器

```javascript!

let videoOverlay = {};

onMounted(() => {

  videoOverlay = L.videoOverlay(videoUrls, bounds, {
    opacity: 1,
    errorOverlayUrl: errorOverlayUrl,
    interactive: true,
    autoplay: true,
    loop: false,
  }).addTo(map);
});

const videoPause = () => {
  videoOverlay.getElement().pause();
};

const videoPlay = () => {
  videoOverlay.getElement().play();
};

```

## svg 圖層

除了前面講的在地圖上建立圖片和影片圖層，也可使用 L.SVGOverlay() 在地圖上建立 svg 圖層

L.svgOverlay 參數

    L.svgOverlay(<String|SVGElement> svg, <LatLngBounds> bounds, <SVGOverlay options> options?)

svg: svg 節點
bounds : svg 的座標
options : svg 的狀態設定

1. 建立 svg 節點，並且使用 ref 獲取 svg 節點

```htmlembedded!

  <svg viewBox="0 0 200 200" ref="svg">
      <rect width="200" height="200"></rect>
      <rect x="75" y="23" width="50" height="50" fill="red"></rect>
      <rect x="75" y="123" width="50" height="50" fill="#0013ff"></rect>
  </svg>

```

```javascript!
<script setup>
const svg = ref(null);
</script>
```

2. 建立地圖和底圖

```javascript!

const latLngBounds = L.latLngBounds([
  [32, -130],
  [13, -100],
]);

onMounted(() => {
  const map = L.map(mapContainer.value);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

   map.fitBounds(latLngBounds);

});

```

3. 使用 L.svgOverlay 在地圖上建立 svg 圖層

```javascript!

onMounted(() => {
  L.svgOverlay(svg.value, latLngBounds, {
    opacity: 0.7,
    interactive: true,
  }).addTo(map);
});

```

svg 圖層:
![](https://i.imgur.com/fL9ftvF.png)
