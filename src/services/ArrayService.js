export function shuffleArray(arrayOrigin) {
  const array = arrayOrigin;
  for (let i = array.length - 1; i >= 0; i -= 1) {
    const rand = Math.floor(Math.random() * (i + 1));
    [array[i], array[rand]] = [array[rand], array[i]];
  }

  return array;
}

export function flattenArray(array) {
  return array.reduce((a, c) => (Array.isArray(c) ? a.concat(flattenArray(c)) : a.concat(c)), []);
}

export function splitArray(array, part) {
  const tmp = [];
  for (let i = 0; i < array.length; i += part) {
    tmp.push(array.slice(i, i + part));
  }
  return tmp;
}
