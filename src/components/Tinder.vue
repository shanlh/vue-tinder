<template>
  <div
    class="vue-tinder"
    @touchstart="start"
    @touchmove="move"
    @touchend="end"
    @touchcancel="end"
    @mousedown="start"
    @mousemove="move"
    @mouseup="end"
    @mouseout="end">
    <transition-group
      @leave="leave"
      @afterLeave="gone">
      <TinderCard
        v-if="index<2"
        :style="isCur(index)?mainCardStyle():benchCardStyle(index)"
        v-for="(item,index) in queue"
        :key="item[keyName]">
        <slot :data="item" :index="index"></slot>
        <template v-if="isCur(index)">
          <span slot="nope" class="pointer-wrap nope-pointer-wrap" :style="{opacity:nopeOpacity}">
            <slot name="nope" :opacity="nopeOpacity"></slot>
          </span>
          <span slot="like" class="pointer-wrap like-pointer-wrap" :style="{opacity:likeOpacity}">
            <slot name="like" :opacity="likeOpacity"></slot>
          </span>
          <span v-if="allowSuper" slot="super" class="pointer-wrap super-pointer-wrap" :style="{opacity:superOpacity}">
            <slot name="super" :opacity="superOpacity"></slot>
          </span>
        </template>
      </TinderCard>
    </transition-group>
  </div>
</template>

<script>
import TinderCard from './TinderCard'
let resizeTimer

const initStatus = () => ({
  touchId: null,
  start: {},
  move: {},
  startPoint: 1, // 1：上，-1：下
  ratio: 0,
  result: null
})

export default {
  name: 'tinder',
  components: {
    TinderCard
  },
  props: {
    allowSuper: {
      type: Boolean,
      default: true
    },
    queue: {
      type: Array,
      default: () => ([])
    },
    keyName: {
      type: String,
      default: 'key'
    },
    // 横向移动距离占卡片宽度比例，超出时松手会执行对应事件
    pointerThreshold: {
      type: Number,
      default: 0.5
    },
    // 向上移动距离占卡片高度比例，超出时松手会执行超级喜欢
    superThreshold: {
      type: Number,
      default: 0.5
    }
  },
  data: () => ({
    status: 0, // 主卡片状态，1: moving, 2:leaving , 0:normal
    size: {
      top: 0,
      width: 0,
      height: 0
    },
    state: initStatus()
  }),
  computed: {
    /**
     * 当前可被滑动的卡片的key
     * @method nowKey
     * @return {String} key
     */
    nowKey () {
      if (this.status === 2) {
        return null
      }
      return this.queue[0] && this.queue[0][this.keyName]
    },
    /**
     * 卡片上的喜欢或不喜欢图标的不透明度
     * @method pointerOpacity
     * @return {Opacity}  不透明度
     */
    pointerOpacity () {
      return this.state.ratio / this.pointerThreshold
    },
    /**
     * 喜欢的不透明度
     * @method likeOpacity
     * @return {Opacity}
     */
    likeOpacity () {
      if (this.superOpacity) {
        return 0
      }
      return this.pointerOpacity
    },
    /**
     * 不喜欢的不透明度
     * @method nopeOpacity
     * @return {Opacity}
     */
    nopeOpacity () {
      return -this.likeOpacity
    },
    /**
     * 卡片上的超喜欢图标的不透明度
     * @method superOpacity
     * @return {Opacity}  不透明度
     */
    superOpacity () {
      if (!this.allowSuper) {
        return 0
      }
      const disY = this.state.move.y - this.state.start.y
      const ratio = disY / (-this.superThreshold * this.size.height)
      const pointerOpacity = Math.abs(this.pointerOpacity)
      return ratio > pointerOpacity ? ratio : 0
    }
  },
  mounted () {
    if (!this.$el.offsetWidth || !this.$el.offsetHeight) {
      console.warn('请设置vue-tinder的宽高')
    }
    this.size = {
      top: this.$el.offsetTop,
      width: this.$el.offsetWidth,
      height: this.$el.offsetHeight
    }
    window.onresize = this.getSize
  },
  destroyed () {
    window.removeEventListener('onresize', this.getSize)
  },
  methods: {
    /**
     * 获取组件尺寸及位置，用以判断旋转角度
     * @method getSize
     */
    getSize () {
      clearInterval(resizeTimer)
      resizeTimer = setTimeout(() => {
        this.size = {
          top: this.$el.offsetTop,
          width: this.$el.offsetWidth,
          height: this.$el.offsetHeight
        }
      }, 300)
    },
    /**
     * 是否是当前卡片
     * @method isCur
     * @param  {Number}  index 卡片索引值
     * @return {Boolean}       true/false
     */
    isCur (index) {
      return index === 0 && this.queue[index][this.keyName] === this.nowKey
    },
    /**
     * 开始移动
     * @method start
     * @param  {Object} e 触摸/鼠标事件
     */
    start (e) {
      const state = this.state
      if (state.touchId !== null || this.status === 2) {
        return
      }
      let pageX, pageY
      if (e.type === 'touchstart') {
        pageX = e.changedTouches[0].pageX
        pageY = e.changedTouches[0].pageY
        // TODO: iOS侧滑返回区域，不应该继续，这个区域还需要调整，有必要的话还要区分下iOS/Android
        // if (pageX < ?) {
        //   return
        // }
      } else {
        pageX = e.clientX
        pageY = e.clientY
      }
      // 判断触摸起始位置在卡片的上部还是下部
      const top = this.size.top
      const height = this.size.height
      const centerY = (top + height / 2)
      const startPoint = pageY > centerY ? -1 : 1
      // 初始化
      this.status = 1
      this.state = {
        touchId: e.type === 'touchstart' ? e.changedTouches[0].identifier : 'mouse',
        start: {
          x: pageX,
          y: pageY
        },
        move: Object.create(null),
        startPoint,
        ratio: 0,
        result: null
      }
    },
    /**
     * 移动卡片
     * @method move
     * @param  {Object} e 触摸/鼠标事件
     */
    move (e) {
      e.preventDefault()
      const state = this.state
      if (state.touchId === null ||
          this.status === 2 ||
          (e.type === 'touchmove' && state.touchId !== e.changedTouches[0].identifier)) {
        return
      }
      let pageX, pageY
      if (e.type === 'touchmove') {
        pageX = e.changedTouches[0].pageX
        pageY = e.changedTouches[0].pageY
      } else {
        pageX = e.clientX
        pageY = e.clientY
      }
      state.move = {
        x: pageX,
        y: pageY
      }
    },
    /**
     * 移动结束，分析行为
     * @method end
     * @param  {Object} e 触摸/鼠标事件
     */
    end (e) {
      if (e.type === 'touchstart' && this.state.touchId !== e.changedTouches[0].identifier) {
        return
      }
      if (this.status === 2) {
        return
      }
      if (Math.abs(this.pointerOpacity) >= 1 || this.superOpacity >= 1) {
        const result = this.superOpacity >= 1 ? 'super' : this.pointerOpacity > 0 ? 'like' : 'nope'
        this.shiftCard(result)
      } else {
        this.gone()
      }
    },
    /**
     * 把卡片移除
     * @method shiftCard
     * @param  {String}  type 移除方式，like：喜欢，nope：不喜欢，super：超喜欢
     */
    shiftCard (type) {
      this.status = 2
      this.state.result = type
      const item = this.queue.shift()
      this.$emit('update:queue', this.queue)
      this.submitDecide(type, item[this.keyName])
    },
    /**
     * 首屏卡片style
     * @method mainCardStyle
     * @param  {Number}       index 卡片索引值，用于判断是否可以移动
     * @return {Object}             style
     */
    mainCardStyle () {
      const style = { zIndex: 10 }
      if (this.status === 0) { // 初始化位置
        style['transform'] = 'scale(1) translate3d(0,0,0) rotate(0deg)'
        style['transition'] = 'all 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      } else if (this.status === 1) { // 移动中，位移及旋转角度
        const state = this.state
        const {start, move, startPoint} = state
        const x = move.x - start.x || 0
        const y = move.y - start.y || 0
        // 横向滑动卡片一半宽(0.5)时为标准状态
        const ratio = x / (this.size.width * 0.5)
        state.ratio = ratio
        // 标准状态（ratio为1时）10度角
        const rotate = 10 * ratio * startPoint
        style['transform'] = `translate3d(${x}px,${y}px,0) rotate(${rotate}deg)`
        style['transition'] = 'none'
      }
      return style
    },
    /**
     * 替补卡片style
     * @method benchCardStyle
     * @param  {Number}  index 卡片索引值，用于判断是否为准替补卡片
     * @return {Object}        style
     */
    benchCardStyle (index) {
      // 当前条件卡片不应该被显示
      if ((index === 1 && this.status === 2) || index > 1) {
        return {
          zIndex: -1,
          opacity: 0
        }
      }
      const style = {zIndex: 9}
      if (this.status === 0) { // 初始化替补图位置
        style['transform'] = 'scale3d(0.95,0.95,1)'
        style['transition'] = 'all 500ms ease'
      } else if (this.status === 1) { // 移动中，替补图渐渐放大
        // scale区间：[0.95-1]
        let ratio = this.state.ratio
        if (ratio > 1) {
          ratio = 1
        } else if (ratio < -1) {
          ratio = -1
        }
        style['transform'] = `scale3d(${Math.abs(ratio) * 0.05 + 0.95},${Math.abs(ratio) * 0.05 + 0.95},1)`
        style['transition'] = 'none'
      } else if (this.status === 2) { // 第一张在消失中，第二张替补为主图，要过渡到最大
        style['transform'] = 'scale3d(1,1,1)'
        style['transition'] = 'all 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }
      return style
    },
    /**
     * 当前卡片正在离开
     * 当只用 JavaScript 过渡的时候， 在 enter 和 leave 中，回调函数 done 是必须的 。
     * 否则，它们会被同步调用，过渡会立即完成。
     * @method leave
     * @param  {element}  el   当前卡片
     * @param  {Function} done 回调函数
     */
    leave (el, done) {
      const state = this.state
      const {start, move, startPoint} = state
      let x = move.x - start.x || 0
      let y = move.y - start.y || 0
      if (state.result === 'super') {
        y -= this.size.width
      } else {
        x += this.size.width * (x < 0 ? -0.5 : 0.5)
        y *= x / (move.x - start.x)
      }
      const ratio = x / (this.size.width * 0.5)
      const rotate = (ratio / (0.8 / 0.5)) * 15 * startPoint
      const duration = state.touchId === null ||
                       state.result === 'super' ? 800 : 300
      el.className += ` ${state.result}`
      el.style.opacity = 0
      el.style.transform = `translate3d(${x}px,${y}px,0) rotate(${rotate}deg)`
      el.style.transition = `all ${duration}ms ease`
      setTimeout(done, duration)
    },
    /**
     * 当前卡片已经离开
     * @method gone
     */
    gone () {
      this.status = 0
      this.state = initStatus()
    },
    /**
     * 点击按钮做选择
     * @method decide
     * @param  {String} type like：喜欢，nope：不喜欢，super：超喜欢
     */
    decide (type) {
      if (this.state.touchId || this.status !== 0 || !this.nowKey) {
        return
      }
      this.state.start = {x: 0, y: 0}
      this.state.move = {
        x: type === 'super' ? 0 : type === 'like' ? 1 : -1,
        y: type === 'super' ? -1 : 0
      }
      this.state.startPoint = 1
      this.shiftCard(type)
    },
    /**
     * 提交选择
     * @method submitDecide
     * @param  {Boolean}    type 类型，like：喜欢，nope：不喜欢，super：超喜欢
     * @param  {String}     key  当前卡片的key
     */
    submitDecide (type, key) {
      this.$emit('submit', {type, key})
    }
  }
}
</script>

<style scoped>
.vue-tinder {
  position: relative;
  -webkit-tap-highlight-color: transparent;
}

/* style正在被数据绑定，只能使用important来覆盖 */
.v-move { transition: none!important; }

.pointer-wrap {
  pointer-events: none;
  transition: opacity .2s ease;
}

/* 通过调用函数让卡片消失时需要直接显示对应指示器，不需要渐变 */
.tinder-card.nope .nope-pointer-wrap,
.tinder-card.like .like-pointer-wrap,
.tinder-card.super .super-pointer-wrap {
  opacity: 1!important;
}
</style>
