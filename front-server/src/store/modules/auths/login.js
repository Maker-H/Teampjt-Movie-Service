import axios from 'axios'
// 
import { API_URL } from '@/store/CONSTS'
import router from '@/router'

const state = () => {
}
const getters = {
}
const mutations = {
}
const actions = {
  login(context, user) {
    const username = user.username
    const password = user.password
    axios({
      method: 'post',
      url: `${API_URL}/login/`,
      data: {
        username, password
      }
    })
      .then((res) => {
        // console.log(res)
        localStorage.setItem('access', JSON.stringify(res.data.access));
        localStorage.setItem('refresh', JSON.stringify(res.data.refresh));
        router.push({name: 'HomeView'}).catch(() => {})
      })
      .catch(err => console.log(err))
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}