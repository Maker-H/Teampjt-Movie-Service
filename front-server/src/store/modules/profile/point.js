import axios from 'axios'
import router from 'vue-router'
import VueCookies from 'vue-cookies'
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
  userPoint: (state) => state.userPoint
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
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
        if (err.response.status === 401 && access) {
          refresh.actions.token_refresh()
          context.dispatch('getUserPoint')
        }
      })
  },
  updateUserPoint(context, amount) {
    const access = JSON.parse(localStorage.getItem('access'))
    axios({
      method: 'post',
      url: `${API_URL}/profile/point/${amount}/`,
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
        if (err.response.status === 401 && access) {
          refresh.actions.token_refresh()
          context.dispatch('updateUserPoint')
        }
      })
  },
  getPayment(context, amount) {
    axios.get(`${API_URL}/profile/kakaoPay/${amount}/`)
      .then(response => {
      // Kakao Pay API 응답 처리
        console.log(response)
        VueCookies.set('kakaoTid', response.data.tid)
        const paymentUrl = response.data.next_redirect_pc_url
        window.open(paymentUrl)
      })
      .catch(() => {
        alert("에러가 발생했습니다. 다시 시도해주세요")
        router.push('/')
      })
  },
  paySuccess(context, payload){
      // 결제 승인 API 호출 (Django 뷰의 kakao_pay_approval과 매칭)
      const {pgToken, tid} = payload
      axios({
        method: 'post',
        url: `${API_URL}/profile/paySuccess/${pgToken}/${tid}/`,
      })
        .then(response => {
          // console.log('paySuccess', response.data.amount['total'])
          const amount = response.data.amount['total']
          actions.updateUserPoint(context, amount)
        })
        .catch(() => {
          alert("에러가 발생했습니다. 다시 시도해주세요")
          router.push('/')
        })
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}