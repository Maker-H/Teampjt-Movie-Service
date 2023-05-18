import Vue from 'vue'
import Vuex from 'vuex'
import home from '@/store/modules/home'
import detail from '@/store/modules/detail'
import recommand from '@/store/modules/recommand'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    home,
    detail,
    recommand,
  }
})
