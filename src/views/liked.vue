<template>
  <v-container fluid>
    <v-card-title
      :class="
        $vuetify.breakpoint.mdAndUp ? 'text-h4 mt-n7' : 'text-h5 justify-center'
      "
      >Liked</v-card-title
    >
    <v-card max-width="400" class="mx-auto">
      <v-container class="pa-1">
        <v-item-group v-model="selected" multiple>
          <v-row>
            <v-col v-for="(item, i) in items" :key="i" cols="12" md="6">
              <v-item v-slot="{ active, toggle }">
                <v-img
                  :src="`https://cdn.vuetifyjs.com/images/${item.src}`"
                  height="150"
                  class="text-right pa-2"
                  @click="toggle"
                >
                  <v-btn icon dark>
                    <v-icon>
                      {{ active ? "mdi-heart" : "mdi-heart-outline" }}
                    </v-icon>
                  </v-btn>
                </v-img>
              </v-item>
            </v-col>
          </v-row>
        </v-item-group>
      </v-container>
    </v-card>
  </v-container>
</template>
<script>
export default {
  name: "liked-component",
  data: () => ({
    items: [
      {
        src: "backgrounds/bg.jpg",
      },
      {
        src: "backgrounds/md.jpg",
      },
      {
        src: "backgrounds/bg-2.jpg",
      },
      {
        src: "backgrounds/md2.jpg",
      },
    ],
    selected: [],
  }),
  computed: {},
};
</script>
