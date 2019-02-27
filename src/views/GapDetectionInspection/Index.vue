<template>
  <GapDetectionInspectionPanel
    class="full"
    :title="title"
    :backPath="backPath"
    :audioList="audioList"
  />
</template>

<script>
import GapDetectionInspectionPanel from '../../components/GapDetectionInspectionPanel.vue';
import { generateAudioList } from '../../services/InspectionService';

export default {
  props: [
    'title',
    'backPath',
    'audioDirPath',
  ],
  data: () => ({
    audioList: [],
  }),
  async created() {
    this.audioList = await generateAudioList(this.audioDirPath);
  },
  components: { GapDetectionInspectionPanel },
};
</script>

<style scoped lang="stylus">
.result-list
  height  610px
  overflow scroll
.full
  width 100%
  height 100%
</style>
