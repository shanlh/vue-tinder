# Introduction

`VueTinder` is a Vue component that helps you quickly implement the main features of similar apps like [Tinder](https://tinder.com), [TanTan](https://tantanapp.com/), etc.

## Features

- Made With ❤️, strict detail requirements, under the slow motion, can better see the ease of transition animation, no matter how fast and complicated the operation does not have to worry about the problem.
- Full Functioning, in addition to the original left, right, and up-sliding, a new fallback function has been added, which also supports multiple rollbacks at the same time.
- Rich Configuration, adjustable sliding, spacing parameters and CSS units for a more flexible and adaptable layout.
- Simple and lightweight (~5KB after Gzip compression)

[Preview](https://codesandbox.io/embed/vue-tinder-preview-by7qi)

![](https://raw.githubusercontent.com/shanlh/vue-tinder/master/public/preview.gif)

## TODO

VueTinder is still under development, and here are some of the issues that are currently known:

- The mobile end may accidentally touch VueTinder when the finger slides back.
- In non-sync mode, press and hold the card immediately after the operation. If the front card disappears completely, the DOM node will be stuck after being removed, and the Touchend and Touchcancel events in the component will not be triggered.

You are welcome to contribute to the development of VueTinder.