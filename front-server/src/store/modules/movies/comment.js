import axios from "axios";
// 
import { API_URL } from '@/store/CONSTS'
import refresh from '@/store/modules/auths/refresh'

const state = () => {
  return {
    movieId: null,
    commentList: [],
    updateCommentObject: null,
  };
};

const getters = {
  commentList: (state) => state.commentList,
  updateCommentObject: (state) => state.updateCommentObject,
  movieCommentList(state) {
    return state.commentList.filter((comment) => {
      return comment.movie == state.movieId;
    })
  },
}
const mutations = {
  GET_COMMENTLIST(state, commentList) {
    state.commentList = commentList;
  },
  GET_MOVIE_COMMENTLIST(state, movieId) {
    state.movieId = movieId;
  },
  ADD_UPDATE_COMMENT(state, commentId) {
    const commentIdx = state.commentList.findIndex((i) => i.id == commentId);
    state.updateCommentObject = state.commentList[commentIdx];
  },
  DELETE_UPDATE_COMMENT(state) {
    state.updateCommentObject = null;
  },
};
const actions = {
  getCommentList(context) {
    axios({
      method: "get",
      url: `${API_URL}/comments/`,
    })
      .then((res) => {
        // console.log(res)
        context.commit("GET_COMMENTLIST", res.data);
      })
      .catch(err => console.log(err)) 
  },

  createComment(context, payload) {
    const access = JSON.parse(localStorage.getItem('access'))
    const { content, movieId } = payload;
    axios({
      method: "post",
      url: `${API_URL}/movies/${movieId}/comments/`,
      data: { content },
      headers: {
        'Authorization': `Bearer ${access}`
      }
    })
      .then(() => {
        actions.getCommentList(context);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          refresh.actions.token_refresh()
          context.dispatch('createComment', payload)
        }
      })
  },

  getMovieCommentList(context, movieId) {
    context.commit("GET_MOVIE_COMMENTLIST", movieId);
  },

  deleteComment(context, commentId) {
    const access = JSON.parse(localStorage.getItem('access'))
    axios({
      method: "delete",
      url: `${API_URL}/comments/${commentId}/`,
      headers: {
        'Authorization': `Bearer ${access}`
      }
    })
      .then(() => {
        actions.getCommentList(context);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          refresh.actions.token_refresh()
          context.dispatch('deleteComment', commentId)
        }
      })
  },

  addUpdateComment(context, commentId) {
    context.commit("ADD_UPDATE_COMMENT", commentId);
  },

  updateComment(context, payload) {
    const access = JSON.parse(localStorage.getItem('access'))
    const { id, content } = payload;
    axios({
      method: "put",
      url: `${API_URL}/comments/${id}/`,
      data: { id, content },
      headers: {
        'Authorization': `Bearer ${access}`
      }
    })
      .then(() => {
        actions.getCommentList(context);
        context.commit("DELETE_UPDATE_COMMENT");
      })
      .catch((err) => {
        if (err.response.status === 401) {
          refresh.actions.token_refresh()
          context.dispatch('updateComment')
        }
      })
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
