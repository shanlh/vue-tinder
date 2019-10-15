import { STATUS, initStatus } from './status'

export default {
  methods: {
    /**
     * 开始移动
     * @param {Object} e 触摸/鼠标事件
     */
    start(e) {
      const state = this.state
      if (
        state.touchId !== null ||
        this.status === STATUS.LEAVING ||
        this.status === STATUS.REVERT ||
        this.status === STATUS.REWINDING
      ) {
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
      const centerY = top + height / 2
      const startPoint = pageY > centerY ? -1 : 1
      // 初始化
      this.state = {
        status: STATUS.MOVING,
        touchId:
          e.type === 'touchstart' ? e.changedTouches[0].identifier : 'mouse',
        start: {
          x: pageX,
          y: pageY
        },
        move: Object.create(null),
        startPoint,
        result: null
      }
    },
    /**
     * 移动卡片
     * @param {Object} e 触摸/鼠标事件
     */
    move(e) {
      e.preventDefault()
      const state = this.state
      if (
        state.touchId === null ||
        this.status === STATUS.LEAVING ||
        this.status === STATUS.REVERT ||
        this.status === STATUS.REWINDING ||
        (e.type === 'touchmove' &&
          state.touchId !== e.changedTouches[0].identifier)
      ) {
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
     * @param {Object} e 触摸/鼠标事件
     */
    end(e) {
      if (
        e.type === 'touchstart' &&
        this.state.touchId !== e.changedTouches[0].identifier
      ) {
        return
      }
      if (
        this.status === STATUS.LEAVING ||
        this.status === STATUS.REVERT ||
        this.status === STATUS.REWINDING
      ) {
        return
      }
      if (Math.abs(this.pointerOpacity) >= 1 || this.superOpacity >= 1) {
        const result =
          this.superOpacity >= 1
            ? 'super'
            : this.pointerOpacity > 0
            ? 'like'
            : 'nope'
        this.shiftCard(result)
      } else if (this.status === STATUS.MOVING) {
        // 操作取消，回归原位，回归原位后 status 会通过 TinderCard 通知 Tinder 将 status 重置为 0
        this.state = initStatus('reverted')
      }
    }
  }
}
