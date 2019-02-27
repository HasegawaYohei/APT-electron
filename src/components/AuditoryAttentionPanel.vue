<template>
  <div>
    <v-card>
      <v-toolbar color="cyan" dark>
        <v-btn icon class="hidden-xs-only" @click="browserBack">
          <v-icon>arrow_back</v-icon>
        </v-btn>
        <v-toolbar-title>{{title}}</v-toolbar-title>
        <v-btn
          :large="true"
          color="warning"
          :style="{marginLeft: 'auto'}"
          @click="finish"
          >中断終了</v-btn>
      </v-toolbar>
    </v-card>

    <v-layout text-xs-center mt-3 wrap>
      <v-flex xs12>
        1の後に「9」が出てきたら、スペースキーを押してください
        <v-btn
          color="info"
          class="btn-custom"
          :large="true"
          :disabled="!ready || played"
          @click="play"
          >{{ played ? '再生中' : '再生'}}</v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
/* eslint no-await-in-loop: 0 */

import { shuffleArray, flattenArray } from '../services/ArrayService';
import { generateAudioList, playAudio, outputCsvForAuditoryAttentionInspection } from '../services/InspectionService';

let start = 0;
let play = false;
let isCorrect = false;
const resultList = [];

document.onkeydown = function answer(e) {
  if (play === false) return;
  if (e.keyCode !== 32) return;

  const end = performance.now();
  const time = end - start;

  if (isCorrect === true) resultList.push({ result: '正', time: Math.round(time) });
  else resultList.push({ result: '誤', time: Math.round(time) });
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function buildSoundList(audioListOrigin) {
  const correctAnswer = [
    {
      ...audioListOrigin[0],
      correct: false,
    },
    {
      ...audioListOrigin[6],
      correct: true,
    },
  ];
  const correctAnswerArray = Array.from({ length: 20 }).map(() => correctAnswer);
  const wrongAnswer1Array = Array.from({ length: 10 }).map(() => ([
    {
      ...audioListOrigin[0],
      correct: false,
    },
    {
      ...audioListOrigin[getRandomInt(1, 6)],
      correct: false,
    },
  ]));
  const wrongAnswer2Array = Array.from({ length: 10 }).map(() => ([
    {
      ...audioListOrigin[getRandomInt(1, 6)],
      correct: false,
    },
    {
      ...audioListOrigin[6],
      correct: false,
    },
  ]));
  const wrongAnswer3Array = Array.from({ length: 10 }).map(() => ([
    {
      ...audioListOrigin[getRandomInt(1, 6)],
      correct: false,
    },
    {
      ...audioListOrigin[getRandomInt(1, 6)],
      correct: false,
    },
  ]));

  return flattenArray(
    shuffleArray(correctAnswerArray.concat(
      wrongAnswer1Array, wrongAnswer2Array, wrongAnswer3Array,
    )),
  );
}

function sleep(msec) {
  return new Promise(resolve => setTimeout(resolve, msec));
}

export default {
  props: [
    'title',
    'backPath',
    'audioDirPath',
  ],
  data: () => ({
    audioList: [],
    ready: false,
    played: false,
  }),
  methods: {
    play() {
      play = true;
      this.played = true;

      const playSound = (i) => {
        isCorrect = this.audioList[i].correct;
        playAudio(this.audioList[i].buffer);
        start = performance.now();
      };

      this.intervalFunc(playSound);
    },
    async intervalFunc(callback) {
      const intervals = [
        800,
        1500,
        3000,
      ];

      for (let i = 0; i < 100; i += 1) {
        const interval = intervals[getRandomInt(0, 3)];
        callback(i);
        await sleep(interval);
      }

      play = false;
      this.played = false;
      this.finish();
    },
    async finish() {
      await outputCsvForAuditoryAttentionInspection(this.title, resultList);
      this.browserBack();
    },
    browserBack() {
      this.audioList = [];
      this.$router.push({
        name: this.backPath,
      });
    },
  },
  async created() {
    const audioListOrigin = await generateAudioList(this.audioDirPath);
    this.audioList = buildSoundList(audioListOrigin);
    this.ready = true;
  },
};
</script>

<style scoped lang="stylus">
.btn-custom
  width 80%
</style>
