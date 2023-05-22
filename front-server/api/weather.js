// 날씨 API 사용 from 기상청 단기예보 서비스(https://www.data.go.kr/data/15084084/openapi.do)

const weatherParams = () => {
    const vilageWeatherUrl = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?';
    const serviceKey = 'VeIyQYlemcin0TUHlsQrWib5AWUE%2FUvpjhihs9Gkk%2BKuwBMDmqjoK3HnD9Dl1qxfXs6GIXPX13Ftdyi2RqkzGw%3D%3D';
    // 날짜, 시간, 좌표를 Query String으로 구성해 payload 완성
    const today = new Date();
    const baseDate = today.getFullYear() + ('0' + (today.getMonth() + 1)).slice(-2) + ('0' + today.getDate()).slice(-2);
    const baseTime = '0800';

    const nx = '86';
    const ny = '95';

    const payload = `serviceKey=${serviceKey}&dataType=json&base_date=${baseDate}&base_time=${baseTime}&nx=${nx}&ny=${ny}`;

    return {vilageWeatherUrl, payload}
}

const weatherDataPreprocessing = (res) => {
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
    return weatherData
}
const weatherToGenre = (state) => {

    const recommandMovieList = []

    if (state.weatherData.state === '비'){
      state.recommandGenre = 'Drama'
    }
    else if (state.weatherData.state === '비/눈'){
      state.recommandGenre = 'Mystery'
    }
    else if (state.weatherData.state === '눈'){
      state.recommandGenre = 'Animation'
    }
    else if (state.weatherData.state === '소나기'){
      state.recommandGenre = 'Thriller'
    }
    else if (state.weatherData.state === '맑음'){
      state.recommandGenre = 'Adventure'
    }
    
    state.movies.forEach(movie => {
      movie.genres.forEach(genre => {
        const genreIdx = state.genres.findIndex(i => i.id == genre)
        if (state.genres[genreIdx].name === state.recommandGenre){
            recommandMovieList.push(movie)
        }
      })
    })
    return recommandMovieList
}
export {
    weatherParams,
    weatherDataPreprocessing,
    weatherToGenre,
}