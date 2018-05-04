# 插槽

## 默认插槽

会间接插入到 `vue-tinder` 的每个子组件 `tinder-card` 中，即 “卡片” 内的内容。一般都会有自定义每张卡片的需求，详见 [scoped slot](/slot#scoped-slot)

```html
<tinder ... >
  <!-- 会在每张卡片中相同的显示这里插入的内容 -->
  ...
</tinder>
```

## 作用域插槽

* 参数：`{ index,data }`

可从子组件获取数据的可复用的插槽，用于自定义卡片的内容，`index` 为卡片的索引值，`data` 是 `queue` 中每个对象，属性值获取方法如下：

```html
<div id="app">
  <tinder :queue.sync="queue">
    <template slot-scope="scope">
      index: {{scoped.index}}
      key: {{scope.data.key}}
      name: {{scope.data.name}}
    </template>
    <!-- 或直接解构 scoped slot，这会使作用域插槽变得更干净一些。 -->
    <!--
    <template slot-scope="{data, index}">
      index: {{index}}
      key: {{data.key}}
      name: {{data.name}}
    </template>
    -->
  <tinder>
</div>
```

```js
new Vue({
  el: '#app',
  data: {
    queue: [{
      key: 1,
      name: 'Johnny'
    }, {
      key: 2,
      name: 'Dan'
    }]
  }
})
```

* 参考
 * [解构 slot-scope](https://cn.vuejs.org/v2/guide/components-slots.html#%E8%A7%A3%E6%9E%84-slot-scope)

## like

右滑过程中会逐渐不透明的插槽，不透明度已由 `vue-tinder` 自动控制，仅需自定义插槽内容及样式即可。

响应范围由 `pointer-threshold` 控制（默认0.5）。

```html
<tinder :pointer-threshold="0.5" ... >
  <!-- 带上slot="like"，怎样都行 -->
  <template slot="like">
    ...
  </template>
  <!-- 或 -->
  <!-- <img src="..." slot="like"/> -->
</tinder>
```

* 参考
 * [属性 pointer-threshold](/properties#pointer-threshold)

## nope

左滑过程中会逐渐不透明的插槽，其余特性如上。

```html
<tinder :pointer-threshold="0.5" ... >
  <!-- 带上slot="nope"，怎样都行 -->
  <template slot="nope">
    ...
  </template>
  <!-- 或 -->
  <!-- <img src="..." slot="nope"/> -->
</tinder>
```

* 参考
 * [属性 pointer-threshold](/properties#pointer-threshold)

## super

上滑过程中会逐渐不透明的插槽，除响应范围与like/nope不同外，其余特性如上。

响应范围由 `super-threshold` 控制（默认0.5）。

```html
<tinder :pointer-threshold="0.5" ... >
  <!-- 带上slot="super"，怎样都行 -->
  <template slot="super">
    ...
  </template>
  <!-- 或 -->
  <!-- <img src="..." slot="super"/> -->
</tinder>
```

* 参考
 * [属性 super-threshold](/properties#super-threshold)