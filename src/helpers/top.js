import codes from '../data/NCIcodes';

const morCodes = codes.map((item) => [item[2], item[3]]);

const top = (data) => {
  const datas = [...data];
  const headers = datas[0];
  const idx = datas[0].indexOf('TOP');
  // Remove formatting to make the codes same
  const nciMatchDesc = morCodes.map((item) => (item[1] ? item[1].replace(/[C.]+/g, '') : ''));
  const err = [];

  headers.splice(idx + 1, 0, 'TOP(Matching NCI Codes)');

  if (idx >= 0) {
    const mapped = datas.map((item, i) => {
      if (i === 0) return item;

      // Compare codes
      const matchedCode = item[idx] && nciMatchDesc.includes(item[idx].toString()) ? item[idx] : '';
      // Pick the code using index
      item.splice(idx + 1, 0, matchedCode ? morCodes[nciMatchDesc.indexOf(item[idx].toString())][1] : '');

      if (!matchedCode && item[idx]) {
        err.push(item[idx]);
      }
      return item;
    });
    return { mapped, err };
  }

  return { mapped: datas, err };
};

export default top;
