# 方法

## decide

* 参数类型：`String`
* 可选值：`'like'|'nope'|'super'`

```html
<vue-tinder ref="tinder" ... >
  ...
<vue-tinder>
```
```js
export default {
  ...
  methods: {
    like() { // 相当于右滑
      this.$refs['tinder'].decide('like')
    },
    nope() { // 相当于左滑
      this.$refs['tinder'].decide('nope')
    },
    superLike() { // 相当于上滑
      this.$refs['tinder'].decide('super')
    }
  }
}
```

## rewind

* 参数类型：`Array`

只要保证传入的是数组，可以根据需要 rewind 一个或多个。

```html
<vue-tinder ref="tinder" ... >
  ...
<vue-tinder>
```
```js
export default {
  ...
  methods: {
    rewind() {
      this.$refs['tinder'].rewind([{id: 1}, {id: 2}])
    }
  }
}
```
