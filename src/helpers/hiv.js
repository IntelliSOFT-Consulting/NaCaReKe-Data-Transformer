/* eslint-disable eqeqeq */
const hiv = (data, col, coded = false) => {
  const header = data[0];
  const idx = data[0].indexOf(col);
  header.splice(idx + 1, 0, 'HIV(true)');
  if (idx >= 0) {
    const matched = data.map((item, i) => {
      if (i === 0) return item;
      const positive = !coded
        ? item[idx]?.toString()?.toLowerCase()?.includes('positive')
          || item[idx]?.toString()?.toLowerCase()?.includes('yes')
        : item[idx] == '2';
      item.splice(idx + 1, 0, positive);
      return item;
    });
    return matched;
  }
  return data;
};

export default hiv;
