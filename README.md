# vue-tinder

# 简介

仿造Tinder的Vue组件，类似国内的探探、陌陌等APP的左右滑动卡片功能。[vue-tinder 文档](https://shanlh.github.io/vue-tinder)

# 安装

## 直接下载 / CDN

https://unpkg.com/vue-tinder/dist/vue-tinder.js

Unpkg.com 提供了基于 NPM 的 CDN 链接。上面的链接会一直指向在 NPM 发布的最新版本。你也可以像 https://unpkg.com/vue-tinder@1.1.1/dist/vue-tinder.js 这样指定 版本号 或者 Tag。

在 Vue 后面加载 vue-tinder，它会自动安装的：

```html
<script src="/path/to/vue.js"></script>
<script src="/path/to/vue-tinder.js"></script>
```

## NPM / Yarn

```shell
npm install vue-tinder --save
# or
yarn add vue-tinder
```

## 构建开发版

如果你想使用最新的开发版，就得从 GitHub 上直接 clone，然后自己 build 一个 vue-tinder。

```shell
git clone https://github.com/shanlh/vue-tinder.git node_modules/vue-tinder
cd node_modules/vue-tinder
npm install
npm run build
```

# 快速开始

> 教程中的案例代码将使用 ES2015 来编写。
此教程直接引用script，单文件组件使用方法类似，只是不需要v-cloak指令了，需要注意的是 `.v-tinder` 在组件中为scoped，属性选择器优先级较高，默认样式有 `position: relative` ，如需修改，建议用跟高优先级的选择器覆盖（如.vue-tinder前加 `id选择器` ）。本组件DEMO如下：

[JS Fiddle 在线DEMO](https://jsfiddle.net/JohnnyDan/z9ev725e/21/embedded/result,html,css,js)