<template>
  <v-container fluid ma-0 pa-0 fill-height>
    <v-layout text-xs-center wrap>
      <v-flex xs12>
        <ListPanel
          :title="title"
          :inspections="inspections"
          :browserBack="browserBack"
          :isMain="false"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    title: '両耳分離聴検査',
    inspections: [
      {
        title: '単耳単音節',
        divider: true,
        path: 'singleEarSingleSound',
      },
      {
        title: '単耳単語',
        divider: true,
        path: 'singleEarSingleWord',
      },
      {
        title: '単音節',
        divider: true,
        path: 'singleSound',
      },
      {
        title: '単語',
        divider: true,
        path: 'word',
      },
      {
        title: '文',
        divider: true,
        path: 'sentence',
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
