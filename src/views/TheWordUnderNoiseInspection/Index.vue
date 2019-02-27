<template>
  <TheWordUnderNoisePanel
    class="full"
    :title="title"
    :backPath="backPath"
    :audioDirPath="audioDirPath"
  />
</template>

<script>
import TheWordUnderNoisePanel from '../../components/TheWordUnderNoisePanel.vue';

export default {
  props: [
    'title',
    'backPath',
    'audioDirPath',
  ],
  components: { TheWordUnderNoisePanel },
};
</script>

<style lang="stylus">
.result-list
  height  380px
  overflow scroll
.full
  width 100%
  height 100%
</style>
