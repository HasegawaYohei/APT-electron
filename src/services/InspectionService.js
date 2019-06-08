/* eslint import/no-extraneous-dependencies: 0 */
import { remote } from 'electron';

const findUnfinishedInspection = element => element.statuses.some(status => status === '');

function getAudioFile(filepath) {
  const fs = remote.require('fs');
  const path = remote.require('path');
  const appPath = localStorage.getItem('appPath');
  const audioDirPath = path.resolve(appPath, '音声情報', filepath);
  const filenameList = fs.readdirSync(audioDirPath);
  return filenameList.filter(filename => filename.slice(-4) === '.wav').map(filename => ({
    filename,
    data: fs.readFileSync(path.resolve(audioDirPath, filename)),
  }));
}

export function internalBack(resultList, cursor) {
  const previousAudio = resultList.slice(0, cursor).reverse().find(findUnfinishedInspection);

  if (previousAudio == null || previousAudio.cursor == null) {
    return resultList.slice().reverse().find(findUnfinishedInspection).cursor;
  }
  return previousAudio.cursor;
}

export function internalNext(resultList, cursor) {
  const nextAudio = resultList.slice(cursor + 1, resultList.lenght).find(findUnfinishedInspection);

  if (nextAudio == null || nextAudio.cursor == null) {
    return resultList.find(findUnfinishedInspection).cursor;
  }
  return nextAudio.cursor;
}

export function generateAnswerButtonList(columnNumber) {
  const answerButtonList = Array.from({ length: columnNumber * 2 }).map((_, i) => {
    if (i % 2) {
      return {
        statusIndex: Math.floor(i / 2),
        label: '正答',
        color: 'success',
        answer: true,
      };
    }

    return {
      statusIndex: Math.floor(i / 2),
      label: '誤答',
      color: 'error',
      answer: false,
    };
  });

  if (columnNumber === 1) return answerButtonList;
  if (columnNumber === 2) {
    return answerButtonList.map(answerButton => ({
      ...answerButton,
      label: `${answerButton.label}${(answerButton.statusIndex % 2) ? ' - 右耳' : ' - 左耳'}`,
    }));
  }
  if (columnNumber === 3) {
    const buttonLabelDic = [
      ' - 第一文節',
      ' - 第二文節',
      ' - 第三文節',
    ];
    return answerButtonList.map(answerButton => ({
      ...answerButton,
      label: `${answerButton.label}${buttonLabelDic[answerButton.statusIndex]}`,
    }));
  }

  return answerButtonList;
}

export function generateResultListHeader(columnNumber) {
  if (columnNumber === 1) return [{ id: 'status1', value: '状態' }];
  if (columnNumber === 2) {
    return [
      { id: 'status1', value: '左耳' },
      { id: 'status2', value: '右耳' },
    ];
  }
  if (columnNumber === 3) {
    return [
      { id: 'status1', value: '語頭' },
      { id: 'status2', value: '語中' },
      { id: 'status3', value: '語尾' },
    ];
  }

  return [];
}

export async function generateAudioList(audioDirPath) {
  const context = new AudioContext();
  const audioList = await Promise.all(getAudioFile(audioDirPath).map(async (audioFile, i) => {
    const buffer = await context.decodeAudioData(audioFile.data.buffer);

    return {
      filename: audioFile.filename,
      data: audioFile.data,
      cursor: i,
      buffer,
    };
  }));

  return audioList;
}

export function generateResultList(audioList, columnNumber) {
  return audioList.map((audio, i) => ({
    filename: audio.filename,
    statuses: Array.from({ length: columnNumber }).map(() => ''),
    cursor: i,
  }));
}

export function playAudio(audioBuffer) {
  const context = new AudioContext();
  const source = context.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(context.destination);
  source.start(0);
  source.onended = () => {
    source.onended = null;
    source.stop(0);
    source.disconnect();
    context.close();
  };
}
