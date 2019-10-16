import Tinder from './vue-tinder/Tinder.vue'

export default Tinder

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('tinder', Tinder)
}
