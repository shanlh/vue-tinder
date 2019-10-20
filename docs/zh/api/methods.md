# 方法

## decide

* 参数: `type`
* 类型：`String`
* 可选值：`'like'|'nope'|'super'`

```html
<vue-tinder ref="tinder" ... >
  ...
<vue-tinder>
```

```js {5,8,11}
export default {
  ...
  methods: {
    like() { // 右滑
      this.$refs['tinder'].decide('like')
    },
    nope() { // 左滑
      this.$refs['tinder'].decide('nope')
    },
    superLike() { // 上滑
      this.$refs['tinder'].decide('super')
    }
  }
}
```

## rewind <Badge text="new" type="tip" vertical="middle"/>

* 参数： `rewindList`
* 类型： `Array`

只要保证传入的是数组，可以根据需要 rewind 一个或多个。

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
