export const capitalize = (str) => str.toLowerCase().replace(/\b[a-z]/g, (char) => char.toUpperCase());

export const cleanAddrChars = (str) => {
  const checks = `${['Unknown', 'County', 'Sub County', 'Invalid Code', 'Invalid Category'].map((item) => `${item}|${item.toLowerCase()}|${item.toUpperCase()}`).join('|')}|[.,']`;
  const reg = new RegExp(`(${checks})`, 'gi');
  return str.replace(reg, '');
};

export const cleanAddr = (datas, field) => {
  const addr = datas[0].indexOf(field);
  if (addr >= 0) {
    const cleaned = datas.map((item, i) => {
      if (i === 0) return item;

      item.splice(
        addr,
        1,
        item[addr]
          ? cleanAddrChars(item[addr]
            .capitalize()
            .trim())
          : '',
      );
      return item;
    });
    return cleaned;
  }
  return datas;
};
