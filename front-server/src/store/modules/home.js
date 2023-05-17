import axios from 'axios'
// 
import { API_URL } from '@/store/CONSTS'

const state = () => {
  return {
    latestMovieList: null,
  }
}

const getters = {

}
const mutations = {
  LATEST_MOVIES(state) {
    axios({
      methods: 'get',
      url: `${API_URL}/movies/`
    })
      .then((res) => {
        console.log(res.data)
        state.latestMovieList = res.data
      })
      .catch(err => console.log(err))
  }
}
const actions = {
  latestMovies(context) {
    // console.log('actions')
    context.commit('LATEST_MOVIES')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}