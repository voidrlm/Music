<template>
  <v-container fluid>
    <v-card-title
      :class="
        $vuetify.breakpoint.mdAndUp ? 'text-h4 mt-n7' : 'text-h5 justify-center'
      "
      >Playlists</v-card-title
    >
  </v-container>
</template>
<script>
export default {
  name: "playlist-component",
  data: () => ({}),
  computed: {},
};
</script>
