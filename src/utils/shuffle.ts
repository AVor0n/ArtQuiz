function shuffle(arr: Array<any>) {
  const shuffleArr = arr.slice();

  for (let i = shuffleArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffleArr[i], shuffleArr[j]] = [shuffleArr[j], shuffleArr[i]];
  }

  return shuffleArr;
}

export default shuffle;
