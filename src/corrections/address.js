/* eslint-disable eqeqeq */
const correctAddress = (data, address, replace) => {
  const fixed = data.map((row, i) => {
    if (i === 0) return row;
    return row.map((item) => (item ? item.toString().replace(address, replace)
      : item));
  });
  return fixed;
};

export default correctAddress;
