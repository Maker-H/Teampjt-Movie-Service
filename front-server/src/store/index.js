import Vue from 'vue'
import Vuex from 'vuex'

// movies
import home from '@/store/modules/movies/home'
import detail from '@/store/modules/movies/detail'
import recommand from '@/store/modules/movies/recommand'
import comment from '@/store/modules/movies/comment'
import search from '@/store/modules/movies/search'
// auth
import login from '@/store/modules/auths/login'
import logout from '@/store/modules/auths/logout'
import signup from '@/store/modules/auths/signup'
import refresh from '@/store/modules/auths/refresh'
// profile
import point from '@/store/modules/profile/point'
import likes from '@/store/modules/profile/likes'




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
    // movies
    home,
    detail,
    recommand,
    comment,
     search,
    
    // auths
    login,
    logout,
    signup,
    refresh,
    
    // profile
    point,
    likes,

  }
})
