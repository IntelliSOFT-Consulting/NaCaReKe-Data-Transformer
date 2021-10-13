/* eslint-disable eqeqeq */
const correctAddress = (data, title, address, replace) => {
  const headers = data[0];
  const index = headers.indexOf(title);
  const fixed = data.map((row, i) => {
    if (i === 0) return row;
    row.splice(index, 1, row[index] === address ? replace : address);
    return row;
  });
  return fixed;
};

export default correctAddress;
