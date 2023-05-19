import Vue from 'vue'
import Vuex from 'vuex'

import home from '@/store/modules/movies/home'
import detail from '@/store/modules/movies/detail'
import recommand from '@/store/modules/movies/recommand'
import comment from '@/store/modules/movies/comment'
import login from '@/store/modules/auths/login'
import refresh from '@/store/modules/auths/refresh'



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
    login,
    comment,
    refresh,
  }
})
