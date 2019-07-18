<template>
  <div class="tinder-card" :style="style">
    <slot></slot>
    <slot name="nope"></slot>
    <slot name="like"></slot>
    <slot name="super"></slot>
  </div>
</template>

<script>
export default {
  name: 'TinderCard',
  props: {
    status: {
      type: Number,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    state: {
      type: Object,
      required: true
    },
    size: {
      type: Object,
      required: true
    },
    nowKey: {
      type: [Number, String],
      default: ''
    },
    id: {
      type: [Number, String],
      required: true
    }
  },
  computed: {
    /**
     * 是否是当前卡片
     * @method isCur
     * @param  {Number}  index 卡片索引值
     * @return {Boolean}       true/false
     */
    isCur() {
      return this.index === 0 && this.id === this.nowKey
    },
    style() {
      if (this.isCur) {
        const style = { zIndex: 100 - this.index }
        if (this.status === 0) {
          // 初始化位置
          style['transform'] = 'scale(1) translate3d(0,0,0) rotate(0deg)'
          style['transition'] =
            'all 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        } else if (this.status === 1) {
          // 移动中，位移及旋转角度
          const state = this.state
          const { start, move, startPoint } = state
          const x = move.x - start.x || 0
          const y = move.y - start.y || 0
          // 横向滑动卡片一半宽(0.5)时为标准状态
          const ratio = x / (this.size.width * 0.5)
          state.ratio = ratio
          // 标准状态（ratio为1时）10度角
          const rotate = 10 * ratio * startPoint
          style[
            'transform'
          ] = `translate3d(${x}px,${y}px,0) rotate(${rotate}deg)`
          style['transition'] = 'none'
        }
        return style
      } else {
        // 当前条件卡片不应该被显示
        if ((this.index === 1 && this.status === 2) || this.index > 1) {
          return {
            zIndex: -1,
            opacity: 0
          }
        }
        const style = { zIndex: 9 }
        if (this.status === 0) {
          // 初始化替补图位置
          style['transform'] = 'scale3d(0.95,0.95,1)'
          style['transition'] = 'all 500ms ease'
        } else if (this.status === 1) {
          // 移动中，替补图渐渐放大
          // scale区间：[0.95-1]
          let ratio = this.state.ratio
          if (ratio > 1) {
            ratio = 1
          } else if (ratio < -1) {
            ratio = -1
          }
          style['transform'] = `scale3d(${Math.abs(ratio) * 0.05 +
            0.95},${Math.abs(ratio) * 0.05 + 0.95},1)`
          style['transition'] = 'none'
        } else if (this.status === 2) {
          // 第一张在消失中，第二张替补为主图，要过渡到最大
          style['transform'] = 'scale3d(1,1,1)'
          style['transition'] =
            'all 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }
        return style
      }
    }
  }
}
</script>

<style scoped>
.tinder-card {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #fefefe;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
}

/* .tinder-card.v-enter {
  transform: translate3d(0px, 100px, 0) !important;
  transition: all 0.3s !important;
} */

.tinder-card.v-enter,
.tinder-card.v-enter-to {
  opacity: 1;
  transform: translate3d(0, 0, 0) scale(1) !important;
  /* transition-delay: 100ms !important; */
}

.tinder-card.v-enter-active {
  opacity: 0;
  transform: translate3d(0, 0, 0) scale(0.9) !important;
  transition: all 300ms ease !important;
  /* transition-delay: 100ms !important; */
}

/* v-enter-active */
/* v-enter-to */
</style>
