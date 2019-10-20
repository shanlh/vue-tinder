# 插槽

## 默认插槽

会间接插入到 `VueTinder` 的每个子组件 `TinderCard` 中，即 “卡片” 内的内容。

```html
<vue-tinder ... >
  <!-- 会在每张卡片中相同的显示这里插入的内容 -->
  ...
</vue-tinder>
```

## 作用域插槽

* 参数：`{ index,data }`

可从子组件获取数据的可复用的插槽，用于自定义卡片的内容，`index` 为卡片的索引值，`data` 是 `queue` 中每个对象，属性值获取方法如下：

```html
<vue-tinder :queue.sync="queue">
  <template slot-scope="scope">
    index:  {{ scoped.index }}
    status: {{ scoped.status }}
    data:   {{ scope.data }}
  </template>
  <!-- 或直接解构 scoped slot，这会使作用域插槽变得更干净一些。 -->
  <!--
  <template slot-scope="{index, status, data}">
    index: {{ index }}
    status:{{ status }}
    data:  {{ data }}
  </template>
  -->
<vue-tinder>
```

* 参考: [作用域插槽](https://cn.vuejs.org/v2/guide/components-slots.html#%E4%BD%9C%E7%94%A8%E5%9F%9F%E6%8F%92%E6%A7%BD)

## like

右滑过程中会逐渐不透明的插槽，不透明度已由 `VueTinder` 自动控制，仅需自定义插槽内容及样式即可。

响应范围由 `pointerThreshold` 控制（默认0.5）。

```html
<vue-tinder :pointer-threshold="0.5" ... >
  <template slot="like">
    ...
  </template>
  <!-- 或 -->
  <!-- <img src="..." slot="like"/> -->
</vue-tinder>
```

## nope

左滑过程中会逐渐不透明的插槽，其余特性如上。

## super

上滑过程中会逐渐不透明的插槽，除响应范围与 like/nope 不同外，其余特性如上。

响应范围由 `super-threshold` 控制（默认 0.5 ）。

## rewind

执行 `rewind` 操作时会短暂显示然后消失的插槽。