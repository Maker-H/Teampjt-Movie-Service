import axios from "axios";
import _ from "lodash";
//
import { weatherParams, weatherDataPreprocessing, weatherToGenre } from '/api/weather'
// 
import { API_URL } from '@/store/CONSTS'

const state = () => {
  return {
    movies: [],
    genres: [],
    weatherData: {},
    recommandGenre: "",
    recommandGenreList: [],
    recommand: {}
  };
};
const getters = {
  state: (state) => state.weatherData.state,
  temperature: (state) => state.weatherData.tmp,
  recommandGenre: (state) => state.recommandGenre,
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
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
