import axios from "axios";
//
import { API_URL } from "@/store/CONSTS";

const state = () => {};
const getters = {};
const mutations = {};

const actions = {
  token_refresh() {
    const refresh = JSON.parse(localStorage.getItem("refresh"))
    axios({
      method: "post",
      url: `${API_URL}/token/refresh/`,
      data: {
        refresh
      },
    })
      .then((res) => {
        // console.log(res.data)
        localStorage.setItem("access", JSON.stringify(res.data.access))
      })
      .catch((err) => console.log(err));
  },
}


export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
