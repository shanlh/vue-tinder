# Start With Bing Images

> The case code in the tutorial will be written using ES2015.

::: tip
This tutorial uses [BING Images](https://bing.com/)
:::

As the first step in understanding this plugin, we will be doing a Bing Images that you can choose whether you like it or not. Let's take a look at the results.

<iframe width="100%" height="667" src="https://codesandbox.io/embed/vue-tinder-bing-images-zufp4" allowpaymentrequest allowfullscreen="allowfullscreen" frameborder="0"></iframe>

First, we need to write a template with the following content (the code that is not important is omitted):

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

In the template, we bind `queue.sync` to the `VueTinder` as the data source. This queue is looped inside `VueTinder` and listens for the component's `submit` event using a method called `onSubmit`. The `offset-y` attribute is configured so that the card is separated from the card by `10px`. If you use `rem` for mobile adaptation, you can modify the css unit of the card spacing by modifying `offsetUnit`.

::: warning
Please don't remove the `.sync` modifier of `queue`, `VueTinder` will modify `queue` according to your sliding operation. [Why do this?](https://vuejs.org/v2/guide/components-custom-events.html#sync-Modifier)
:::

We also set the property `keyName` for `VueTinder` so that `VueTinder` knows how to set `key` for the internal `v-for`. The default value of this property is `key`. If it happens to be the same as yours, you don't have to set it.

It is worth mentioning that you also need to specify a width and height for VueTinder, such as:

``` css
.vue-tinder {
  width: 335px;
  height: 447px;
}
```

This is important for `VueTinder`, which requires height for internal touch events in order to achieve moving animations for different starting positions.

The next step is to get the data and accept the result of the operation. When the result is returned, you can judge whether you need to append the data according to the actual situation. The mock method used in the example is `only for the schematic` ,`Do not` copy directly. You can modify it according to the actual situation:

```js
import source from '@/where/source' // Such as: [ {id: 'AdelieBreeding_ZH-CN1750945258'} , ... ]

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
      // type: result，'like': swipe right, 'nope': swipe left, 'super': swipe up
      // key:  The keyName of the removed card
      // item: Child object in queue
      if (this.queue.length < 3) {
        this.mock()
      }
    }
  }
}
```

Now, you have completed a Bing Images that you can choose with `VueTinder`. What else? Please see the next section: [How To Click?](/guide/how-to-click) →