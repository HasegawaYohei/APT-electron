<template>
  <AuditoryAttentionPanel
    class="full"
    :title="title"
    :backPath="backPath"
    :audioDirPath="audioDirPath"
  />
</template>

<script>
import AuditoryAttentionPanel from '../../components/AuditoryAttentionPanel.vue';

export default {
  props: [
    'title',
    'backPath',
    'audioDirPath',
  ],
  components: { AuditoryAttentionPanel },
};
</script>

<style scoped lang="stylus">
.full
  width 100%
  height 100%
</style>
