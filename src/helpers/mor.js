import didYouMean from 'didyoumean';
import codes from '../data/NCIcodes';

const morCodes = codes.map((item) => [item[0], item[1]]);

const mor = (data) => {
  const datas = [...data];
  const headers = datas[0];
  const idx = datas[0].indexOf('MOR (desc)');
  const nciMatchDesc = morCodes.map((item) => item[0]);
  const err = [];

  headers.splice(idx + 1, 0, 'MOR(Matching NCI Codes)');

  if (idx >= 0) {
    const mapped = datas.map((item, i) => {
      if (i === 0) return item;
      const matchedCode = item[idx] ? didYouMean(item[idx], nciMatchDesc) : '';
      if (matchedCode) {
        item.splice(idx + 1, 0, morCodes[nciMatchDesc.indexOf(matchedCode)][1]);
      }

      if (!matchedCode && item[idx]) {
        err.push(item[idx]);
      }
      return item;
    });
    return { mapped, err };
  }

  return { mapped: datas, err };
};

export default mor;
