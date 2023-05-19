import axios from 'axios'
// 
import { API_URL } from '@/store/CONSTS'
// 
import refresh from '@/store/modules/auths/refresh'

const state = () => {
  return {
    likedMovies: []
  }
}
const getters = {
}
const mutations = {
  GET_LIKED_MOVIES(state, movies) {
    state.likedMovies = movies
  }
}
const actions = {
  getLikedMovies(context) {
    const access = JSON.parse(localStorage.getItem('access'))
    axios({
      method: 'post',
      url: `${API_URL}/liked-movies/`,
      headers: {
        'Authorization': `Bearer ${access}`
      }
    })
      .then((res) => {
        context.commit('GET_LIKED_MOVIES', res.data)
      })
      .catch((err) => {
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