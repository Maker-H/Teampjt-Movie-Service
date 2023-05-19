import axios from 'axios'
// import router from 'vue-router'
// 
import { API_URL } from '@/store/CONSTS'

const state = () => {
  return {
    movieId: null,
    commentList : []
  }
}

const getters = {
  commentList: state => state.commentList,
  movieCommentList(state) {
    return state.commentList.filter((comment) => {
      return comment.movie == state.movieId
    })
  }
}
const mutations = {
  GET_COMMENTLIST(state, commentList){
    state.commentList = commentList
  },
  GET_MOVIE_COMMENTLIST(state, movieId){
    state.movieId = movieId
  }
}
const actions = {
  getCommentList(context) {
    axios({
      method: 'get',
      url: `${API_URL}/comments/`
    })
    .then((res)=>{
      // console.log(res)
      context.commit('GET_COMMENTLIST', res.data)
    })
    .catch(err => console.log(err))
  },
  createComment(context, payload){
    const { content, movieId } = payload
    axios({
      method: 'post',
      url: `${API_URL}/movies/${movieId}/comments/`,
      data: { content }
    })
      .then(() => {
        actions.getCommentList(context)
      })
      .catch(err => console.log(err))
  },
  getMovieCommentList(context, movieId) {
    context.commit('GET_MOVIE_COMMENTLIST', movieId)
  },
  deleteComment(context, commentId) {
    axios({
      method: 'delete',
      url: `${API_URL}/comments/${commentId}/`
    })
      .then(() => {
        actions.getCommentList(context)
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