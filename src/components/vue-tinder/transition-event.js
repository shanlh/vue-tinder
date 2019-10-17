import { STATUS } from './status'

export default {
  data: () => ({
    /**
     * 已移除的 card 数量：
     * 每个移除的 z-index 会从基础的 100 提升到 10000 左右，
     * 以避免与当前显示 card 的 z-index 重叠
     */
    leavedCount: 0,
    /**
     * 被隐藏 card 的 z-index 与最新被设置的 index，从 50 开始变化
     */
    hideIndex: 50,
    lastHideIndex: 50,
    /**
     * 存储因为 z-index 大于 max 而隐藏过的 key：
     * 用于 diff 函数中的 remove 部分，避免在隐藏过程中又有 card 被执行移除操作，
     * 而 key 没有改变，导致 dom 被重用，动画过渡不自然的问题
     */
    hidingKeys: []
  }),
  methods: {
    beforeEnter(el) {
      const beforeIndex = el.dataset.index - 0 + 1
      el.style.opacity = 0
      el.style.transform = this.getTransform(beforeIndex)
      if (this.rewindKeys.indexOf(el.dataset.id) > -1) {
        // 这里与 leave 函数中，卡片被移除后目的地的计算方式相同
        let x = -1 // 从左边 rewind
        x += this.size.width * (x < 0 ? -0.5 : 0.5)
        const ratio = x / (this.size.width * 0.5)
        const rotate = (ratio / (0.8 / 0.5)) * 15 * 1
        el.style.transform = `translate3d(${x}px, 0, 0) rotate(${rotate}deg)`
      }
      el.style.transition = 'all 0s'
    },
    /**
     * 当前卡片正在离开
     * 当只用 JavaScript 过渡的时候， 在 enter 和 leave 中，回调函数 done 是必须的 。
     * 否则，它们会被同步调用，过渡会立即完成。
     * @param {element}  el   当前卡片
     * @param {Function} done 回调函数
     */
    leave(el, done) {
      const state = this.state
      const { start, move, startPoint } = state
      let x = move.x - start.x || 0
      let y = move.y - start.y || 0
      if (state.result === 'super') {
        y -= this.size.width
      } else {
        x += this.size.width * (x < 0 ? -0.5 : 0.5)
        y *= x / (move.x - start.x)
      }
      const ratio = x / (this.size.width * 0.5) // 不能直接使用 this.ratio，因为 x、y 被微调过
      const rotate = (ratio / (0.8 / 0.5)) * 15 * startPoint
      let duration =
        state.touchId === null || state.result === 'super' ? 800 : 300
      el.style.opacity = 0
      if (this.leavingKeys.indexOf(el.dataset.id) > -1) {
        // 操作移除
        el.className += ` ${state.result}`
        el.style.transform = `translate3d(${x}px,${y}px,0) rotate(${rotate}deg)`
        // 保证出队列的 z-index 正确（先出的在上）
        el.style.zIndex = 1000000 - this.leavedCount++
      } else {
        // 因执行 rewind 操作后，index 大于 max 而需被隐藏
        this.hidingKeys.push(el.dataset.id)
        duration = 500
        const index =
          Math.min(this.max, this.onceRewindCount) + (el.dataset.index - 0)
        el.style.transform = this.getTransform(index)
        el.style.zIndex = this.getHideIndex(el.dataset.index - 0)
      }
      el.style.transition = `all ${duration}ms ${
        duration === 500 ? 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' : 'ease'
      },z-index 0s`
      el.addEventListener('transitionend', e => {
        if (e.propertyName === 'transform') {
          // 重置 hideIndex，避免与主要卡片的层级冲突
          if (this.lastHideIndex === el.style.zIndex - 0) {
            this.lastHideIndex = 50
            this.hideIndex = 50
          }
          if (
            this.sync &&
            (this.status === STATUS.NORMAL || this.status === STATUS.LEAVING)
          ) {
            this.resetStatus()
          }
          done()
        }
      })
      if (
        !this.sync &&
        el.dataset.index - 0 === 0 &&
        this.status !== STATUS.REWINDING
      ) {
        this.resetStatus()
      }
    },
    /**
     * 根据不同情况（同时 rewind 多个、逐个 rewind）
     * 给大于 max 而隐藏的 card 一个正确的 z-index
     * 将最后一个当前的 index 储存起来，在 leave 中重置，避免与主要卡片的层级冲突
     * @param {Number} index
     */
    getHideIndex(index) {
      const max = this.max
      let cur
      if (index === max) {
        if (this.lastHideIndex > this.hideIndex) {
          // 说明之前有过层级更高的，到这边需要重新把 hidexIndex 恢复到最上一级的 index 以避免后续冲突
          cur = this.hideIndex
          this.hideIndex += 1 + max
        } else {
          cur = this.hideIndex++
        }
      } else {
        cur = this.hideIndex + max - index
      }
      this.lastHideIndex = cur
      return cur
    },
    getTransform(index) {
      const scale = 1 - this.scaleStep * index
      let translateY = 0
      if (this.offsetY) {
        const inverse = this.offsetY < 0
        const offsetY = Math.abs(this.offsetY)
        let y = index * offsetY
        let offsetScale = ((1 - scale) / 2) * 100
        if (inverse) {
          y *= -1
          offsetScale *= -1
        }
        translateY = `calc(${offsetScale}% + ${y}${this.offsetUnit})`
      }
      return `translate3d(0,${translateY},0) scale3d(${scale},${scale},1)`
    }
  }
}
