<template>
  <nav>
    <v-navigation-drawer
      v-model="showNavbarDrawer"
      app
      class="accent"
      width="245"
      ><v-layout class="justify-center mb-7">
        <v-hover>
          <template v-slot:default="{ hover }">
            <v-avatar size="200" class="ma-5 mb-n2 rounded-xl"
              ><v-img :src="$store.getters.nowPlaying.albumArt">
                <v-fade-transition>
                  <v-overlay
                    v-if="
                      hover ||
                      Object.keys($store.getters.nowPlaying).length == 0
                    "
                    absolute
                  >
                    <v-card-title class="mt-n6 justify-center"
                      >Now Playing</v-card-title
                    >
                    <v-card-subtitle
                      >{{ $store.getters.nowPlaying.name }}-{{
                        $store.getters.nowPlaying.artist
                      }}</v-card-subtitle
                    >
                    <div class="mt-1">
                      <v-btn icon class="mr-3" @click="playerOperation('prev')"
                        ><v-icon size="35">mdi-skip-previous</v-icon></v-btn
                      >
                      <v-btn icon @click.prevent="playSound()"
                        ><v-icon size="55">{{
                          $store.getters.playState
                            ? "mdi-pause-circle"
                            : "mdi-play-circle"
                        }}</v-icon></v-btn
                      >
                      <v-btn icon class="ml-3" @click="playerOperation('next')"
                        ><v-icon size="35">mdi-skip-next</v-icon></v-btn
                      >
                    </div>

                    <v-progress-linear
                      color="white"
                      class="mt-8"
                      :key="currentPosition"
                      :value="currentPosition"
                    ></v-progress-linear>
                  </v-overlay>
                </v-fade-transition> </v-img
            ></v-avatar>
          </template>
        </v-hover>
      </v-layout>
      <v-divider class="mb-n2 ma-5"></v-divider>
      <v-list nav rounded class="pa-5">
        <v-list-item
          v-for="item in items"
          :key="item.title"
          router
          :to="item.route"
          class="mb-3"
        >
          <v-list-item-icon class="mx-5">
            <v-icon size="30">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="body-2 font-weight-bold">{{
              item.title
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item> </v-list
      ><template v-slot:append>
        <div class="px-7">
          <v-slider
            :color="$vuetify.theme.dark ? 'white' : 'black'"
            v-model="volume"
            step="0.01"
            :max="1"
            :min="0"
            :prepend-icon="
              volume === 0
                ? 'mdi-volume-off'
                : volume <= 0.5
                ? 'mdi-volume-medium'
                : 'mdi-volume-high'
            "
            @change="setVolume()"
          ></v-slider>
        </div>
      </template>
    </v-navigation-drawer>
    <app-bar @openCloseNavBar="showNavbarDrawer = !showNavbarDrawer" />
  </nav>
</template>

<script>
import appBar from "./appBar.vue";
import { musicDatabase } from "../../resources/musicDatabase";
export default {
  data() {
    return {
      musicDatabase,
      volume: 0,
      showNavbarDrawer: true,
      items: [
        { title: "Home", icon: "mdi-home", route: "/home" },
        {
          title: "Playlists",
          icon: "mdi-music-box-multiple-outline",
          route: "/playlists",
        },
        {
          title: "Liked",
          icon: "mdi-heart",
          route: "/liked",
        },
      ],
      currentPosition: null,
      intervalId: null,
    };
  },
  components: {
    appBar,
  },

  mounted() {
    this.volume = Number(this.$cookies.get("volumeSet"));
    this.$store.dispatch("initialiseAudioSystem", this.volume);
    this.setVolume();
  },
  computed: {},
  methods: {
    setVolume() {
      this.$cookies.set("volumeSet", this.volume);
      this.$store.dispatch("setVolume", this.volume);
    },
    playSound() {
      if (this.$store.getters.playState) {
        this.$store.dispatch("setPlayPauseState", false);
      } else {
        if (Object.keys(this.$store.getters.nowPlaying).length === 0) {
          this.$store.dispatch("setNowPlaying", {});
          this.audio = new Audio(this.$store.getters.nowPlaying.url);
        }
        this.$store.dispatch("setPlayPauseState", true);
        // this.intervalId = setInterval(() => {
        //   this.currentPosition =
        //     (100 / this.audio.duration) * this.audio.currentTime.toFixed();
        // }, 100);
      }
    },
    // playerOperation(parameter) {
    //   if (Object.keys(this.$store.getters.nowPlaying).length === 0) {
    //     this.$store.dispatch("setNowPlaying", {});
    //     this.audio = new Audio(this.$store.getters.nowPlaying.url);
    //     this.audio.volume = this.volume;
    //     this.$store.dispatch("setPlayPauseState", true);
    //     this.audio.play();
    //     this.intervalId = setInterval(() => {
    //       this.currentPosition =
    //         (100 / this.audio.duration) * this.audio.currentTime.toFixed();
    //     }, 100);
    //   } else {
    //     var index = musicDatabase.indexOf(this.$store.getters.nowPlaying);
    //     console.log(index);
    //     let action = parameter === "next" ? index + 1 : index - 1;
    //     console.log("next");
    //     this.$store.dispatch("setNowPlaying", musicDatabase[action], parameter);
    //     this.audio.play();
    //     this.intervalId = setInterval(() => {
    //       this.currentPosition =
    //         (100 / this.audio.duration) * this.audio.currentTime.toFixed();
    //     }, 100);
    //   }
    // },
  },
};
</script>
