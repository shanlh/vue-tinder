# VueTinder 简介

`VueTinder` 是一款能让你快速实现 [Tinder](https://tinder.com) 主要功能的 Vue 组件，[使用文档](https://shanlh.github.io/vue-tinder)。

## 特性

- 用❤️开发，在 Chrome 动画调试速度 10% 时依然能有出色并自然的表现
- 新支持回退功能，可以根据实际使用情况回退一个或多个
- 可以配置不同的上下间距，实现多种卡片堆叠形态
- 兼容其他 css 单位如：rem
- 支持异步操作，为用户带来丝滑的体验
- 支持 SSR
- 体积很小，只有 5kb
- 可根据使用情况定制 pointerThreshold、superThreshold

[在线预览](https://codesandbox.io/s/vue-template-by7qi)

![](https://raw.githubusercontent.com/shanlh/vue-tinder/master/.gitbook/assets/ping-mu-lu-zhi-2019101713.19.47-2.gif)

## TODO

VueTinder 仍然处于开发中，这里有一些目前已知存在的问题：

- 移动端在手指侧滑返回时可能会误触到 VueTinder
- 非 sync 模式下，执行操作后立刻按住卡片不放，等前卡片完全消失即 DOM 节点被移除后会卡住，组件内 Touchend、Touchcancel 事件不触发

欢迎你为 VueTinder 的开发作出贡献。