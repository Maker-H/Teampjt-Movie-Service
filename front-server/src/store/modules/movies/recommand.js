import axios from "axios";
import _ from "lodash";
//
import { weatherParams, weatherDataPreprocessing, weatherToGenre } from '/api/weather'
// 
import { API_URL } from '@/store/CONSTS'
// 
import refresh from '@/store/modules/auths/refresh'

const state = () => {
  return {
    movies: [],
    genres: [],
    weatherData: {},
    recommandGenre: "",
    recommandGenreList: [],
    recommand: {},
    userPoint: 0,
  };
};
const getters = {
  state: (state) => state.weatherData.state,
  temperature: (state) => state.weatherData.tmp,
  recommandGenre: (state) => state.recommandGenre,
  userPoint: (state) => state.userPoint,
  recommandMovie(state) {
    const recommandMovieList = weatherToGenre(state);
    state.recommand = _.sample(recommandMovieList)
    const recommand = state.recommand
    return recommand;
  },
  genres: (state) => state.genres,
  recommandGenres(state) {
    state.recommandGenreList = []
    state.genres.forEach(genre1 => {
      state.recommand.genres.forEach(genre2 => {
        if (genre1.id === genre2){
          state.recommandGenreList.push(genre1.name)
        }
      })       
    })
    return state.recommandGenreList
  }
};
const mutations = {
  GET_MOVIELIST(state, movies) {
    state.movies = movies;
    // console.log(state.movies);
  },
  GET_GENRELIST(state, genres) {
    state.genres = genres;
    //   console.log(state.genres)
  },
  GET_WEATHER(state, data) {
    state.weatherData = data;
    // console.log(state.weatherData);
  },
  GET_USER_POINT(state, point){
    state.userPoint = point
  }
};
const actions = {
  getMovieList(context) {
    axios({
      methods: "get",
      url: `${API_URL}/movies/`,
    })
      .then((res) => {
        context.commit("GET_MOVIELIST", res.data);
      })
      .catch((err) => console.log(err));
  },
  getGenreList(context) {
    axios({
      methods: "get",
      url: `${API_URL}/genres/`,
    })
      .then((res) => {
        context.commit("GET_GENRELIST", res.data);
      })
      .catch((err) => console.log(err));
  },
  getWeather(context) {
    const { vilageWeatherUrl, payload } = weatherParams();
    
    axios
      .get(vilageWeatherUrl + payload)
      .then((res) => {
        const weatherData = weatherDataPreprocessing(res);
        context.commit("GET_WEATHER", weatherData);
      })
      .catch((err) => console.log(err));
  },
  useUserPoint(context) {
    const access = JSON.parse(localStorage.getItem('access'))
    axios({
      method: 'post',
      url: `${API_URL}/profile/point/use/${100}/`,
      headers: {
        'Authorization': `Bearer ${access}`,
      }
    })
      .then((res) => {
        // console.log(res.data)
        context.commit('GET_USER_POINT', res.data)
      })
      .catch((err) => {
        console.log(err)
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
