###### tags: `鐵人賽`

# day15 Popup 切換內容

昨天有講解過如何在 Popup 裡面新增想要顯示的內容，今天要實作 Popup 上新增能夠切換內容的元件。

## 功能說明

準備一個 PopupTabs.vue 裡面有 Map 和 IntroduceBox 元件 ，IntroduceBox 元件用來顯示內容。

## 實作

1. 準備 Map 元件
   這裡先拆 Map 元件並且傳入之後在 IntroduceBox 元件拿到的節點。

- PopupTabs.vue 引入 map 元件，並且將一開始建立的 dom Props 到 map 元件。

```javascript!
  <Map :dom="dom" />
```

```javascript!
import Map from "./Map.vue";

const dom = ref(null);
```

- Map 元件使用 watch 監聽 dom 的變化，當 IntroduceBox 在 onMounted 階段觸發拿到節點， map 元件的 marker 更新 popup。

```javascript!
const props = defineProps({
  dom: Object,
});
```

```javascript!

watch(
  () => props.dom,
  (newDom) => {
    marker.bindPopup(newDom);
  }
);

```

2. 建立 IntroduceBox 元件
   PopupTabs.vue 也是引入 IntroduceBox 元件，除了傳要顯示的內容給 IntroduceBox，也傳 getDom 函式處理接收到的節點。

- PopupTabs.vue

```javascript!

<IntroduceBox
    :currentName="currentName"
    :introduceData="introduceData"
    @getDom="getDom"
/>

```

```javascript!

const currentName = ref("tab");

const introduceData = reactive([
  {
    name: "tab",
    img: "https://picsum.photos/id/684/600/400",
    content: "Ipsum ratione nulla iure rem tempora, quasi quis minima consequatur",
  },
  {
    name: "tab2",
    img: "https://picsum.photos/id/685/600/400",
    content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit",
  },
]);

const getDom = (boxDom) => {
  dom.value = boxDom;
};

```

- IntroduceBox.vue
  接收 PopupTabs.vue 傳入的內容和 onMounted 階段，拿到節點時 emit 到 PopupTabs。

```javascript!

const props = defineProps({
  introduceData: Array,
  currentName: String,
});

const emit = defineEmits(["getDom"]);

const dom = ref(null);

onMounted(() => {
  emit("getDom", dom.value);
});

```

範例完成:
![](https://i.imgur.com/R8SRPIc.png)

範例連結:
https://github.com/XuanCbbLin/Vue3-leaflet/tree/master/src/components/PopupTabs
