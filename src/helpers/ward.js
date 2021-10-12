const isInvalid = (input) => input
  && !/UNKNOWN|Unknown|NONE|N\/A|Invalid code|Invalid category.+/g.test(input);

const replaceAddr = (addr, txt = '') => `${addr
  .toString()
  .replace(/UNKNOWN|Unknown|County|Sub County|Invalid code|Ward|[.,]+/g, '')
  .trim()} ${txt}`;

const checkWard = (data, col) => {
  const headers = data[0];
  const idx = data[0].indexOf(col);

  if (idx > -1) {
    headers.splice(idx + 1, 0, 'ADDR (Ward)');
    const addr = data.map((item, i) => {
      if (i === 0) return item;
      const sc = isInvalid(item[idx])
        ? replaceAddr(item[idx], 'Ward')
        : '';
      item.splice(idx + 1, 0, sc);
      return item;
    });
    return { addr };
  }
  return { addr: data, err: [] };
};

export default checkWard;
