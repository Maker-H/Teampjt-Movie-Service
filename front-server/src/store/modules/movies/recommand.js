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
    curAddress: null,
    center: null,
    longitude: null,
    latitude: null,
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
  },
  center: (state) => state.center,

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
  },
  GET_MAP_PARAMS(state, coordinate){
    const { latitude, longitude } = coordinate
    state.latitude = latitude
    state.longitude = longitude
    state.center = {lat:latitude, lng:longitude}
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
  getWeather(context, nxny) {
    // 여기에 nx ny 주기
    const {nx, ny} = nxny
    const ni = nx
    const nj = ny
    const ninj = {ni, nj}
    const { vilageWeatherUrl, payload } = weatherParams(ninj);
    
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
        console.log('use point')
        context.commit('GET_USER_POINT', res.data)
      })
      .catch((err) => {
        console.log(err)
        if (err.response.status === 401) {
          refresh.actions.token_refresh()
        }
      })
  },
  getMapParams(context, coordinate) {
    context.commit('GET_MAP_PARAMS', coordinate)
  },
  getMapData(context, address) {
    axios({
      methods: "get",
      url: `${API_URL}/maps/`,
    })
      .then((res) => {
        // console.log(res.data)
        res.data.forEach(map => {
          if (map.sido==address[0] && map.gusi==address[1] && map.dong==address[2]) {
            this.curAddress = map
            return false
          }
        });
        const nx = this.curAddress.nx
        const ny = this.curAddress.ny
        const nxny = { nx, ny }

        const longitude = this.curAddress.longitude
        const latitude = this.curAddress.latitude
        const coordinate = { latitude, longitude }
        actions.getWeather(context, nxny)
        actions.getMapParams(context, coordinate)
      })
      .catch((err) => console.log(err));

  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
