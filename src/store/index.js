import Vue from "vue";
import Vuex from "vuex";
import { encrypt } from "../services/encryptDecrypt";
import { musicDatabase } from "../resources/musicDatabase";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    currentUser: {},
    playState: false,
    nowPlaying: {},
  },
  mutations: {
    setCurrentUser(state, currentUser) {
      return (state.currentUser = currentUser);
    },
    setPlayPauseState(state, playState) {
      return (state.playState = playState);
    },
    setNowPlaying(state, music) {
      return (state.nowPlaying = music);
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
    setNowPlaying(context, music) {
      if (Object.keys(music).length === 0) {
        console.log("empty in store");
        var randomMusic =
          musicDatabase[Math.floor(Math.random() * musicDatabase.length)];
        context.commit("setNowPlaying", randomMusic);
      } else {
        context.commit("setNowPlaying", music);
      }
    },
    resetState() {
      // context.dispatch("setCurrentUser", {});
    },
  },
  getters: {
    currentUser: (state) => state.currentUser,
    playState: (state) => state.playState,
    nowPlaying: (state) => state.nowPlaying,
  },
});

export default store;
