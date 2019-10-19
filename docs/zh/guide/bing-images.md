# 从 Bing Images 开始

> 教程中的案例代码将使用 ES2015 来编写。

::: tip
本教程图片素材使用 [BING 美图](https://bing.com/)
:::

作为了解这款插件的第一步，我们将会做一个能选择是否喜欢的 Bing Images，先来看看结果吧，滑动卡片试试：

<iframe width="100%" height="667" src="https://codesandbox.io/embed/vue-tinder-bing-images-zufp4" allowpaymentrequest allowfullscreen="allowfullscreen" frameborder="0"></iframe>

首先，我们需要编写模板，内容大概如下（已省略不重要的代码）：

``` html
<vue-tinder key-name="id" :queue.sync="queue" :offset-y="10" @submit="onSubmit">
  <div
    slot-scope="scope"
    :style="{
      'background-image': `url(https://cn.bing.com//th?id=OHR.${scope.data.id}_UHD.jpg&pid=hp&w=720&h=1280&rs=1&c=4&r=0)`
    }"
  />
  <img slot="like" src="~img/like-txt.png" />
  <img slot="nope" src="~img/nope-txt.png" />
  <img slot="super" src="~img/super-txt.png" />
</vue-tinder>
```

在模板中，我们为 `VueTinder` 绑定了 `queue.sync` 作为数据源，在 `VueTinder` 内部会循环这个队列，并使用一个叫做 `onSubmit` 的方法监听组件的 `submit` 事件，我们还配置了 `offset-y` 属性，使卡片与卡片之间间隔了  `10px`，如果你使用 `rem` 来做移动端适配，可以通过修改 `offsetUnit` 来修改卡片间距的 css 单位。

::: warning
请不要去除 `queue` 的 `.sync` 修饰符，`VueTinder` 会根据你的滑动操作来对 `queue` 进行修改。[为什么这么做？](https://cn.vuejs.org/v2/guide/components-custom-events.html#sync-%E4%BF%AE%E9%A5%B0%E7%AC%A6)
:::

我们还为 `VueTinder` 设置了属性 `keyName`，这样 `VueTinder` 才知道如何为内部 `v-for` 设置 `key`，该属性默认值为 `key`，如果正好与你的一样则不必设置。

值得一提的是，你还需要为 `VueTinder` 规定一个宽高，如：

``` css
.vue-tinder {
  width: 335px;
  height: 447px;
}
```

这对 `VueTinder` 很重要，内部触摸事件需要用到高度，为了实现不同起始位置对应的移动动画。

接下来是获取数据、接受操作结果，当返回结果后可以根据实际情况判断是否需要追加数据，示例所用的 mock 方法`仅作示意`，`请勿直接复制`，你可根据实际情况进行修改：

```js
import source from '@/where/source' // 如: [ {id: 'AdelieBreeding_ZH-CN1750945258'} , ... ]

export default {
  data: () => ({
    queue: [],
    offset: 0
  }),
  created() {
    this.mock()
  },
  methods: {
    mock(count = 5) {
      const list = source.slice(this.offset, count)
      this.offset += count
      this.queue = this.queue.concat(list)
    },
    onSubmit(type, key, item) {
      // type： 结果，'like'：右滑, 'nope'：左滑, 'super'：上滑
      // key：  被移除卡片的 keyName
      // item： queue 中的子对象
      if (this.queue.length < 3) {
        this.mock()
      }
    }
  }
}
```

现在，你已经用 `VueTinder` 完成了一个可以选择是否喜欢的 Bing Images，还差点什么？请看下节：[如何点击？](/zh/guide/how-to-click) →