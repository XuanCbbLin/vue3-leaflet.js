###### tags: `鐵人賽`

# day19 Leaflet.draw 套件

接下來有幾天要來介紹 Leaflet.draw 套件的使用。

## 引入套件

1. 執行 pnpm i leaflet-draw
2. 分別引入 JS 和 CSS

```javascript!
import "leaflet-draw/dist/leaflet.draw";
import "leaflet-draw/dist/leaflet.draw.css";
```

## 建立繪圖工具

1. 建立繪圖資料加到 map

```javascript!
onMounted(() => {
  const drawnItems = new L.FeatureGroup();
  map.addLayer(drawnItems);
})
```

2. 建立繪圖的控制元件
   前面建立繪圖資料後現在要在地圖產生繪圖工具。

```javascript!
const drawControl = new L.Control.Draw({
    edit: {
      featureGroup: drawnItems,
    }
  });
  map.addControl(drawControl);
```

繪圖工具:

![](https://i.imgur.com/m8zykxT.png)

## 繪圖相關設定

1. 關掉繪圖工具
   新增 draw 設定 false 就可將繪圖工具關掉

```javascript!
const drawControl = new L.Control.Draw({
    edit: {
      featureGroup: drawnItems,
    },
    draw: false,
  });
```

2. 繪圖工具設定幾個圖形關閉
   例如將想將 polygon 和 marker 關掉，也是可以個別設定 polygon 和 marker 關掉

```javascript!
 draw: {
      polygon: false,
      marker: false,
    },
```

## 繪圖事件

以下官方提供兩種寫法
http://leaflet.github.io/Leaflet.draw/docs/leaflet-draw-latest.html#l-draw-event

第一種寫法 :

這裡監聽 created 事件，透過 e.layer 將繪製後的圖形加入地圖圖層

```javascript!
 map.on(L.Draw.Event.CREATED, function (e) {
    console.log(e);

    const layer = e.layer;
    map.addLayer(layer);
  });
```

第二種寫法 :

```javascript!
 map.on("draw:created", function (e) {
    const layer = e.layer;
    map.addLayer(layer);
    console.log(e);
  });
```

## 補充

使用 toolbar 的 rectangle 繪製矩形會出現
![](https://i.imgur.com/glT3UzC.png)

參考以下方式處理，在 draw 的 option 設定 rectangle: { showArea: false }
https://stackoverflow.com/questions/57433144/leaflet-draw-on-rectangle-draw-it-throws-error
