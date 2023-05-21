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
    axios.get(`${API_URL}/profile/kakaoPay/${amount}/`)
      .then(response => {
      // Kakao Pay API 응답 처리
        console.log(response)
        const paymentUrl = response.data.next_redirect_pc_url
        window.open(paymentUrl)
      })
      .catch(() => {
        alert("에러가 발생했습니다. 다시 시도해주세요")
        router.push('/')
      })
  },
  paySuccess(context, pgToken){
      // 결제 승인 API 호출 (Django 뷰의 kakao_pay_approval과 매칭)
      axios
        .post(`${API_URL}/profile/paySuccess/`, { pg_token: pgToken })
        .then(response => {
          if (response.data.code === 0) {
            // 결제 승인 성공 시
            alert("결제가 완료되었습니다.")
            console.log(response)
            // 페이지 리로드 또는 필요한 작업 수행
          } else {
            // 결제 승인 실패 시
            alert("결제가 실패하였습니다.")
            // 필요한 에러 처리 작업 수행
          }
        })
        .catch(error => {
          console.error(error)
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