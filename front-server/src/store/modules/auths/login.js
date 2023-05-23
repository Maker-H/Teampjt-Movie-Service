import axios from 'axios'
// 
import { API_URL } from '@/store/CONSTS'
import router from '@/router'
import store from '@/store'


const state = () => {
}
const getters = {
}
const mutations = {
}
const actions = {
  login(context, user) {
    const renewedUsername = user.renewedUsername
    const password = user.password
    axios({
      method: 'post',
      url: `${API_URL}/login/`,
      data: {
        'username': renewedUsername,
        password
      }
    })
      .then((res) => {
        localStorage.setItem('access', JSON.stringify(res.data.access));
        localStorage.setItem('refresh', JSON.stringify(res.data.refresh));
        router.push({name: 'HomeView'}).catch(err => console.log(err))
      })
      .catch(err => console.log(err))
      store.dispatch('check/checkLoggedIn', {root: true})
  },

}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}