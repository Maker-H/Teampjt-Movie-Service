import axios from 'axios'
// 
import { API_URL } from '@/store/modules/movies/CONSTS'

const state = () => {
  return {
    detailMovie: [],
  }
}
const getters = {
    detailMovie: state => state.detailMovie,
}
const mutations = {
    GET_DETAIL_MOVIE(state, movie) {
        // console.log('mutation', movie)
        state.detailMovie = movie
    }
}
const actions = {
  getDetailMovie(context, movieId) {
    // console.log('actions', movieId)
    axios({
        methods: 'get',
        url: `${API_URL}/movies/${movieId}/`
      })
        .then((res) => {
            context.commit('GET_DETAIL_MOVIE', res.data)
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