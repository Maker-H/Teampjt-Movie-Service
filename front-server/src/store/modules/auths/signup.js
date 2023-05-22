import axios from 'axios'
// 
import router from '@/router'
import { API_URL } from '@/store/CONSTS'


const state = () => {
  return {
    verificationCode: '',
    renewedUserNumber: '',
  }
}
const getters = {
}
const mutations = {
  SEND_MESSAGE(state, verificationCode) {
    state.verificationCode = verificationCode
  },
  CLEAR_VERIFICATION_CODE(state) {
    state.verificationCode = ''
  },
  STORE_USERNUMBER(state, renewedUserNumber) {
    state.renewedUserNumber = renewedUserNumber
  }
}
const actions = {
  signupPwd(context, user) {
    const renewedUserNumber = user.renewedUserNumber
    const password1 = user.password1
    const password2 = user.password2
    console.log(user.renewedUserNumber)
    axios({
      method: 'post',
      url: `${API_URL}/login/registeration/`,
      data: {
        'username': renewedUserNumber,
        password1, password2
      }
    })
      .then((res) => {
        // console.log(res)
        localStorage.setItem('access', JSON.stringify(res.data.access))
        localStorage.setItem('refresh', JSON.stringify(res.data.refresh))
        router.push({name: 'HomeView'}).catch(() => {})
      })
      .catch(err => console.log(err))
  },
  sendMessage(context, userNumber) {
    axios({
      method: 'post',
      url: `${API_URL}/profile/message/`,
      data: {
        userNumber
      }
    })
      .then((res) => {
        console.log(res.data)
        
        const verificationCode = res.data
        context.commit('SEND_MESSAGE', verificationCode)
      })
      .catch(err => console.log(err))
  },
  storeUserNumber(context, renewedUserNumber){
    context.commit('STORE_USERNUMBER', renewedUserNumber)
  },
  clearVerificationCode(context) {
    context.commit('CLEAR_VERIFICATION_CODE')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}