# Methods

## decide

* Argument: `type`
* Type: `String`
* Available: `'like'|'nope'|'super'`

```html
<vue-tinder ref="tinder" ... >
  ...
<vue-tinder>
```

```js {5,8,11}
export default {
  ...
  methods: {
    like() { // Swipe right
      this.$refs['tinder'].decide('like')
    },
    nope() { // Swipe left
      this.$refs['tinder'].decide('nope')
    },
    superLike() { // Swipe up
      this.$refs['tinder'].decide('super')
    }
  }
}
```

## rewind <Badge text="new" type="tip" vertical="middle"/>

* Argument: `rewindList`
* Type: `Array`

As long as you are guaranteed to pass in an array, you can rewind one or more as needed.

```html
<vue-tinder ref="tinder" ... >
  ...
<vue-tinder>
```

```js {5}
export default {
  ...
  methods: {
    rewind() {
      this.$refs['tinder'].rewind([{id: 1}, {id: 2}])
    }
  }
}
```
