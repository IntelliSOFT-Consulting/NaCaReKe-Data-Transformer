import didYouMean from 'didyoumean';

// Match morphology & topology codes
const addMatch = (title, col, datas, codes) => {
  const headers = datas[0];
  const nci = codes.filter((item, i) => i > 1);
  const checkMor = title.includes('MOR')
    ? nci.map((item) => [item[0], item[1]])
    : nci.map((item) => [item[2], item[3]]);

  const idx = headers.indexOf(title);

  headers.splice(idx + 1, 0, col);

  const final = datas.map((row, i) => {
    if (i === 0) {
      return row;
    }
    if (title.includes('MOR')) {
      const nciMatch = checkMor.map((item) => item[0]);
      const finder = row[idx + 1]
        ? didYouMean(row[idx + 1].toString(), nciMatch)
        : '';
      row.splice(
        idx + 1,
        0,
        finder && checkMor[nciMatch.indexOf(row[idx + 1])]
          ? checkMor[nciMatch.indexOf(row[idx + 1])][1]
          : '',
      );
    } else {
      const nciMatchTop = checkMor.map((item) => (item[1] ? item[1].replace(/[C.]+/g, '') : ''));

      row.splice(
        idx + 1,
        0,
        row[idx] && nciMatchTop.includes(row[idx].toString())
          ? checkMor[nciMatchTop.indexOf(row[idx].toString())][1]
          : '',
      );
    }
    return row;
  });
  return final;
  //   setData(final);
};

export default addMatch;
