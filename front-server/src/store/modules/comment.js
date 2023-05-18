import axios from 'axios'
import router from 'vue-router'
// 
import { API_URL } from '@/store/CONSTS'

const state = () => {
  return {
    content: null
  }
}

const getters = {

}
const mutations = {

}
const actions = {
  createComment(context, payload){
    const { content, movieId } = payload
    axios({
      method: 'post',
      url: `${API_URL}/movies/${movieId}/comments/`,
      data: { content }
    })
      .then(() => {
        router.push({name : 'DetailView'})
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