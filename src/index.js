import Tinder from './components/Tinder'

export default Tinder

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('tinder', Tinder)
}
