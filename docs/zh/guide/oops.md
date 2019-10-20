# Oops！

在上一节中，我们可以通过点击来选择是否喜欢了，但如果用户因为误操作想要返回该怎么办呢？`VueTinder` 为你提供了新方法：`rewind`，可以先来看下效果：

<iframe width="100%" height="667" src="https://codesandbox.io/embed/vue-tinder-preview-by7qi" allowpaymentrequest allowfullscreen="allowfullscreen" frameborder="0"></iframe>

首先，我们需要添加一个可以点击进行 Rewind 操作的按钮，为了体验更好，让这张卡片的来源更明白，我们可以为 Rewind 操作增加一个指示器`(可选)`，`VueTinder` 会在合适的时候对其进行显示或隐藏，模版代码如下：

``` html
<vue-tinder :queue.sync="queue" @submit="onSubmit">
  ...
  ...
  <img slot="rewind" src="~img/rewind-txt.png" />
</vue-tinder>

<img src="~img/rewind.png" @click="decide('rewind')">
```

然后编写本例的核心代码：

``` js
export default {
  data: () => ({
    ...
    history: []
  }),
  ...
  methods: {
    decide(choice) {
      if(choice === 'rewind') {
        if(this.history.length) {
          this.$refs.tinder.rewind([this.history.pop()])
        }
        return
      }
      this.$refs.tinder.decide(choice)
    },
    onSubmit({item}) {
      ...
      this.history.push(item)
    }
  }
}
```

示例中，我们用 `history` 来存放被执行操作的 `item`，你可以根据喜好来存放历史。需要注意的是：`VueTinder` 可以同时 `rewind` 多个，所以传入的必须是个数组，如果你只需要 `rewind` 一个，也需要用 `[]` 将其包裹。

讲到这里，我们已经基本介绍完了，更高级的配置你可以通过查看 [API](/zh/api) 来了解。