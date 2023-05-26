import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//
import * as VueGoogleMaps from "vue2-google-maps"
// 
import SECRETE from '@/store/SECRETE'

Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: SECRETE.API_KEY,
    libraries: "places",
    region: "KR" 
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
