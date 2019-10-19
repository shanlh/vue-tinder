# How To Click？

In the previous section, we can only decide whether to like it by sliding. Sometimes the user may not want to slide. The `VueTinder` also thinks about this. I have prepared some methods for you to perform operations for the user. The examples are as follows:

<iframe width="100%" height="667" src="https://codesandbox.io/embed/vue-tinder-how-to-click-k03bo" allowpaymentrequest allowfullscreen="allowfullscreen" frameborder="0"></iframe>

First, we need to add a click button:

``` html
<vue-tinder ref="tinder">...</vue-tinder>
<div class="btns">
  <img src="~img/nope.png" @click="decide('nope')">
  <img src="~img/super-like.png" @click="decide('super')">
  <img src="~img/like.png" @click="decide('like')">
</div>
```

You may have noticed that we added `ref` to `VueTinder`. Yes, we need to call `VueTinder` to execute the operation via `ref`. Let's see what to do:

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

Very simple, you only need to call the `decide` method, passing in the corresponding operation, such as: nope, like, super.

But what if the user wants to return because of a mistake? Please see the next section: [Oops!](/guide/oops)