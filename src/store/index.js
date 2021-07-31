import Vue from "vue";
import Vuex from "vuex";
import { listAction } from "@/api/cart/collect/index.js";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    searchResult: {}, // this.$store.state.searchResult
    newCategoryList: {},
    currentNav: {},
    navData: [],
    collectList: [],
  },
  mutations: {
    upt(state, result) {
      state.searchResult = result; // this.$store.commit(upt,)
    },
    getNewCategoryList(state, result) {
      state.newCategoryList = result;
    },
    getNav(state, result) {
      state.currentNav = result.currentNav;
      state.navData = result.navData;
    },
    getCollectsM(state, data) {
      state.collectList = data.collectGoodsList;
    },
  },
  actions: {
    asynGetCollects(content) {
      // content.commit("getCollectsM");
      return new Promise((resolve, reject) => {
        listAction({ openId: localStorage.getItem("openId") })
          .then((res) => {
            resolve(res);
            content.commit("getCollectsM", res.data);
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
  },
  modules: {},
});
