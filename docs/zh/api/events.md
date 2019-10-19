# 事件

## submit

* 返回值：`{type, key, item}`

移除卡片后的回调函数，会由 `VueTinder` 通过 `$emit` 来触发，如需在移除卡片后做处理，需要在组件上监听，如：

```html
<vue-tinder @submit="onSubmit" ... >
  ...
<vue-tinder>
```

```js
export default {
  ...
  methods: {
    onSubmit(choice) {
      // choice.type： 结果，'like'：右滑, 'nope'：左滑, 'super'：上滑
      // choice.key：  被移除卡片的 keyName
      // choice.item： queue 中的子对象
    }
  }
}
```