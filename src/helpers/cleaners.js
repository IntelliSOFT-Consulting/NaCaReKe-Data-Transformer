/* eslint-disable consistent-return */
export const capitalize = (str) => str.toLowerCase().replace(/\b[a-z]/g, (char) => char.toUpperCase());

export const cleanAddrChars = (str) => {
  if (!str) return;
  const checks = `${['Unknown', 'County', 'Sub County', 'Invalid Code', 'Invalid Category'].map((item) => `${item}|${item.toLowerCase()}|${item.toUpperCase()}`).join('|')}|[.,']`;
  const reg = new RegExp(`(${checks})`, 'gi');
  return capitalize(str.replace(reg, '')).trim();
};

export const checkFields = (field) => {
  if (!field) return;
  const str = field.toString();
  const checks = `${['Unknown', 'N/A', '#N/A', 'County', 'Sub County', 'Invalid Code', 'Invalid Category'].map((item) => `${item}|${item.toLowerCase()}|${item.toUpperCase()}`).join('|')}`;
  const reg = new RegExp(`(${checks})`, 'gi');
  return str.replace(reg, '').trim();
};

export const phoneCheck = (phone) => {
  if (!phone) return;
  const str = phone.toString();
  const checks = `${['None'].map((item) => `${item}|${item.toLowerCase()}|${item.toUpperCase()}`).join('|')}|[.,]`;
  const reg = new RegExp(`(${checks})`, 'gi');
  return str.replace(reg, '').trim();
};

export const dataCleaner = async (datas) => {
  const addrDesc = datas[0].indexOf('ADDR (desc)');
  const addrCat = datas[0].indexOf('ADDR (cat)');
  const cleaned = await datas.map((row, i) => {
    if (i === 0) return row;
    const checker = row.map((item, idx) => (idx === addrDesc
      || idx === addrCat ? cleanAddrChars(item) : checkFields(item)));
    return checker;
  });
  return cleaned;
};
