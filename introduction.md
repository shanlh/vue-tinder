# Introduction

VueTinder 是一款实现 [Tinder](https://tinder.com) 主要功能的 Vue 组件。

## 特性

- 带着❤️开发，在 Chrome 动画调试速度 10% 时依然能有出色并自然的表现，没有瑕疵
- 新支持回退功能，并支持同时回退多个
- 可以根据喜好调整卡片的上下间距以实现多种卡片摆放样式
- 适配性强，可以兼容其他 css 单位如：rem
- 新支持非同步操作执行，为用户带来丝滑的体验，你也可以选择关闭，让用户等卡片完全消失后才能继续操作
- 如对浏览器要求高，请酌情使用 offsetY
- 支持 SSR
- 体积很小，只有 5kb
- 可定制，super、throld啥的

DEMO 如下：

![](https://raw.githubusercontent.com/shanlh/vue-tinder/master/.gitbook/assets/ping-mu-lu-zhi-2019101713.19.47-2.gif)

## TODO

VueTinder 仍然处于开发中，这里有一些目前已知存在的问题：

- 移动端在手指侧滑返回时可能会误触到 VueTinder
- 非 sync 模式下，执行操作后立刻按住卡片不放，等前卡片完全消失即 DOM 节点被移除后会卡住，组件内 Touchend、Touchcancel 事件不触发

欢迎你为 VueTinder 的开发作出贡献。