// import axios from 'axios'
// 
// import { API_URL } from '@/store/CONSTS'
// import router from '@/router'

const state = () => {
  return {
    loggedIn: null,
  }
}
const getters = {
}
const mutations = {
  CHECK_LOGGED_IN(state, loggedIn) {
    state.loggedIn = loggedIn
  }
}
const actions = {
  checkLoggedIn(context) {
    const access = localStorage.getItem('access')
    context.commit('CHECK_LOGGED_IN', access)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}