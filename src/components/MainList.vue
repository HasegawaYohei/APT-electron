<template>
  <v-container fluid ma-0 pa-0 fill-height>
    <v-layout text-xs-center wrap>
      <v-flex xs12>
        <ListPanel :title="title" :inspections="inspections" :isMain="true" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    title: 'APT',
    inspections: [
      {
        title: '両耳分離聴検査',
        path: 'dichoticListeningInspection',
        divider: true,
      },
      {
        title: '早口音声聴取検査',
        path: 'fastsoundListeningInspection',
        divider: true,
      },
      {
        title: 'ギャップ検出閾値検査',
        path: 'gapDetectionInspection',
        divider: true,
      },
      {
        title: '雑音下単語聴取検査',
        path: 'theWordUnderNoiseInspection',
        divider: true,
      },
      {
        title: '両耳交互聴検査',
        path: 'bothEarsAlternatingInspection',
        divider: true,
      },
      {
        title: '聴覚的注意検査',
        path: 'auditoryAttentionInspection',
        divider: true,
      },
      {
        title: '複数音声下聴取検査',
        path: 'multipleSoundListeningInspection',
        divider: false,
      },
    ],
  }),
};
</script>

<style lang='stylus'>
.text-center
  text-align center

.btn-medium
  width 80%
  height 88px

.btn-large
  width 90%
  height 88px
</style>
