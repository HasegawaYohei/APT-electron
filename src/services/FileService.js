/* eslint import/no-extraneous-dependencies: 0 */
import { remote } from 'electron';

function zeroPadding(num, length) {
  return (Array(length).join('0') + num).slice(-length);
}

function appendFile(path, data) {
  const fs = remote.require('fs');
  fs.appendFile(path, data, (err) => {
    if (err) throw err;
  });
}

async function outputCsv(inspectionTitle, header, body, appendData) {
  const { createObjectCsvWriter } = remote.require('csv-writer');
  const fs = remote.require('fs');
  const path = remote.require('path');
  const appPath = localStorage.getItem('appPath');
  const dirPath = path.resolve(appPath, `結果出力/${inspectionTitle}`);

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }

  const fileNumber = zeroPadding(fs.readdirSync(dirPath).length + 1, 2);
  const filePath = `${dirPath}/${inspectionTitle}-${fileNumber}.csv`;
  const csvWriter = createObjectCsvWriter({
    path: filePath,
    header,
    encoding: 'utf8',
    append: false,
  });

  await csvWriter.writeRecords(body);
  const csvStringFromFile = fs.readFileSync(filePath, 'utf8');
  fs.writeFileSync(filePath, `\ufeff${csvStringFromFile}`);

  if (appendData) {
    appendFile(filePath, appendData);
  }
}

export async function outputCsvForInspectionPanel(inspectionTitle, csvHeader, bodyOrigin) {
  const header = [{ id: 'filename', value: 'ファイル名' }].concat(csvHeader).map(elem => ({
    id: elem.id,
    title: elem.value,
  }));
  const body = bodyOrigin.map((elem) => {
    const row = { filename: elem.filename };
    elem.statuses.forEach((status, i) => {
      row[`status${i + 1}`] = status;
    });
    return row;
  });

  const totalInspectionNumber = bodyOrigin
    .filter(elem => elem.statuses.every(status => status !== '')).length;
  const totalCurrectAnserNumber = bodyOrigin
    .filter(elem => elem.statuses.every(status => status === '正答')).length;
  const appendData = `正答率  ${Math.round(totalCurrectAnserNumber / totalInspectionNumber * 100)}%`;

  await outputCsv(inspectionTitle, header, body, appendData);
}

export async function outputCsvForGapInspection(inspectionTitle, bodyOrigin) {
  const header = [
    { id: 'answerNumber', title: '回答数' },
    { id: 'filename', title: 'ファイル名' },
    { id: 'correctIndex', title: '乱数値' },
    { id: 'selectedNumber', title: '選択値' },
    { id: 'result', title: '結果' },
  ];
  const body = bodyOrigin.slice().reverse();
  const level = bodyOrigin.find(elem => elem.result === '正').audioIndex;
  const appendData = `最終結果,Lv.${level} ${level * 2}ms`;

  await outputCsv(inspectionTitle, header, body, appendData);
}

export async function
outputCsvForTheWordUnderNoiseInspection(inspectionTitle, resultList, resultMapList) {
  const header = [
    { id: 'filename', title: 'ファイル名' },
    { id: 'result', title: '結果' },
  ];
  const body = resultList;
  const appendDataOrigin = resultMapList.map(resultMap => ({
    condition: resultMap.condition,
    correctNumber: resultMap.correctNumber,
    wrongNumber: resultMap.wrongNumber,
    correctPercent: resultMap.correctPercent(),
  }));
  const appendData = ['S/N条件,正答数,誤答数,正答率']
    .concat(appendDataOrigin.map(resultMap => Object.values(resultMap).join(','))).join('\n');

  await outputCsv(inspectionTitle, header, body, `\n${appendData}`);
}

export async function outputCsvForAuditoryAttentionInspection(inspectionTitle, resultList) {
  const header = [
    { id: 'result', title: '正誤' },
    { id: 'time', title: '応答時間[ms]' },
  ];
  const body = resultList;
  const correctAnswerList = resultList.filter(result => result.result === '正');
  const averageTimeOfCorrectAnswer = correctAnswerList
    .map(result => result.time)
    .reduce((prev, current) => prev + current) / correctAnswerList.length;
  const wrongAnswerList = resultList.filter(result => result.result === '誤');
  const averageTimeOfWrongAnswer = wrongAnswerList
    .map(result => result.time)
    .reduce((prev, current) => prev + current) / wrongAnswerList.length;
  const correctNumber = resultList.filter(_result => _result.result === '正').length;
  const wrongNumber = resultList.filter(_result => _result.result === '誤').length;
  const appendData = [
    '正答数,誤答数,正答率(正答数 / 20)',
    `${correctNumber},${wrongNumber},${Math.round(correctNumber / 20 * 100)}%`,
    '正答 応答時間平均,誤答 応答時間平均',
    `${averageTimeOfCorrectAnswer},${averageTimeOfWrongAnswer}`,
  ].join('\n');

  await outputCsv(inspectionTitle, header, body, appendData);
}
