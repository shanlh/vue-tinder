# Getting Started

## Installation

### NPM / Yarn
It is recommended to install this way when building large applications.

``` bash
npm install vue-tinder --save
# or
yarn add vue-tinder
```

### Direct download / CDN

[https://unpkg.com/vue-tinder/dist/vue-tinder.js](https://unpkg.com/vue-tinder/dist/vue-tinder.js)

Unpkg.com provides an NPM-based CDN link, and the link above will always point to the latest version released by NPM. You can also specify the version number or Tag like [https://unpkg.com/vue-tinder@2.0.0/dist/vue-tinder.js](https://unpkg.com/vue-tinder@2.0.0/dist/vue-tinder.js).

After the plugin is introduced using the `script` tag, the VueTinder component is automatically registered to the global and can be used directly during development.

```html
<script src="/path/to/vue.js"></script>
<script src="/path/to/vue-tinder.js"></script>
```

## Reference plugin

### Component format

You can refer to it directly as a custom component：

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

### Plugin format

If you need to register `VueTinder` globally in your project, you can register it with the global method `Vue.use()` provided by Vue.js:

``` js
// main.js or index.js
import VueTinder from 'vue-tinder'

Vue.use(VueTinder)
```

As with `script`, the plugin format also registers the `VueTinder` component as a global component, eliminating the need to re-register with the `components` attribute in your own components.

## Build development version

If you want to use the latest development version, you have to clone directly from GitHub and build a `VueTinder` yourself.

``` bash
git clone https://github.com/shanlh/vue-tinder.git node_modules/vue-tinder
cd node_modules/vue-tinder
yarn
yarn build
```