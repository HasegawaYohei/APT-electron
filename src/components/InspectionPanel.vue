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

    <v-list>
      <v-layout text-xs-center wrap>
        <v-flex xs3>
          <v-btn
            :large="true"
            class="btn-large"
            :disabled="played"
            @click="moveCursor('back')"
             >戻</v-btn>
        </v-flex>
        <v-flex xs6>
          <v-btn
            color="info"
            :large="true"
            class="btn-large"
            @click="play"
             >再生</v-btn>
        </v-flex>
        <v-flex xs3>
          <v-btn
            :large="true"
            class="btn-large"
            :disabled="played"
            @click="moveCursor('next')"
             >次</v-btn>
        </v-flex>
      </v-layout>
      <v-layout text-xs-center>
          <v-flex grow v-for="(answerButton, i) in answerButtonList" :key="i">
            <v-btn
              :large="true"
              :color="answerButton.color"
              class="btn-large"
              :disabled="!played"
              @click="answer(answerButton.statusIndex, answerButton.answer)"
            >
              {{answerButton.label}}
            </v-btn>
          </v-flex>
      </v-layout>
    </v-list>

    <v-list>
      <v-layout>
        <v-flex xs6>
          <v-list-tile
          >
            <v-list-tile-content>
              <v-list-tile-title>ファイル名</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider
          ></v-divider>
        </v-flex>
        <v-flex grow v-for="(header, i) in resultListHeader" :key="i">
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>{{header.value}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
        </v-flex>
      </v-layout>
      <div class="result-list">
        <template v-for="(result, index) in resultList">
          <v-layout :key="index">
            <v-flex xs6>
              <v-list-tile
                :key="result.filename"
                :class="cursor === index ? 'active' : 'disactive'"
              >
                <v-list-tile-content>
                  <v-list-tile-title v-html="result.filename"></v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider></v-divider>
            </v-flex>
            <v-flex grow v-for="(status, i) in result.statuses" :key="i">
              <v-list-tile
                :class="cursor === index ? 'active' : 'disactive'"
              >
                <v-list-tile-content>
                  <v-list-tile-title>{{status}}</v-list-tile-title>
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

import {
  internalNext,
  internalBack,
  playAudio,
} from '../services/InspectionService';
import { outputCsvForInspectionPanel } from '../services/FileService';

export default {
  props: [
    'title',
    'backPath',
    'answerButtonList',
    'resultListHeader',
    'audioList',
    'resultList',
  ],
  data: () => ({
    cursor: 0,
    played: false,
  }),
  methods: {
    play() {
      const audioBuffer = this.audioList
        .find(_audioBuffer => _audioBuffer.cursor === this.cursor).buffer;
      playAudio(audioBuffer);
      this.played = true;
    },
    moveCursor(direction) {
      this.played = false;
      this.cursor = ((_direction) => {
        if (_direction === 'next') return internalNext(this.resultList, this.cursor);
        return internalBack(this.resultList, this.cursor);
      })(direction);
    },
    answer(statusIndex, result) {
      const { statuses } = this.resultList[this.cursor];
      this.resultList[this.cursor].statuses = statuses.map((status, i) => {
        if (i === statusIndex) return result ? '正答' : '誤答';
        return status;
      });

      if (this.resultList[this.cursor].statuses.some(status => status === '')) return;

      const finish = this.resultList.find(_result => !_result.statuses.every(status => status !== '')) == null;

      if (finish) {
        this.finish();
        return;
      }

      this.played = false;
      this.cursor = internalNext(this.resultList, this.cursor);
    },
    async finish() {
      await outputCsvForInspectionPanel(this.title, this.resultListHeader, this.resultList);
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
.active
  background-color #BBDEFB
.result-list
  height 610px
  overflow scroll !important
</style>
