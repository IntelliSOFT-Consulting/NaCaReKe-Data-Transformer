import { phoneCheck } from './cleaners';

const cleanName = (name) => (!name ? '' : `+254${name.toString().replace(/[^0-9]/g, '')}`);

const phone = (data, col) => {
  const headers = data[0];
  const idx = data[0].indexOf(col);

  if (idx > -1) {
    headers.splice(idx + 1, 0, 'TELEPHONENO(+254)');
    const num = data.map((item, i) => {
      if (i === 0) {
        return item;
      }
      item.splice(idx + 1, 0, cleanName(phoneCheck(item[idx])));
      return item;
    });
    return num;
  }
  return data;
};

export default phone;
