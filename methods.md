# 方法

## decide

* 参数：`String`
* 可选值：`'like'|'nope'|'super'`

```html
<div id="app">
  <tinder ref="tinder" ... >
    ...
  <tinder>
</div>
```
```js
new Vue({
  el: '#app',
  ...
  methods: {
    like () { // 相当于右滑
      this.$refs['tinder'].decide('like')
    },
    nope () { // 相当于左滑
      this.$refs['tinder'].decide('nope')
    },
    superLike () { // 相当于上滑
      this.$refs['tinder'].decide('super')
    }
  }
})
```
