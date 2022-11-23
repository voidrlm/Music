<template>
  <div>
    <v-app-bar
      :color="$vuetify.theme.dark ? '#121212' : '#FFFFFF'"
      app
      dense
      flat
    >
      <v-app-bar-nav-icon
        @click.stop="$emit('openCloseNavBar')"
      ></v-app-bar-nav-icon>

      <v-spacer></v-spacer>
      <appBarMenu />
    </v-app-bar>
  </div>
</template>

<script>
import appBarMenu from "./appBarMenu.vue";
export default {
  components: {
    appBarMenu,
  },
  data: () => ({}),
  beforeMount() {
    if (localStorage.getItem("darkTheme") !== null) {
      this.$vuetify.theme.dark = JSON.parse(localStorage.getItem("darkTheme"));
    }
    if (localStorage.getItem("lightAccent")) {
      this.$vuetify.theme.themes.light.accent =
        localStorage.getItem("lightAccent");
    }
    if (localStorage.getItem("darkAccent")) {
      this.$vuetify.theme.themes.dark.accent =
        localStorage.getItem("darkAccent");
    }
  },
  methods: {},
};
</script>
