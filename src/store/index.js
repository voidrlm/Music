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
    audioSystem: null,
    volume: 0,
  },
  mutations: {
    setCurrentUser(state, currentUser) {
      return (state.currentUser = currentUser);
    },
    setPlayPauseState(state, playState) {
      if (!playState) {
        state.audioSystem.pause();
      } else {
        state.audioSystem.play();
      }
      return (state.playState = playState);
    },
    setNowPlaying(state, music) {
      return (state.nowPlaying = music);
    },
    setVolume(state, volume) {
      state.audioSystem.volume = volume;
      return (state.volume = volume);
    },
    initialiseAudioSystem(state) {
      return (state.audioSystem = new Audio(state.nowPlaying.url));
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
    setVolume(context, volume) {
      context.commit("setVolume", volume);
    },
    initialiseAudioSystem(context) {
      context.commit("initialiseAudioSystem");
    },
    setNowPlaying(context, music) {
      if (Object.keys(music).length === 0) {
        var randomMusic =
          musicDatabase[Math.floor(Math.random() * musicDatabase.length)];
        context.commit("setNowPlaying", randomMusic);
        context.commit("initialiseAudioSystem");
        store.dispatch("setPlayPauseState", true);
        console.log("Random Music Played");
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
    volume: (state) => state.volume,
  },
});

export default store;
