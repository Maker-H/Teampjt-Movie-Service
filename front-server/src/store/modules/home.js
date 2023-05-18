import axios from 'axios'
// 
import { API_URL } from '@/store/CONSTS'

const state = () => {
  return {
    latestMovieList: [],
  }
}

const getters = {
  fiveLatestMovies(state) {
    return state.latestMovieList.slice(0, 5)
  }
}
const mutations = {
  GET_LATEST_MOVIELIST(state, latestMovieList) {
    state.latestMovieList = latestMovieList
  }
}
const actions = {
  getLatestMovieList(context) {
    // console.log('actions')
    axios({
      methods: 'get',
      url: `${API_URL}/movies/`
    })
      .then((res) => {
        // console.log(res.data)
        const sortedMovies = res.data.sort((a, b) => {
          // release_date 값을 비교하여 정렬 순서를 결정
          // a - b 하면 오름차순
          // b - a 하면 내림차순 
          return new Date(b.released_date) - new Date(a.released_date);
        });
        context.commit('GET_LATEST_MOVIELIST', sortedMovies)
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