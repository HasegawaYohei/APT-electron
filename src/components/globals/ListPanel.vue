<template>
  <v-card>
    <v-toolbar color="cyan" dark>
      <v-btn v-if="!isMain" icon class="hidden-xs-only" @click="browserBack">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title>{{title}}</v-toolbar-title>
      <v-btn
        icon
        :large="true"
        color="warning"
        :style="{marginLeft: 'auto'}"
        v-if="isMain"
        @click="showDialog"
      >
        <v-icon>fas fa-folder</v-icon>
      </v-btn>
    </v-toolbar>

    <v-list two-line>
      <template v-for="(item, index) in inspections">

        <v-list-tile
          :key="item.title"
          avatar
          @click="link(item.path)"
        >
          <v-list-tile-content>
            <v-list-tile-title v-html="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-divider
          v-if="item.divider"
          :key="index"
        ></v-divider>
      </template>
    </v-list>
  </v-card>
</template>

<script>
/* eslint import/no-extraneous-dependencies: 0 */
import { remote } from 'electron';

export default {
  props: [
    'title',
    'inspections',
    'browserBack',
    'isMain',
  ],
  data: () => ({
  }),
  methods: {
    showDialog() {
      const { dialog } = remote;
      const filepath = dialog.showOpenDialog({
        properties: ['openDirectory'],
      })[0];
      localStorage.setItem('appPath', filepath);
    },
    link(path) {
      this.$router.push({
        name: path,
      });
    },
  },
};
</script>

<style scoped lang="stylus">
.ml-minus
  margin-left -24px
</style>
