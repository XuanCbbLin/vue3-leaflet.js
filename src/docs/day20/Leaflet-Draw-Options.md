###### tags: `鐵人賽`

# day20 leaflet.draw options 設定

今天要介紹繪圖時要怎麼設定圖形的狀態。

官方文件 :
http://leaflet.github.io/Leaflet.draw/docs/leaflet-draw-latest.html#options

## options 的 draw 設定

```javascript!
const options = {
    position: "topright",
    draw: {
      polyline: {
        shapeOptions: {
          color: "#f357a1",
          weight: 10,
        },
      },
      polygon: {
        allowIntersection: false,
        drawError: {
          color: "red",
          message: "不給香蕉喔!",
        },
        shapeOptions: {
          color: "#f357a1",
          opacity: 0.8,
          clickable: true,
        },
      },
      circle: false,
      rectangle: {
        showArea: false,
      },
    },
    edit: {
      featureGroup: drawnItems,
      remove: true,
    },
  };

```

1. shapeOptions
   圖形的顏色、尺寸等設定

```javascript!
    polyline: {
        shapeOptions: {
          color: "#f357a1",
          weight: 10,
        },
      },
```

2. allowIntersection 和 drawError

allowIntersection :　設定繪圖時是否能跨過
drawError :　顯示繪圖錯誤的訊息

將　 allowIntersection 　設定 false， drawError 設定畫圖錯誤時顯示紅色和訊息，底下使用 polygon 畫圖並且跨過多邊形邊界

![](https://i.imgur.com/Mszagef.png)

```javascript!
    polygon: {
        allowIntersection: false,
        drawError: {
          color: "red",
          message: "不給香蕉喔!",
        },
        shapeOptions: {
          color: "#f357a1",
          opacity: 0.8,
          clickable: true,
        },
      },
```
