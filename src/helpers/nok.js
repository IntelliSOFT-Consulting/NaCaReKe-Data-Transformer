const isUnknown = (data) => !/UNKNOWN|Unknown|NONE|N\/A|Invalid code+/g.test(data);
const cleanName = (name) => (!name || isUnknown(name)
  ? ''
  : name
    .toString()
    .replace(/[^A-Za-z ]/g, '')
    .trim());

const cleanNumber = (name) => (!name ? '' : `+254${name.toString().replace(/[^0-9]/g, '')}`);

const nok = (data, col) => {
  const headers = data[0];
  const idx = data[0].indexOf(col);
  if (idx > -1) {
    headers.splice(idx + 1, 0, 'NOKNAME');
    headers.splice(idx + 2, 0, 'NOKNUMBER');
    const name = data.map((item, i) => {
      if (i === 0) {
        return item;
      }
      item.splice(idx + 1, 0, cleanName(item[idx]));
      item.splice(idx + 2, 0, cleanNumber(item[idx]));
      return item;
    });
    return name;
  }
  return data;
};

export default nok;
