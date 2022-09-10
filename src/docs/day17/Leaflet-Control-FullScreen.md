###### tags: `鐵人賽`

# day17 leaflet.fullscreen 套件

leaflet.fullscreen 可以控制地圖是否進入全屏模式，還有提供其他 option 設定按鈕元件。

## 載入 leaflet.fullscreen 套件

我用 pnpm i @bepo65/leaflet.fullscreen 將套件載入，vue 檔分別引入底下兩個 JS 和 CSS 檔案。

```javascript!
import "@bepo65/leaflet.fullscreen/Control.FullScreen";
import "@bepo65/leaflet.fullscreen/Control.FullScreen.css";
```

## fullscreen 選項設定

fullscreen 的按鈕也是在 onMounted 階段建立並且放在地圖上。

```javascript!

onMounted(() => {
    new L.Map(mapContent.value, {
        fullscreenControl: true,
        fullscreenControlOptions: {
          position: "topleft",
          title: "進入全螢幕",
          titleCancel: "離開全螢幕",
          content: null,
          forceSeparateButton: true,
          forcePseudoFullscreen: false,
    },
  });
}

```

1. fullscreenControl : 設定全螢幕按鈕是否顯示在地圖上。
2. fullscreenControlOptions : 用來設定全螢幕按鈕的狀態

   - position : 全螢幕按鈕地圖上顯示的位置
   - title : 設定地圖進入全螢幕前按鈕要顯示的內容
   - titleCancel : 地圖進入全螢幕後但還沒退出全螢幕，按鈕要顯示的內容
   - content : 可在全螢幕按鈕裡新增 html，預設 null
   - forceSeparateButton : 全螢幕按鈕是否跟縮放控制按鈕分開，預設 false
   - forcePseudoFullscreen : 設定全螢幕目地圖是否佔滿整個螢幕
     true : 設定地圖寬高撐滿但不會佔滿整個螢幕
     例如目前寬高各設定 600px，forcePseudoFullscreen 設定 true

   ![](https://i.imgur.com/ZHCM5Uz.png)

   當點擊全螢幕按鈕地圖就會被撐開，但網址列還看的到

   ![](https://i.imgur.com/PXaPvzo.png)

   false : 設定地圖佔滿整個螢幕

   這時候地圖會佔滿整個螢幕連網址列都看不到
   ![](https://i.imgur.com/aAu0Uzd.png)

## fullscreen 監聽事件

map 物件可以監聽 enterFullscreen 和 exitFullscreen 事件。

```javascript!
map.on("enterFullscreen", function () {
    console.log("entered fullscreen");
});

or

map.on('exitFullscreen', function(){
  console.log('exited fullscreen');
});

```

## 參考資料

https://github.com/BePo65/leaflet.fullscreen
https://www.letswrite.tw/leaflet-plugins/#%e5%85%a8%e8%9e%a2%e5%b9%95%ef%bc%9aleafletcontrolfullscreen
