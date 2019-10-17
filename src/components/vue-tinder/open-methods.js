import { STATUS } from './status'

export default {
  data: () => ({
    rewindKeys: []
  }),
  methods: {
    /**
     * 点击按钮做选择
     * @param {String} type like：喜欢，nope：不喜欢，super：超喜欢
     */
    decide(type) {
      if (this.state.touchId || this.status !== STATUS.NORMAL) {
        return
      }
      this.state.start = { x: 0, y: 0 }
      this.state.move = {
        x: type === 'super' ? 0 : type === 'like' ? 1 : -1,
        y: type === 'super' ? -1 : 0
      }
      this.state.startPoint = 1
      this.shiftCard(type)
    },
    /**
     * 恢复一个列表
     * @param {Array} list
     */
    rewind(list) {
      const keyName = this.keyName
      // TODO: 其实可以换个地方把 id 放置进去，目前这么做主要是为了后期可以配置 rewind 的来源位置
      for (const item of list) {
        this.rewindKeys.push(item[keyName] + '') // 避免数字类型的 id 引起后续判断不匹配
      }
      this.queue.unshift(...list)
    },
    /***************** 以下方法不对外开放，对 queue 操作请用以上的函数 *****************/
    /**
     * 把卡片移除
     * @param {String} type 移除方式，like：喜欢，nope：不喜欢，super：超喜欢
     */
    shiftCard(type) {
      this.state.status = STATUS.LEAVING
      this.state.result = type
      const item = this.queue.shift()
      this.$emit('update:queue', this.queue)
      this.submitDecide(type, item)
    },
    /**
     * 提交选择
     * @param {Boolean} type 类型，like：喜欢，nope：不喜欢，super：超喜欢
     * @param {String}  key  当前卡片的key
     * @param {Object}  item 卡片对象
     */
    submitDecide(type, item) {
      this.$emit('submit', { type, key: item[this.keyName], item })
    }
  }
}
