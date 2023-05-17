import axios from 'axios'
// import CONSTS from '@/store/CONSTS'

const state = () => {
  return {
    latestMovies: null,
  }
}

const getters = {

}
const mutations = {
  LATEST_MOVIES(state) {
    axios({
      methods: 'get',
      url: 'http://127.0.0.1:8000/api/movies/'
      // url: `${CONSTS.API_URL}/movies/`
    })
      .then((res) => {
        console.log(res.data)
        state.latestMovies = res.data
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