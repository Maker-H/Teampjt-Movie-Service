import axios from 'axios'
// 
import { API_URL } from '@/store/CONSTS'

const state = () => {
  return {
    searchMovieList: null,
  }
}
const getters = {
    searchMovieList : state => state.searchMovieList,
}
const mutations = {
    GET_SEARCH_MOVIELIST(state, searchMovieList){
        console.log('mutations', searchMovieList)
        state.searchMovieList = searchMovieList
    }
}
const actions = {
    getSearchMovieList(context, movieTitle){
        axios({
            methods: 'get',
            url: `${API_URL}/movies/`
          })
            .then((res) => {
              const movies = res.data
              const searchMovieList = movies.filter((movie)=>{
                return movie.title.includes(movieTitle)
              })
              console.log('actions', searchMovieList)
              context.commit('GET_SEARCH_MOVIELIST', searchMovieList)
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