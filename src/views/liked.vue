<template>
  <v-container fluid>
    <v-card-title
      :class="
        $vuetify.breakpoint.mdAndUp ? 'text-h4 mt-n7' : 'text-h5 justify-center'
      "
      >Liked</v-card-title
    >
  </v-container>
</template>
<script>
export default {
  name: "liked-component",
  data: () => ({}),
  computed: {},
};
</script>
