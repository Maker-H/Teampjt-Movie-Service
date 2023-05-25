import axios from 'axios'
// 
import { API_URL } from '@/store/CONSTS'

const state = () => {
  return {
    movies: [],
    genres: [],
  };
};

const getters = {
};
const mutations = {
  GET_MOVIELIST(state, movies) {
    state.movies = movies;
    console.log('mut', state.movies)
  },
  GET_GENRELIST(state, genres) {
    state.genres = genres;
  },

};
const actions = {
  getMovieList(context) {
    axios({
      methods: "get",
      url: `${API_URL}/movies/`,
    })
      .then((res) => {
        console.log('act', res.data)
        context.commit('GET_MOVIELIST', res.data)
      })
      .catch((err) => console.log(err));
  },
  getGenreList(context) {
    axios({
      methods: "get",
      url: `${API_URL}/genres/`,
    })
      .then((res) => {
        context.commit('GET_GENRELIST', res.data)
      })
      .catch((err) => console.log(err));
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
