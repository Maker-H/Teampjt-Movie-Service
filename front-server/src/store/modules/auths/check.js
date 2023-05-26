// import axios from 'axios'
// 
// import { API_URL } from '@/store/CONSTS'
// import router from '@/router'

const state = () => {
  return {
    loggedIn: false,
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
    // console.log('checkLoggedIn 시작')
    let access
    if(localStorage.getItem('access')) {
      access = true
    } else{
      access = false
    }
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