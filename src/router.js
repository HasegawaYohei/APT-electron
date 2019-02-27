import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue'),
    },
    {
      path: '/dichotic-listening-inspection',
      name: 'dichoticListeningInspection',
      component: () => import('./views/DichoticListeningInspection/Index.vue'),
    },
    {
      path: '/dichotic-listening-inspection/single-ear-single-sound',
      name: 'singleEarSingleSound',
      props: {
        title: '単耳単音節',
        backPath: 'dichoticListeningInspection',
        audioDirPath: '両耳分離聴/単耳単音節/',
        columnNumber: 1,
      },
      component: () => import('./views/Inspection.vue'),
    },
    {
      path: '/dichotic-listening-inspection/single-ear-single-word',
      name: 'singleEarSingleWord',
      props: {
        title: '単耳単語',
        backPath: 'dichoticListeningInspection',
        audioDirPath: '両耳分離聴/単耳単語/',
        columnNumber: 1,
      },
      component: () => import('./views/Inspection.vue'),
    },
    {
      path: '/dichotic-listening-inspection/single-sound',
      name: 'singleSound',
      props: {
        title: '単音節',
        backPath: 'dichoticListeningInspection',
        audioDirPath: '両耳分離聴/単音節/',
        columnNumber: 2,
      },
      component: () => import('./views/Inspection.vue'),
    },
    {
      path: '/dichotic-listening-inspection/word',
      name: 'word',
      props: {
        title: '単語',
        backPath: 'dichoticListeningInspection',
        audioDirPath: '両耳分離聴/単語/',
        columnNumber: 2,
      },
      component: () => import('./views/Inspection.vue'),
    },
    {
      path: '/dichotic-listening-inspection/sentence',
      name: 'sentence',
      props: {
        title: '文',
        backPath: 'dichoticListeningInspection',
        audioDirPath: '両耳分離聴/文/',
        columnNumber: 2,
      },
      component: () => import('./views/Inspection.vue'),
    },
    {
      path: '/fastsound-listening-inspection',
      name: 'fastsoundListeningInspection',
      component: () => import('./views/FastSoundListeningInspection/Index.vue'),
    },
    {
      path: '/fastsound-listening-inspection/normal',
      name: 'normal',
      props: {
        title: '通常発話文',
        backPath: 'fastsoundListeningInspection',
        audioDirPath: '早口音声聴取/通常/',
        columnNumber: 3,
      },
      component: () => import('./views/Inspection.vue'),
    },
    {
      path: '/fastsound-listening-inspection/fast',
      name: 'fast',
      props: {
        title: '1.5倍速',
        backPath: 'fastsoundListeningInspection',
        audioDirPath: '早口音声聴取/半倍速/',
        columnNumber: 3,
      },
      component: () => import('./views/Inspection.vue'),
    },
    {
      path: '/fastsound-listening-inspection/moreFast',
      name: 'moreFast',
      props: {
        title: '2倍速',
        backPath: 'fastsoundListeningInspection',
        audioDirPath: '早口音声聴取/2倍速/',
        columnNumber: 3,
      },
      component: () => import('./views/Inspection.vue'),
    },
    {
      path: '/gap-detection-inspection',
      name: 'gapDetectionInspection',
      props: {
        title: 'ギャップ検出閾値検査',
        backPath: 'home',
        audioDirPath: 'ギャップ検出/',
      },
      component: () => import('./views/GapDetectionInspection/Index.vue'),
    },
    {
      path: '/the-word-under-noise-inspection',
      name: 'theWordUnderNoiseInspection',
      props: {
        title: '雑音下単語聴取検査',
        backPath: 'home',
        audioDirPath: '雑音下単語聴取/',
      },
      component: () => import('./views/TheWordUnderNoiseInspection/Index.vue'),
    },
    {
      path: '/both-ears-alternating-inspection',
      name: 'bothEarsAlternatingInspection',
      props: {
        title: '両耳交互聴取検査',
        backPath: 'home',
        audioDirPath: '両耳交互聴/',
        columnNumber: 3,
      },
      component: () => import('./views/Inspection.vue'),
    },
    {
      path: '/auditory-attention-inspection',
      name: 'auditoryAttentionInspection',
      props: {
        title: '聴覚的注意検査',
        backPath: 'home',
        audioDirPath: '聴覚的注意/',
      },
      component: () => import('./views/AuditoryAttentionInspection/Index.vue'),
    },
    {
      path: '/multiple-sound-listening-inspection',
      name: 'multipleSoundListeningInspection',
      props: {
        title: '複数音声下聴取',
        backPath: 'home',
        audioDirPath: '複数音声聴取/',
        columnNumber: 3,
      },
      component: () => import('./views/Inspection.vue'),
    },
  ],
});
