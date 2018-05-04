# 自定义事件

## submit

* 返回值：`{type, key}`

移除卡片后的回调函数，会由 `vue-tinder` 通过 `$emit` 来触发，如需在移除卡片后做处理，需要在 `vue-tinder实例` 上监听，如：

```html
<div id="app">
  <tinder @submit="submit" ... >
    ...
  <tinder>
</div>
```

```js
new Vue({
  el: '#app',
  ...
  methods: {
    submit (choice) {
      // choice.type => 'like'|'nope'|'super'
      // choice.key  => 被移除卡片的 key-name
    }
  }
})
```


* 参考
 * [属性 - key-name](/properties)