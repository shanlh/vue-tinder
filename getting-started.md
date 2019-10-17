# 快速上手

<!-- > 教程中的案例代码将使用 ES2015 来编写。 -->

<!-- 此教程直接引用script，单文件组件使用方法类似，只是不需要v-cloak指令了，需要注意的是 `.v-tinder` 在组件中为scoped，属性选择器优先级较高，默认样式有 `position: relative` ，如需修改，建议用跟高优先级的选择器覆盖（如.vue-tinder前加 `id选择器` ）。本组件DEMO如下：

?> 本 DEMO 的图片素材使用 [BING 美图](http://bing.plmeizi.com/) -->

## 安装插件

### NPM / Yarn
推荐在构建大型应用的时候使用这种方式进行安装。

```bash
npm install vue-tinder --save
# or
yarn add vue-tinder
```

### 直接下载 / CDN

https://unpkg.com/vue-tinder/dist/vue-tinder.js

Unpkg.com 提供了基于 NPM 的 CDN 链接，上面的链接会一直指向在 NPM 发布的最新版本。你也可以像 https://unpkg.com/vue-tinder@2.0.0/dist/vue-tinder.js 这样指定 版本号 或者 Tag。

在使用 `script` 标签引入此插件后，VueTinder 组件会被自动注册到全局，开发时直接进行使用即可。

```html
<script src="/path/to/vue.js"></script>
<script src="/path/to/vue-tinder.js"></script>
```

## 引用插件

### 组件形式

你可以直接将它当做一个自定义组件进行引用：

``` vue
<template>
  <vue-tinder> ... </vue-tinder>
</template>

<script>
import VueTinder from 'vue-tinder'

export default {
  components: {
    VueTinder
  }
}
</script>
```

### 插件形式

如果你需要在项目中全局注册 `VueTinder`，那么可以采用 Vue.js 提供的全局方法 `Vue.use()` 对此插件进行注册：

``` js
// main.js or index.js
import VueTinder from 'vue-tinder'

Vue.use(VueTinder)
```

和 `script` 引入方式一样，使用插件形式也会将 `VueTinder` 组件注册为全局组件，在你自己的组件中就无需再使用 `components` 属性重复注册了。


<!-- <iframe width="100%" height="667" src="//jsfiddle.net/JohnnyDan/z9ev725e/21/embedded/result,html,css,js" allowpaymentrequest allowfullscreen="allowfullscreen" frameborder="0"></iframe>

* 参考：
  * [v-cloak](https://cn.vuejs.org/v2/api/#v-cloak) -->
