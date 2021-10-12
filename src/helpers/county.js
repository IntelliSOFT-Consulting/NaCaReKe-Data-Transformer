import counties from '../data/counties';

const isInvalid = (input) => input
  && !/UNKNOWN|Unknown|NONE|N\/A|Invalid code|Invalid category.+/g.test(input);

const replaceAddr = (addr, txt = '') => `${addr
  .toString()
  .replace(/UNKNOWN|Unknown|County|Sub County|Invalid code|[.,]+/g, '')
  .trim()} ${txt}`;

const checkCounty = (data, col) => {
  const headers = data[0];
  const idx = data[0].indexOf(col);
  const err = [];

  if (idx > -1) {
    headers.splice(idx + 1, 0, 'ADDR (County)');
    const addr = data.map((item, i) => {
      if (i === 0) return item;
      const sc = isInvalid(item[idx])
        ? replaceAddr(item[idx], 'County')
        : '';
      if (sc && !counties.includes(sc)) {
        err.push(sc);
      }
      item.splice(idx + 1, 0, sc);
      return item;
    });
    return { addr, err };
  }
  return { addr: data, err };
};

export default checkCounty;
