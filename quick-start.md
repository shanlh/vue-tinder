# 快速开始

> 教程中的案例代码将使用 ES2015 来编写。

此教程直接引用script，单文件组件使用方法类似，只是不需要v-cloak指令了，需要注意的是 `.v-tinder` 在组件中为scoped，属性选择器优先级较高，默认样式有 `position: relative` ，如需修改，建议用跟高优先级的选择器覆盖（如.vue-tinder前加 `id选择器` ）。本组件DEMO如下：

?> 本DEMO的图片素材使用： [https://picsum.photos](https://picsum.photos)。

<iframe width="100%" height="667" src="//jsfiddle.net/JohnnyDan/z9ev725e/20/embedded/result,html,css,js" allowpaymentrequest allowfullscreen="allowfullscreen" frameborder="0"></iframe>

* 参考：
  * [v-cloak](https://cn.vuejs.org/v2/api/#v-cloak)
