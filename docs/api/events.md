# Events

## submit

* Return: `{type, key, item}`

The callback function after removing the card will be triggered by `VueTinder` via `$emit`. If you need to process the card after removing it, you need to listen on the component, such as:

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
      // choice.type => result，'like': swipe right, 'nope': swipe left, 'super': swipe up
      // choice.key  => The keyName of the removed card
      // choice.item => Child object in queue
    }
  }
}
```