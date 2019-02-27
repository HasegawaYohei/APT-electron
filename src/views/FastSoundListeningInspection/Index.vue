<template>
  <v-container fluid ma-0 pa-0 fill-height>
    <v-layout text-xs-center wrap>
      <v-flex xs12>
        <ListPanel :title="title" :inspections="inspections" :browserBack="browserBack"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    title: '早口音声聴取検査',
    inspections: [
      {
        title: '通常発話文',
        divider: true,
        path: 'normal',
      },
      {
        title: '1.5倍速',
        divider: true,
        path: 'fast',
      },
      {
        title: '2倍速',
        divider: true,
        path: 'moreFast',
      },
      {
        title: '戻る',
        divider: false,
        path: 'home',
      },
    ],
    backPath: 'home',
  }),
  methods: {
    browserBack() {
      this.$router.push({
        name: this.backPath,
      });
    },
  },
};
</script>

<style lang="stylus">
.result-list
  height  660px
  overflow scroll
</style>
