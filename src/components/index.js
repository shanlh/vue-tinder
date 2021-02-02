import Tinder from './vue-tinder/Tinder.vue'

Tinder.install = Vue => {
  Vue.component('VueTinder', Tinder)
}

export default Tinder

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('tinder', Tinder)
}
