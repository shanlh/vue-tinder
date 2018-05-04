# 属性

## ref

* 类型：`String`

为 `tinder` 注册引用信息，可通过 `this.$refs[ '所填写的该属性值' ]` 获取实例来调用 `vue-tinder` 内的方法。

* 参考：
  * [方法 - decide](/methods#decide)

## key-name

* 类型：`String`
* 默认值：`key`

<!-- 如果 `queue` 数组内对象有 **名为key且独立的属性** ，则无需额外配置了 -->

```html
<div id="app">
  <tinder key-name="id" :queue.sync="queue">
    ...
  <tinder>
</div>
```
```js
new Vue({
  el: '#app',
  data: {
    queue: [{
      // key: 1 （若不设置key-name，会默认使用key，请确保存在且独立）
      id: 1
    }, {
      id: 2
    }]
  }
})
```

!> 注意，由于 `vue-tinder` 内使用了 `transition-group`，每个 `<transition-group>` 的子节点必须有 **独立的 key** ，动画才能正常工作，所以在 `queue` 中所对应的 `key-name` 也需要存在且独立，`vue-tinder` 才能正常工作。

被移除卡片的 `key-name` 会在自定义事件 `submit` 中作为参数传递，您在移除卡片的回调中可能会需要用到。

* 参考：
  * [自定义事件 - submit](/events#submit)

## allow-super

* 类型：`Boolean`
* 默认值：`true`

是否允许响应上滑事件。在开启状态下上滑，`slot="super"` 会有透明度变化，手指离开屏幕时会考虑上滑位置是否符合移除卡片的条件，且只有在开启状态下才有可能在 `自定义事件 submit` 中获取到值为 `super` 的type。

```html
<tinder :allow-super="true" ... >
  ...
<tinder>
```

可通过设置 `super-threshold` 来调整向上滑动的移除响应区域。

* 参考：
  * [属性 - super-threshold](/properties#super-threshold)

## pointer-threshold

* 类型：`Number`
* 默认值：`0.5`

横向移动位移占卡片宽度比例，超出时松手会执行对应事件（nope/like）

## super-threshold

* 类型：`Number`
* 默认值：`0.5`

向上移动位移占卡片高度比例，超出时松手会执行对应事件（super）