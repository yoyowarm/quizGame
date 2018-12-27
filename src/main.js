import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import eventBus from './eventBus/index'
import './registerServiceWorker'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  data () {
    return {
      bus: eventBus
    }
  },
  render: h => h(App)
}).$mount('#app')
