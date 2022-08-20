###### tags: `鐵人賽`

# day9

# 地圖設定 scale、zoom 控制地圖和圖層建立時的優先層級

## 地圖設定 scale、zoom 控制地圖

leaflet 有提供控制地圖縮放和建立控制比例元件

### L.control.scale

使用 L.control.scale 可以在地圖上建立控制地圖比例的元件

    L.control.scale(<Control.Scale options> options?)

```javascript!

L.control
    .scale({
      maxWidth: 200,
      updateWhenIdle: false,
      position: "topright",
    })
    .addTo(map);

```

maxWidth : 比例元件的最大寬度
updateWhenIdle : 設定 true 或 false

- true : 控制元件在 mouseend 事件後會更新控制元件寬度
- false : 控制元件在移動地圖就會更新寬度

position : 控制元件在地圖上的位置，預設 topright 在地圖右上角

![](https://i.imgur.com/BZxSVAa.png)

### 設定 zoom

- setView(center, zoom) : 設定地圖中心和 zoom 等級

```javascript!
map.setView([23.611, 120.768], 8);
```

- flyTo(center, zoom) : 設定地圖用動畫的方式移動到另一個位置

例如目前位置在[23.611, 120.768]
如果要移動到[24.27701247166408, 120.96496582031251]就可以設定 map.flyTo([24.27701247166408, 120.96496582031251], 14);
這時地圖就會用動畫方式移動

- zoomIn() : 使用地圖控制元件+號或使用程式控制 zoom，可設定增加的比例預設為 1

```javascript!
map.zoomIn(2);
```

- zoomOut() : 跟 zoomIn 一樣可設定 zoom 的倍數，但 zoomOut 是設定遞減的倍數

```javascript!
map.zoomOut(3);
```

## 圖層建立時的優先層級

leaflet 再建立圖層時是用 z-index 建立圖層的優先順序，默認圖層的順序:

1. Popups
2. Marker 圖標
3. Marker 陰影
4. Paths，例如線、折線、圓或 GeoJSON 圖層
5. TileLayers 和 GridLayers

官方文件: https://leafletjs.com/reference.html#map-pane

官方 css 的設定 https://github.com/Leaflet/Leaflet/blob/v1.0.0/dist/leaflet.css#L87

建立地圖時可看到每個圖層都有共用的 class 名稱:leaflet-pane 預設 z-index:400
![](https://i.imgur.com/JsSJxh6.png)

為了讓地圖建立的每個圖層有順序就會依照每個圖層設定 z-index
![](https://i.imgur.com/InEJrpC.png)
