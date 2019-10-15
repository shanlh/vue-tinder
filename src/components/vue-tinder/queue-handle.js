import difference from 'lodash.difference'
import { STATUS } from './status'

export default {
  data: () => ({
    /**
     * 正在被移除的 key，目前只管插入，没做移除后的删除处理
     */
    leavingKeys: [],
    /**
     * 本次 rewind 的数量，每次 diff 更新，会在动画移除时有用，用于决定 card 隐藏后的目标状态
     */
    onceRewindCount: 0
  }),
  methods: {
    /**
     * 需要区分数组变化是增加还是减少
     * @param {Array} list
     * @param {Array} old
     */
    diff(list, old) {
      // 新增或 rewind
      const add = difference(list, old)
      let onceRewindCount = 0
      if (add.length) {
        for (let i = 0; i < add.length; i++) {
          const item = this.queue[i]
          if (item.id && add[i] === item.id) {
            onceRewindCount++
            const id = item.id
            const newUniqueKey = id + Math.random()
            if (
              this.leavingKeys.includes(item.uniqueKey) ||
              this.leavingKeys.includes(id) ||
              this.rewindKeys.includes(item.uniqueKey) ||
              this.rewindKeys.includes(id)
            ) {
              // 已经移除过再出现，为了避免 dom 被重用中断了之前的消失动画，需要给一个新的 key
              item.uniqueKey = newUniqueKey
              // 因为在 beforeEnter 中，存入 rewindKeys 中的是 data-id，
              // 而 data-id 以 uniqueKey 为更高优先级，如果直接将之前移除过的对象重新 rewind，
              // 则有很大的可能是本身存在 uniqueKey 属性的，所以单单 indexOf 其 id 是不一定能找到的
              // 所以还需要查找 uniqueKey，并为了保险起见，也需要赋值一个新的 uniqueKey
              const rewindIndex = Math.max(
                this.rewindKeys.indexOf(item.uniqueKey),
                this.rewindKeys.indexOf(id)
              )
              if (rewindIndex > -1) {
                this.rewindKeys[rewindIndex] = newUniqueKey
                this.state.status = STATUS.REWINDING
              }
            }
          } else {
            break
          }
        }
      }
      this.onceRewindCount = onceRewindCount

      // 移除
      const remove = difference(old, list)
      if (remove.length) {
        // 这边只考虑了移除一个的情况，手动移除头部的情况不负责，应该避免手动操作队列，除了向后追加
        this.leavingKeys.push(this.list[0].uniqueKey || this.list[0].id)
        for (let i = this.max + 1; i < this.max + 1 + remove.length; i++) {
          const item = this.list[i]
          if (item) {
            if (
              this.leavingKeys.includes(item.id) ||
              // 被隐藏，但即将出现的 item，需要创建 uniqueKey，避免出现正在隐藏的情况（与刚出来的 key 冲突）
              this.hidingKeys.includes(item.id)
            ) {
              item.uniqueKey = item.id + Math.random()
            }
          }
        }
      }

      this.list = this.queue.slice(0)
    }
  }
}
