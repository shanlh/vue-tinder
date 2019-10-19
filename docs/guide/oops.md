# Oops！

In the previous section, we can choose whether we like it by clicking, but what if the user wants to return because of a mistake? `VueTinder` provides you with a new method: `rewind`, you can see the effect first:

<iframe width="100%" height="667" src="https://codesandbox.io/embed/vue-tinder-preview-by7qi" allowpaymentrequest allowfullscreen="allowfullscreen" frameborder="0"></iframe>

First, we need to add a button that can be clicked on the Rewind operation. To make the experience better and make the source of the card more understandable, we can add an indicator `(optional)` for the Rewind operation, and `VueTinder` will be appropriate. When it is displayed or hidden, the template code is as follows:

``` html
<vue-tinder :queue.sync="queue" @submit="onSubmit">
  ...
  ...
  <img slot="rewind" src="~img/rewind-txt.png" />
</vue-tinder>

<img src="~img/rewind.png" @click="decide('rewind')">
```

Then write the core code for this example:

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

In the example, we use `history` to store the `item` of the executed operation, and you can store the history according to your preferences. Note that `VueTinder` can be more than `rewind` at the same time, so the incoming must be an array. If you only need `rewind`, you need to wrap it with `[]`.

Having said that, we have already finished the basics. You can understand the more advanced configuration by looking at the [API](/api).