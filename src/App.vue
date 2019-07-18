<template>
  <div id="app">
    <Tinder
      v-cloak
      ref="tinder"
      :allow-super="true"
      key-name="id"
      :pointer-threshold="0.5"
      :super-threshold="0.5"
      :queue.sync="queue"
      @submit="submit"
    >
      <template slot-scope="scope">
        <div
          class="pic"
          :style="{
            'background-image': `url(${scope.data.url})`
          }"
        ></div>
      </template>
      <img class="like-pointer" slot="like" src="~img/like-txt.png" />
      <img class="nope-pointer" slot="nope" src="~img/nope-txt.png" />
      <img class="super-pointer" slot="super" src="~img/super-txt.png" />
    </Tinder>
    <div class="btns">
      <img
        style="width:70px;"
        src="~img/super-like.png"
        @click="decide('super')"
      />
      <img style="width:80px;" src="~img/nope.png" @click="decide('nope')" />
      <img style="width:80px;" src="~img/like.png" @click="decide('like')" />
      <img style="width:70px;" src="~img/help.png" @click="decide('help')" />
    </div>
  </div>
</template>

<script>
import Tinder from '@/components/vue-tinder/Tinder.vue'
export default {
  name: 'App',
  components: { Tinder },
  data: () => ({ queue: [] }),
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      const res = await fetch(
        'https://api.thecatapi.com/v1/images/search?limit=5'
      )
      const list = await res.json()
      this.queue = this.queue.concat(list)
    },
    submit() {
      // info
      if (this.queue.length < 2) {
        this.getData()
      }
    },
    async decide(choice) {
      if (choice === 'help') {
        const res = await fetch(
          'https://api.thecatapi.com/v1/images/search?limit=1'
        )
        const list = await res.json()
        this.queue.unshift(...list)
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
  background-image: linear-gradient(rgba(252, 252, 253, 0.5), #f7f7fb);
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
  height: calc(100% - 23px - 18%);
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
  bottom: 0;
  margin: auto;
  height: 18%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 300px;
  max-width: 355px;
}
</style>
