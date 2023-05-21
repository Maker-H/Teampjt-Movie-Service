import axios from 'axios'
import router from 'vue-router'
// 
import { API_URL } from '@/store/CONSTS'
// 
import refresh from '@/store/modules/auths/refresh'

const state = () => {
  return {
    userPoint: 0,
  }
}
const getters = {
}
const mutations = {
  GET_USER_POINT(state, point){
    state.userPoint = point
  }
}
const actions = {
  getUserPoint(context) {
    const access = JSON.parse(localStorage.getItem('access'))

    axios({
      method: 'post',
      url: `${API_URL}/profile/point/`,
      headers: {
        'Authorization': `Bearer ${access}`,
      }
    })
      .then((res) => {
        context.commit('GET_USER_POINT', res.data)
        // console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
        if (err.response.status === 401) {
          refresh.actions.token_refresh()
        }
      })
  },
  getPayment(context, amount) {
    axios.get(`/api/profile/kakaoPay/${amount}/`)
      .then(response => {
      // Kakao Pay API 응답 처리
        console.log(response)
        const paymentUrl = response.data.next_redirect_pc_url;
        window.location.href = paymentUrl;
      })
      .catch(() => {
        alert("에러가 발생했습니다. 다시 시도해주세요")
        router.push('/')
      });
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}