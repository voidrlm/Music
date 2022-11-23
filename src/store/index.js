import Vue from "vue";
import Vuex from "vuex";
import { encrypt } from "../services/encryptDecrypt";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    currentUser: {},
    playState: false,
  },
  mutations: {
    setCurrentUser(state, currentUser) {
      return (state.currentUser = currentUser);
    },
    setPlayPauseState(state, playState) {
      return (state.playState = playState);
    },
  },
  actions: {
    setCurrentUser(context, currentUser) {
      window.$cookies.set("uauth", encrypt(currentUser));
      if (context.currentUser === currentUser) return;
      context.commit("setCurrentUser", currentUser);
    },
    setPlayPauseState(context, playState) {
      context.commit("setPlayPauseState", playState);
    },

    resetState() {
      // context.dispatch("setCurrentUser", {});
    },
  },
  getters: {
    currentUser: (state) => state.currentUser,
    playState: (state) => state.playState,
  },
});

export default store;
