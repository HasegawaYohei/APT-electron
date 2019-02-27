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
        <v-btn
          :large="true"
          color="info"
          class="btn-custom"
          @click="play"
          >{{playStatus}}</v-btn>
      </v-flex>
    </v-layout>

    <v-layout text-xs-center wrap>
      <v-flex xs12>
        <v-btn
          :large="true"
          class="btn-custom"
          :disabled="!played"
          @click="answer(-1)"
          >不明 / 該当なし</v-btn>
      </v-flex>
    </v-layout>

    <v-layout text-xs-center wrap>
      <v-flex xs3>
        <v-btn
          :large="true"
          class="btn-custom"
          :class="{ active: activeNo[0] }"
          :disabled="!played"
          @click="answer(0)"
          >No. 1</v-btn>
      </v-flex>
      <v-flex xs3>
        <v-btn
          :large="true"
          class="btn-custom"
          :class="{ active: activeNo[1] }"
          :disabled="!played"
          @click="answer(1)"
          >No. 2</v-btn>
      </v-flex>
      <v-flex xs3>
        <v-btn
          :large="true"
          class="btn-custom"
          :class="{ active: activeNo[2] }"
          :disabled="!played"
          @click="answer(2)"
          >No. 3</v-btn>
      </v-flex>
      <v-flex xs3>
        <v-btn
          :large="true"
          class="btn-custom"
          :class="{ active: activeNo[3] }"
          :disabled="!played"
          @click="answer(3)"
          >No. 4</v-btn>
      </v-flex>
    </v-layout>

    <v-list>
      <v-layout mt-4 justify-center wrap>
        <v-flex xs2>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>回答数</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
        </v-flex>
        <v-flex xs4>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>使用ファイル名</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
        </v-flex>
        <v-flex xs2>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>乱数値</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
        </v-flex>
        <v-flex xs2>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>選択値</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
        </v-flex>
        <v-flex xs2>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>結果</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
        </v-flex>
      </v-layout>
      <div class="result-list">
        <template v-for="(result, i) in resultList">
          <v-layout :key="i">
              <v-flex xs2>
                <v-list-tile :class="i === 0 ? 'latest-answer' : ''">
                  <v-list-tile-content>
                    <v-list-tile-title>{{result.answerNumber}}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>
              </v-flex>
              <v-flex xs4>
                <v-list-tile :class="i === 0 ? 'latest-answer' : ''">
                  <v-list-tile-content>
                    <v-list-tile-title>{{result.filename}}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>
              </v-flex>
              <v-flex xs2>
                <v-list-tile :class="i === 0 ? 'latest-answer' : ''">
                  <v-list-tile-content>
                    <v-list-tile-title>{{result.correctIndex}}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>
              </v-flex>
              <v-flex xs2>
                <v-list-tile :class="i === 0 ? 'latest-answer' : ''">
                  <v-list-tile-content>
                    <v-list-tile-title>{{result.selectedNumber}}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>
              </v-flex>
              <v-flex xs2>
                <v-list-tile :class="i === 0 ? 'latest-answer' : ''">
                  <v-list-tile-content>
                    <v-list-tile-title>{{result.result}}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>
              </v-flex>
          </v-layout>
        </template>
      </div>
    </v-list>
  </div>
</template>

<script>
/* eslint no-await-in-loop: 0 */

import { playAudio, outputCsvForGapInspection } from '../services/InspectionService';

function sleep(msec) {
  return new Promise(resolve => setTimeout(resolve, msec));
}

async function intervalFunc(callback, audioIndexies) {
  const interval = 1300;
  for (let i = 0; i < 4; i += 1) {
    callback(audioIndexies[i], i);
    await sleep(interval);
  }
}

const levelBlockMap = [8, 4, 2, 1];

export default {
  props: [
    'title',
    'backPath',
    'audioList',
  ],
  data: () => ({
    audioIndex: 17,
    audioIndexies: [],
    correctIndex: 0,
    played: false,
    previousAnswer: false,
    activeNo: [],
    playStatus: '再生',
    levelBlock: 0,
    resultList: [],
    answerNumber: 0,
  }),
  methods: {
    async play() {
      const audioIndexies = Array.from({ length: 4 }).map(() => 0);
      this.correctIndex = this.played
        ? this.correctIndex
        : Math.floor(Math.random() * 4);
      audioIndexies[this.correctIndex] = this.audioIndex;
      const playSound = (audioIndex, playNumber) => {
        if (playNumber !== 0) this.activeNo[playNumber - 1] = false;
        this.activeNo[playNumber] = true;
        this.$forceUpdate();

        playAudio(this.audioList[audioIndex].buffer);
      };

      this.playStatus = '再生中';
      await intervalFunc(playSound, audioIndexies);

      this.activeNo[3] = false;
      this.$forceUpdate();
      this.played = true;
      this.playStatus = '再生';
    },
    answer(number) {
      this.played = false;
      this.answerNumber += 1;
      const correct = this.correctIndex === number;

      this.resultList.unshift({
        answerNumber: this.answerNumber,
        filename: this.audioList[this.audioIndex].filename,
        correctIndex: this.correctIndex + 1,
        selectedNumber: number + 1,
        result: correct ? '正' : '誤',
        audioIndex: this.audioIndex,
      });

      if (correct) {
        this.correct();
      } else {
        this.wrong();
      }

      if (this.levelBlock === 4) return this.finish();

      if (this.audioIndex < 1) this.audioIndex = 1;
      if (this.audioIndex > 17) this.audioIndex = 17;

      return 0;
    },
    correct() {
      if (this.previousAnswer) {
        this.audioIndex -= levelBlockMap[this.levelBlock];
        this.previousAnswer = false;
      } else {
        this.previousAnswer = true;
      }
    },
    wrong() {
      this.previousAnswer = false;
      this.audioIndex += levelBlockMap[this.levelBlock];
      this.levelBlock += 1;
    },
    async finish() {
      await outputCsvForGapInspection(this.title, this.resultList);
      this.browserBack();
    },
    browserBack() {
      this.$router.push({
        name: this.backPath,
      });
    },
  },
};
</script>

<style scoped lang="stylus">
.btn-custom
  width 90%
.active
  border solid 2px #F50057 !important
.latest-answer
  background-color #BBDEFB
.result-list
  height 560px
  overflow scroll !important
</style>
