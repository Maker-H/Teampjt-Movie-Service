import axios from 'axios'
// 
import { API_URL } from '@/store/CONSTS'

const state = () => {
  return {
    movies : [],
    genres : [],
    weatherData : {},
  }
}
const getters = {
    state : state => state.weatherData.state,
    temperature : state => state.weatherData.tmp
}
const mutations = {
  GET_MOVIELIST(state, movies){
    state.movies = movies
    console.log(state.movies)
  },
  GET_WEATHER(state, data){
    state.weatherData = data
    console.log(state.weatherData)
  }
}
const actions = {
  getMovieList(context) {
    axios({
      methods: 'get',
      url: `${API_URL}/movies/`
    })
    .then((res) => {
      context.commit('GET_MOVIELIST', res.data)
    })
    .catch(err => console.log(err))

  },
  // 날씨 API 사용 from 기상청 단기예보 서비스(https://www.data.go.kr/data/15084084/openapi.do)
  getWeather(context){
    const vilageWeatherUrl = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?';
    const serviceKey = 'VeIyQYlemcin0TUHlsQrWib5AWUE%2FUvpjhihs9Gkk%2BKuwBMDmqjoK3HnD9Dl1qxfXs6GIXPX13Ftdyi2RqkzGw%3D%3D';
    // 날짜, 시간, 좌표를 Query String으로 구성해 payload 완성
    const today = new Date();
    const baseDate = today.getFullYear() + ('0' + (today.getMonth() + 1)).slice(-2) + ('0' + today.getDate()).slice(-2);
    const baseTime = '1400';
    const nx = '86';
    const ny = '95';

    const payload = `serviceKey=${serviceKey}&dataType=json&base_date=${baseDate}&base_time=${baseTime}&nx=${nx}&ny=${ny}`;

    // 비동기 통신 -> GET 날씨 받아 보기
    axios
    .get(vilageWeatherUrl + payload)
    .then((res) => {
      const items = res.data.response.body.items.item

      const weatherData = {
        tmp: '',
        code: '',
        state: '',
      }

      // 데이터 전처리
      for (let item of items) {
        // 기온
        if (item.category === 'TMP') {
          weatherData.tmp = item.fcstValue;
        }
        // 강수량 및 제설량
        if (item.category === 'PTY') {
          const weatherCode = item.fcstValue;
          let weatherState = '';

          if (weatherCode === '1') {
            weatherState = '비';
          } else if (weatherCode === '2') {
            weatherState = '비/눈';
          } else if (weatherCode === '3') {
            weatherState = '눈';
          } else if (weatherCode === '4') {
            weatherState = '소나기';
          } else {
            weatherState = '맑음';
          }
            weatherData.code = weatherCode;
            weatherData.state = weatherState;
        }
      }
      context.commit('GET_WEATHER', weatherData)
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