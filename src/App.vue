<template>
  <div id="app">
    <Tinder
      ref="tinder"
      key-name="id"
      :queue.sync="queue"
      :max="3"
      :offset-y="10"
      @submit="onSubmit"
    >
      <template slot-scope="scope">
        <div
          class="pic"
          :style="{
            'background-image': `url(https://cn.bing.com//th?id=OHR.${scope.data.id}_UHD.jpg&pid=hp&w=720&h=1280&rs=1&c=4&r=0)`
          }"
        />
      </template>
      <img class="like-pointer" slot="like" src="~img/like-txt.png" />
      <img class="nope-pointer" slot="nope" src="~img/nope-txt.png" />
      <img class="super-pointer" slot="super" src="~img/super-txt.png" />
      <img class="rewind-pointer" slot="rewind" src="~img/rewind-txt.png" />
    </Tinder>
    <div class="btns">
      <img src="~img/rewind.png" @click="decide('rewind')" />
      <img src="~img/nope.png" @click="decide('nope')" />
      <img src="~img/super-like.png" @click="decide('super')" />
      <img src="~img/like.png" @click="decide('like')" />
      <img src="~img/help.png" @click="decide('help')" />
    </div>
  </div>
</template>

<script>
import Tinder from '@/components/vue-tinder/Tinder.vue'
import source from '@/bing'

export default {
  name: 'App',
  components: { Tinder },
  data: () => ({
    queue: [],
    start: 0,
    now: 0,
    offset: 0,
    history: []
  }),
  created() {
    this.mock()
  },
  methods: {
    mock(count = 5, append = true) {
      const list = []
      for (let i = 0; i < count; i++) {
        list.push({ id: source[this.offset], offset: this.offset })
        this.offset++
      }
      if (append) {
        this.queue = this.queue.concat(list)
      } else {
        this.queue.unshift(...list)
      }
    },
    onSubmit({ item }) {
      if (this.queue.length < 3) {
        this.mock()
      }
      this.history.push(item)
    },
    async decide(choice) {
      if (choice === 'rewind') {
        if (this.history.length) {
          //一个个 rewind
          // this.$refs.tinder.rewind([this.history.pop()])
          // 一次性 rewind 全部
          // this.$refs.tinder.rewind(this.history)
          // this.history = []
          // 一次随机 rewind 多个
          this.$refs.tinder.rewind(
            this.history.splice(-Math.ceil(Math.random() * 3))
          )
          // 非 api调用的添加
          // this.queue.unshift(this.history.pop())
          // this.queue.push(this.history.pop())
          // 非头部添加
          // this.queue.splice(1, 0, this.history.pop())
          // 一次性 rewind 多个，并且含有非头部添加的 item
          // this.queue.unshift(this.history.pop())
          // this.queue.unshift(...this.history)
        }
      } else if (choice === 'help') {
        //
      } else {
        this.$refs.tinder.decide(choice)
      }
    }
  }
}
</script>

<style>
html,
body {
  height: 100%;
}

body {
  margin: 0;
  background-color: #20262e;
  overflow: hidden;
}

#app .vue-tinder {
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  top: 23px;
  margin: auto;
  width: calc(100% - 20px);
  height: calc(100% - 23px - 65px - 47px - 16px);
  min-width: 300px;
  max-width: 355px;
}

.nope-pointer,
.like-pointer {
  position: absolute;
  z-index: 1;
  top: 20px;
  width: 64px;
  height: 64px;
}

.nope-pointer {
  right: 10px;
}

.like-pointer {
  left: 10px;
}

.super-pointer {
  position: absolute;
  z-index: 1;
  bottom: 80px;
  left: 0;
  right: 0;
  margin: auto;
  width: 112px;
  height: 78px;
}

.rewind-pointer {
  position: absolute;
  z-index: 1;
  top: 20px;
  right: 10px;
  width: 112px;
  height: 78px;
}

.pic {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}

.btns {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 30px;
  margin: auto;
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 300px;
  max-width: 355px;
}

.btns img {
  margin-right: 12px;
  box-shadow: 0 4px 9px rgba(0, 0, 0, 0.15);
  border-radius: 50%;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.btns img:nth-child(2n + 1) {
  width: 53px;
}

.btns img:nth-child(2n) {
  width: 65px;
}

.btns img:nth-last-child(1) {
  margin-right: 0;
}

/* .vue-tinder.right-end,
.vue-tinder.left-end {
  transform: translateZ(20px);
}
.vue-tinder.right-end .tinder-card:nth-child(1) {
  animation: rightEnd 0.2s ease-in-out;
}
.vue-tinder.left-end .tinder-card:nth-child(1) {
  animation: leftEnd 0.2s ease-in-out;
}
@keyframes leftEnd {
  50% {
    transform: rotateY(8deg);
  }
}
@keyframes rightEnd {
  50% {
    transform: rotateY(-8deg);
  }
} */
</style>
