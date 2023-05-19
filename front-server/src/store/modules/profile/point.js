import axios from 'axios'
// 
import { API_URL } from '@/store/CONSTS'
// 
import refresh from '@/store/modules/auths/refresh'

const state = () => {
  return {
    userPoint: 0,
  }
}
const getters = {
}
const mutations = {
  GET_USER_POINT(state, point){
    state.userPoint = point
  }
}
const actions = {
  getUserPoint(context) {
    const access = JSON.parse(localStorage.getItem('access'))

    axios({
      method: 'post',
      url: `${API_URL}/profile/point/`,
      headers: {
        'Authorization': `Bearer ${access}`,
      }
    })
      .then((res) => {
        context.commit('GET_USER_POINT', res.data)
        // console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
        if (err.response.status === 401) {
          refresh.actions.token_refresh()
        }
      })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}