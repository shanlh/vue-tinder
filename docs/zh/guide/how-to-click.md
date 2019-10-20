# 如何点击？

在上一节中，我们只能通过滑动来决定是否喜欢，有些时候用户可能并不想滑动，`VueTinder` 也想到了这点，为你准备了一些方法来为用户执行操作，示例如下：

<iframe width="100%" height="667" src="https://codesandbox.io/embed/vue-tinder-how-to-click-k03bo" allowpaymentrequest allowfullscreen="allowfullscreen" frameborder="0"></iframe>

首先，我们需要添加点击按钮：

``` html
<vue-tinder ref="tinder">...</vue-tinder>
<div class="btns">
  <img src="~img/nope.png" @click="decide('nope')">
  <img src="~img/super-like.png" @click="decide('super')">
  <img src="~img/like.png" @click="decide('like')">
</div>
```

你可能已经注意到我们为 `VueTinder` 加上了 `ref`，是的，我们需要通过 `ref` 来调用 `VueTinder` 提供的方法来执行操作，接下来看看怎么做吧：

``` js
export default {
  ...
  methods: {
    decide (choice) {
      this.$refs.tinder.decide(choice)
    }
  }
}
```

很简单吧，你只需要调用 `decide` 方法，传入对应的操作，如：nope、like、super 即可。

可是如果用户因为误操作想要返回该怎么办呢？请看下节：[Oops!](/zh/guide/oops)