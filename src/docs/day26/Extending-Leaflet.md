###### tags: `鐵人賽`

# day26 Extending Leaflet

這裡要來介紹 leaflet.js 提供什麼樣的特性能夠開發套件

## 常見方法介紹

### L.Class.extend()

建立類別資料

```javascript!
const MyDemoClass = L.Class.extend({
  myDemoProperty: 42,
});

const myDemoInstance = new MyDemoClass();

console.log(myDemoInstance.myDemoProperty);

```

### L.Class.include()

將以建立好的類別擴充資料

新增屬性 newProperty

```javascript!
const MyDemoClass = L.Class.extend({
  myDemoProperty: 42,
});

MyDemoClass.include({
  newProperty: 78,
});

const mySecondDemoInstance = new MyDemoClass();


console.log(mySecondDemoInstance.newProperty);
```

### L.Class.initialize()

如果要在初始化修改已建立的類別可用 L.setOptions() 修改

```javascript!
const MyBoxClass = L.Class.extend({
  options: {
    width: 1,
    height: 1,
  },

  initialize: function (name, options) {
    this.name = name;
    L.setOptions(this, options);
  },
});

var instance = new MyBoxClass("Red", { width: 10 });

console.log(instance.name);
console.log(instance.options.width);
console.log(instance.options.height);
```

## 參考資料

https://leafletjs.com/examples/extending/extending-1-classes.html
