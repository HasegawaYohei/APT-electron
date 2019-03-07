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

    <v-layout text-xs-center justify-center mt-2 wrap>
      <v-flex xs3>
        <v-btn
          color="error"
          :large="true"
          class="btn-large"
          :disabled="!played"
          @click="answer(false)"
            >誤答</v-btn>
      </v-flex>
      <v-flex xs6>
        <v-btn
          color="info"
          class="btn-large"
          :large="true"
          :disabled="!ready"
          @click="play"
          >再生</v-btn>
      </v-flex>
      <v-flex xs3>
        <v-btn
          color="success"
          :large="true"
          class="btn-large"
          :disabled="!played"
          @click="answer(true)"
            >正答</v-btn>
      </v-flex>
    </v-layout>
    <div v-if="ready">
      <v-layout text-xs-center justify-center mt-3 wrap>
        <v-flex xs1>
          S/N 条件
        </v-flex>
        <v-flex xs1>
          +10dB
        </v-flex>
        <v-flex xs1>
          +5dB
        </v-flex>
        <v-flex xs1>
          0dB
        </v-flex>
        <v-flex xs1>
          -5dB
        </v-flex>
        <v-flex xs1>
          -10dB
        </v-flex>
        <v-flex xs1>
          -15dB
        </v-flex>
      </v-layout>
      <template v-for="(row, i) in audioTable">
        <v-layout text-xs-center justify-center mt-3 wrap :key="i">
          <v-flex xs1></v-flex>
          <v-flex xs1 v-for="(audio, j) in row" :key="j">
            <div
              :style="{
                background: audio.label === '済'
                  ? '#5b5b5b'
                  : '#fff',
                border: 'solid 1px #41afcb',
                color: '#252525',
                fontSize: '18px',
                padding: '3px 0'
              }"
            >
              {{audio.label}}
            </div>
          </v-flex>
        </v-layout>
      </template>

      <v-layout>
        <v-flex xs4>
          <v-list>
            <v-layout wrap>
              <v-flex xs9>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>ファイル名</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>
              </v-flex>
              <v-flex xs3>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>結果</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>
              </v-flex>
            </v-layout>
            <div class="result-list">
              <template v-for="(result, index) in resultList">
                <v-layout :key="index">
                  <v-flex xs9>
                    <v-list-tile>
                      <v-list-tile-content>
                        <v-list-tile-title>
                          {{result.filename}}
                        </v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-divider></v-divider>
                  </v-flex>
                  <v-flex xs3>
                    <v-list-tile>
                      <v-list-tile-content>
                        <v-list-tile-title>
                          {{result.result}}
                        </v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-divider></v-divider>
                  </v-flex>
                </v-layout>
              </template>
            </div>
          </v-list>
        </v-flex>
        <v-flex xs8>
          <v-list>
            <v-layout wrap>
              <v-flex xs3>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>S/N 条件</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>
              </v-flex>
              <v-flex xs3>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>正答数</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>
              </v-flex>
              <v-flex xs3>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>誤答数</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>
              </v-flex>
              <v-flex xs3>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>正答率</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>
              </v-flex>
            </v-layout>
            <template v-for="(result, index) in resultMapList">
              <v-layout :key="index" wrap>
                <v-flex xs3>
                  <v-list-tile>
                    <v-list-tile-content>
                      <v-list-tile-title>{{result.condition}}</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-divider></v-divider>
                </v-flex>
                <v-flex xs3>
                  <v-list-tile>
                    <v-list-tile-content>
                      <v-list-tile-title>{{result.correctNumber}}</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-divider></v-divider>
                </v-flex>
                <v-flex xs3>
                  <v-list-tile>
                    <v-list-tile-content>
                      <v-list-tile-title>{{result.wrongNumber}}</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-divider></v-divider>
                </v-flex>
                <v-flex xs3>
                  <v-list-tile>
                    <v-list-tile-content>
                      <v-list-tile-title>{{result.correctPercent()}}</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-divider></v-divider>
                </v-flex>
              </v-layout>
            </template>
          </v-list>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
import { shuffleArray, flattenArray, splitArray } from '../services/ArrayService';
import { generateAudioList, playAudio } from '../services/InspectionService';
import { outputCsvForTheWordUnderNoiseInspection } from '../services/FileService';

function buildAudioList(audioListOrigin) {
  return audioListOrigin.map(audio => ({
    ...audio,
    done: false,
  }));
}

function buildAudioTable(audioList, remainingAudioNumber) {
  const numberArray = shuffleArray(Array.from({ length: remainingAudioNumber }).map((_, i) => i));
  const labeledAudioList = audioList.map(audio => ({
    audio,
    label: numberArray.pop(),
  }));

  return splitArray(labeledAudioList, 6);
}

function updateAudioTableLabel(audioTable) {
  return audioTable.map(labeledAudioArray => labeledAudioArray.map(labeledAudio => ({
    audio: labeledAudio.audio,
    label: labeledAudio.audio.done
      ? '済'
      : labeledAudio.label - 1,
  })));
}

function correctPercent() {
  if (!(this.correctNumber || this.wrongNumber)) return 0;
  return Math.round((this.correctNumber / (this.correctNumber + this.wrongNumber)) * 100);
}

function buildResultMapObject(condition) {
  return {
    condition,
    correctNumber: 0,
    wrongNumber: 0,
    correctPercent,
  };
}

export default {
  props: [
    'title',
    'backPath',
    'audioDirPath',
  ],
  data: () => ({
    ready: false,
    played: false,
    currentAudio: null,
    audioList: [],
    audioTable: [],
    resultList: [],
    resultMapList: [
      buildResultMapObject('+10dB'),
      buildResultMapObject('+05dB'),
      buildResultMapObject('+00dB'),
      buildResultMapObject('-05dB'),
      buildResultMapObject('-10dB'),
      buildResultMapObject('-15dB'),
    ],
    remainingAudioNumbern: 36,
    answerNumber: 0,
  }),
  methods: {
    play() {
      this.currentAudio = this.currentAudio
        ? this.currentAudio
        : flattenArray(this.audioTable).find(v => v.label === 0);

      if (!this.played) {
        this.played = true;
        this.resultList.unshift({
          filename: this.currentAudio.audio.filename,
        });
      }

      this.currentAudio.label = '再';
      playAudio(this.currentAudio.audio.buffer);
    },
    answer(isCorrect) {
      this.currentAudio.audio.done = true;
      this.remainingAudioNumber -= 1;
      this.audioTable = updateAudioTableLabel(this.audioTable);
      this.resultList[0].result = isCorrect ? '正' : '誤';
      const condition = this.currentAudio.audio.filename.match(/(\+|-)[0-9]{1,2}dB/)[0];
      const resultMap = this.resultMapList.find(_resultMap => _resultMap.condition === condition);

      this.answerNumber += 1;
      this.currentAudio = null;
      this.played = false;

      if (isCorrect) resultMap.correctNumber += 1;
      else resultMap.wrongNumber += 1;

      if (this.remainingAudioNumber === 0) this.finish();
    },
    getRgb(remainingAudioNumber, audioNumber) {
      const n = ((remainingAudioNumber - audioNumber) / remainingAudioNumber) * 255;
      return `rgb(${285 - n},${375 - n},${255})`;
    },
    getReverseRgb(remainingAudioNumber, audioNumber) {
      const n = 255 - ((remainingAudioNumber - audioNumber) / remainingAudioNumber) * 255;
      return `rgb(${n},${n},${0})`;
    },
    async finish() {
      await outputCsvForTheWordUnderNoiseInspection(
        this.title, this.resultList, this.resultMapList,
      );
      this.browserBack();
    },
    browserBack() {
      this.$router.push({
        name: this.backPath,
      });
    },
  },
  async created() {
    const audioListOrigin = await generateAudioList(this.audioDirPath);
    this.audioList = buildAudioList(audioListOrigin);
    this.remainingAudioNumber = this.audioList.length;
    this.audioTable = buildAudioTable(this.audioList, this.remainingAudioNumber);
    this.ready = true;
  },
};
</script>

<style scoped lang="stylus">
.result-list
  height 300px
</style>
