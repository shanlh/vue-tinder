## queue.sync

* 类型：`Array`
* 默认值：`[]`

用于存放卡片的队列。

::: warning
请不要去除 `queue` 的 `.sync` 修饰符，`VueTinder` 会根据你的滑动操作来对 `queue` 进行修改。[为什么这么做？](https://cn.vuejs.org/v2/guide/components-custom-events.html#sync-%E4%BF%AE%E9%A5%B0%E7%AC%A6)
:::

## keyName

* 类型：`String`
* 默认值：`key`

```html
<vue-tinder key-name="id" :queue.sync="queue">
  ...
<vue-tinder>
```

```js
export default {
  data: {
    queue: [{
      // key: 1 （若不设置key-name，会默认使用key，请确保存在且独立）
      id: 1
    }, {
      id: 2
    }]
  }
}
```

::: warning
由于 `vue-tinder` 内使用了 `transition-group`，每个 `<transition-group>` 的子节点必须有 **独立的 key** ，动画才能正常工作，所以在 `queue` 中所对应的 `key-name` 也需要存在且独立，`VueTinder` 才能正常工作。
:::

被移除卡片的 `key-name` 会在自定义事件 `submit` 中作为参数传递，你在移除卡片的回调中可能会需要用到。

## scaleStep

* 类型：`Number`
* 默认值：`0.05`

卡片间缩放步长。默认值为 0.05 即表明：第二个卡片的 scale 大小为 0.95，依此类推第三个为 0.9。

## offsetY

* 类型：`Number`
* 默认值：`0`

卡片间距。如果大于 0，卡片会以对应 px 的距离向下堆叠。相反的，如果小于 0，则卡片会往上堆叠。如需修改 css 单位，请修改 offsetUnit。

::: warning
如果对浏览器兼容性有要求，请酌情使用，因为内部计算使用了 `calc`
:::

## offsetUnit

* 类型：`String`
* 默认值：`px`

卡片间距的 CSS 单位。

## allowSuper

* 类型：`Boolean`
* 默认值：`true`

是否允许响应上滑事件。在开启状态下上滑时，`slot="super"` 会有透明度变化，手指离开屏幕时会考虑上滑位置是否符合移除卡片的条件，且只有在开启状态下才有可能在 `事件：submit` 中获取到值为 `super` 的 type。

## superThreshold

* 类型：`Number`
* 默认值：`0.5`

向上移动直至消失时，移动距离占卡片高度的比例，默认移动 1/2 高度便符合移出条件。

## pointerThreshold

* 类型：`Number`
* 默认值：`0.5`

横向移动直至消失时，移动距离占卡片 "一半宽度" 的比例，因为是占卡片一半宽度的比例，所以默认 0.5 便相当于 1/4（0.5*0.5）卡片宽度。

## sync

* 类型：`Boolean`
* 默认值：`false`

执行下次操作是否需要等卡片完全消失。

## max

* 类型：`Number`
* 默认值：`3`

最大渲染个数，为了保证性能，尽量把值设得小些。`VueTinder` 为了实现预备卡片渐入的效果，会在 max 的基础上额外渲染一个。