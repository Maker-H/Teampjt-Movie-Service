const state = () => {
}
const getters = {
}
const mutations = {
}
const actions = {
  logout() {
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}