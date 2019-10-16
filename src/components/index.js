import Tinder from './vue-tinder/Tinder.vue'

Tinder.install = Vue => {
  Vue.component('vue-tinder', Tinder)
}

export default Tinder

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('tinder', Tinder)
}
