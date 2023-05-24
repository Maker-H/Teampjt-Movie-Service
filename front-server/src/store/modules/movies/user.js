import axios from "axios";
//
import { API_URL } from "@/store/CONSTS";
import refresh from '@/store/modules/auths/refresh'

const state = () => {
  return {
    userId: null
  }
};
const getters = {};
const mutations = {
  GET_USER_ID(state, userId) {
    state.userId = userId
  }
};

const actions = {
  getUserId(context) {
    const access = JSON.parse(localStorage.getItem('access'))
    axios({
      method: "post",
      url: `${API_URL}/profile/id/`,
      headers: {
        'Authorization': `Bearer ${access}`
      }
    })
      .then((res) => {
        // console.log(res.data)
        context.commit('GET_USER_ID', res.data)
      })
      .catch((err) => {
        if (err.response.status === 401) {
          refresh.actions.token_refresh()
          context.dispatch('getUserId')
        }
      })
  },
}


export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
