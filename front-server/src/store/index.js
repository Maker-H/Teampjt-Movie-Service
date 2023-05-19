import Vue from 'vue'
import Vuex from 'vuex'

import home from '@/store/modules/movies/home'
import detail from '@/store/modules/movies/detail'
import recommand from '@/store/modules/movies/recommand'
import comment from '@/store/modules/movies/comment'
import login from '@/store/modules/auths/login'
import refresh from '@/store/modules/auths/refresh'
import logout from '@/store/modules/auths/logout'
import comment from '@/store/modules/comment'



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
    logout,
    comment,
    refresh,
  }
})
