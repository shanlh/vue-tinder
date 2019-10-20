## queue.sync

* Type: `Array`
* Default: `[]`

A queue for storing cards.

::: warning
Please don't remove the `.sync` modifier of `queue`, `VueTinder` will modify `queue` according to your sliding operation. [Why do this?](https://vuejs.org/v2/guide/components-custom-events.html#sync-Modifier)
:::

## keyName

* Type: `String`
* Default: `key`

```html
<vue-tinder key-name="id" :queue.sync="queue">
  ...
<vue-tinder>
```

```js
export default {
  data: {
    queue: [{
      // key: 1 （If you do not set the key-name, the 'key' will be used by default. Please ensure that it exists and is independent）
      id: 1
    }, {
      id: 2
    }]
  }
}
```

::: warning
Since `vue-tinder` uses `transition-group`, each child of `<transition-group>` must have **independent key**, the animation can work normally, so it corresponds to `queue` The `key-name` also needs to exist and be independent, and `VueTinder` will work properly.
:::

The removed card's `key-name` will be passed as a parameter in the custom event `submit`, which you may need to use in the callback to remove the card.

## scaleStep

* Type: `Number`
* Default: `0.05`

The step size between cards. The default value of 0.05 means that the scale of the second card is 0.95, and so on, the third is 0.9.

## offsetY

* Type: `Number`
* Default: `0`

Card spacing. If it is greater than 0, the cards will be stacked down at a distance corresponding to px. Conversely, if it is less than 0, the cards will be stacked up. To modify the css unit, modify the offsetUnit.

::: warning
If there is a requirement for browser compatibility, please use it as appropriate because the internal calculation uses `calc`
:::

## offsetUnit

* Type: `String`
* Default: `px`

The css unit of card spacing.

## allowSuper

* Type: `Boolean`
* Default: `true`

Whether to allow a response to a slip event. When sliding up in the open state, `slot="super"` will change its transparency. When the finger leaves the screen, it will consider whether the upsliding position meets the conditions for removing the card, and it is only possible to customize in the open state. The type of the value `super` is obtained in the `event: submit`.

## superThreshold

* Type: `Number`
* Default: `0.5`

When moving up until it disappears, the moving distance is proportional to the height of the card. By default, the 1/2 height is in accordance with the removal condition.

## pointerThreshold

* Type: `Number`
* Default: `0.5`

When moving horizontally until it disappears, the moving distance is proportional to the "half width" of the card. Because it is the ratio of half the width of the card, the default of 0.5 is equivalent to 1/4 (0.5*0.5) card width.

## sync

* Type: `Boolean`
* Default: `false`

Do you need to wait for the card to disappear completely after performing the next operation.

## max

* Type: `Number`
* Default: `3`

The maximum number of renderings, in order to ensure performance, try to set the value smaller. `VueTinder` In order to achieve the effect of the preliminary card fade-in, an additional one will be rendered on the basis of max.