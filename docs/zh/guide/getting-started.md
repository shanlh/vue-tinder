# 快速起步

## 安装

### NPM / Yarn
推荐在构建大型应用的时候使用这种方式进行安装。

``` bash
npm install vue-tinder --save
# or
yarn add vue-tinder
```

### 直接下载 / CDN

[https://unpkg.com/vue-tinder/dist/vue-tinder.js](https://unpkg.com/vue-tinder/dist/vue-tinder.js)

Unpkg.com 提供了基于 NPM 的 CDN 链接，上面的链接会一直指向在 NPM 发布的最新版本。你也可以像 [https://unpkg.com/vue-tinder@2.0.0/dist/vue-tinder.js](https://unpkg.com/vue-tinder@2.0.0/dist/vue-tinder.js) 这样指定 版本号 或者 Tag。

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

## 构建开发版

如果你想使用最新的开发版，就得从 GitHub 上直接 clone，然后自己 build 一个 `VueTinder`。

``` bash
git clone https://github.com/shanlh/vue-tinder.git node_modules/vue-tinder
cd node_modules/vue-tinder
yarn
yarn build
```