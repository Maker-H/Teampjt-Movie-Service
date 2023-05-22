import axios from 'axios'
//
import { API_URL } from '@/store/CONSTS'
//
import refresh from '@/store/modules/auths/refresh'


const state = () => {
  return {
    detailMovie: [],
    isLiked: null,
  };
};
const getters = {
  detailMovie: (state) => state.detailMovie,
  isLiked : state => state.isLiked,
};
const mutations = {
  GET_DETAIL_MOVIE(state, movie) {
    state.detailMovie = movie;
  },
  CREATE_LIKED_MOVIES(state, isLiked){
    state.isLiked = isLiked
  },
};
const actions = {
  getDetailMovie(context, movieId) {
    // console.log('actions', movieId)
    axios({
      methods: "get",
      url: `${API_URL}/movies/${movieId}/`,
    })
      .then((res) => {
        context.commit("GET_DETAIL_MOVIE", res.data);
      })
      .catch((err) => console.log(err));
  },
  createLikedMovies(context, movieId) {
    const access = JSON.parse(localStorage.getItem('access'))
    axios({
      method: 'post',
      url: `${API_URL}/create-like/${movieId}/`,
      headers: {
        'Authorization': `Bearer ${access}`
      }
    })
      .then((res) => {
        context.commit('CREATE_LIKED_MOVIES', res.data)
      })
      .catch((err) => {
        if (err.response.status === 401) {
          refresh.actions.token_refresh()
        }
      })
  },
  getLikedMovie(context, movieId) {
    const access = JSON.parse(localStorage.getItem('access'))
    axios({
      method: 'post',
      url: `${API_URL}/liked-movies/${movieId}/`,
      headers: {
        'Authorization': `Bearer ${access}`
      }
    })
      .then((res) => {
        context.commit('CREATE_LIKED_MOVIES', res.data)
      })
      .catch((err) => {
        if (err.response.status === 401) {
          refresh.actions.token_refresh()
        }
      })
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
