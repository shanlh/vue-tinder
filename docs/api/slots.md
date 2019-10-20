# Slots

## Default slot

It will be inserted indirectly into each sub-component `TinderCard` of `VueTinder`, which is the content inside the "card".

```html
<vue-tinder ... >
  <!-- The content inserted here will be displayed the same in each card. -->
  ...
</vue-tinder>
```

## Scoped Slots

* Argument: `{ index,data }`

Reusable slot for obtaining data from subcomponents, used to customize the contents of the card, `index` is the index value of the card, `data` is each object in `queue`, and the property value is obtained as follows:

```html
<vue-tinder :queue.sync="queue">
  <template slot-scope="scope">
    index:  {{ scoped.index }}
    status: {{ scoped.status }}
    data:   {{ scope.data }}
  </template>
  <!-- Or directly deconstruct the scoped slot, which will make the scope slots cleaner. -->
  <!--
  <template slot-scope="{index, status, data}">
    index: {{ index }}
    status:{{ status }}
    data:  {{ data }}
  </template>
  -->
<vue-tinder>
```

* See also: [Destructuring-Slot-Props](https://vuejs.org/v2/guide/components-slots.html#Destructuring-Slot-Props)

## like

The slot that will gradually become opaque during the right sliding process, the opacity is automatically controlled by `VueTinder`, and only the slot content and style need to be customized.

The response range is controlled by `pointerThreshold` (default 0.5).

```html
<vue-tinder :pointer-threshold="0.5" ... >
  <template slot="like">
    ...
  </template>
  <!-- Or -->
  <!-- <img src="..." slot="like"/> -->
</vue-tinder>
```

## nope

The slots that are gradually opaque during the left-sliding process, and the rest of the features are as above.

## super

The slot that gradually becomes opaque during the sliding process, except for the response range is different from like/nope, the other features are as above.

The response range is controlled by `super-threshold` (default 0.5).

## rewind

The slot that disappears and then disappears when the `rewind` operation is executed.