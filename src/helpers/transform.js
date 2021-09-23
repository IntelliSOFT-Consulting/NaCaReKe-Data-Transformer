const isInvalid = (input) => input
&& !/UNKNOWN|Unknown|NONE|N\/A|Invalid code|Invalid category.+/g.test(input);

const replaceAddr = (addr, txt = '') => `${addr
  .toString()
  .replace(/UNKNOWN|Unknown|County| Sub County|Invalid code|[.,]+/g, '')
  .trim()} ${txt}`;

// Insert columns and update the data accordingly
const insertCol = (title, col, right = false, yes = null, data) => {
  const headers = data[0];
  if (!headers.includes(col)) {
    const checked = headers.indexOf(title);

    headers.splice(
      right ? headers.indexOf(title) + 1 : headers.indexOf(title),
      0,
      col,
    );

    const filledCols = data.map((row, i) => {
      if (i === 0) {
        return row;
      } if (
        title.toString().toLowerCase().includes('hiv')
          || title.toString().toUpperCase().includes('SPECIFICALLYPOSITIVE')
      ) {
        row.splice(
          right ? checked + 1 : checked,
          0,

          !!(row[checked]
              && (row[checked].toString().toLowerCase().includes('positive')
                || row[checked].toString().toLowerCase() === 'yes')),
        );
      } else if (col.includes('TELEPHONENO(+254)')) {
        row.splice(
          checked,
          0,
          row[checked]
              && !/UNKNOWN|Unknown|County|NONE|N\/A|Invalid code+/g.test(
                row[checked],
              )
            ? `+254${row[checked].toString().replace(/[^0-9]/g, '')}`
            : '',
        );
      } else if (col.includes('NOKNAME')) {
        row.splice(
          checked + 1,
          0,
          row[checked]
              && !/UNKNOWN|Unknown|NONE|N\/A|Invalid code+/g.test(row[checked])
            ? `${row[checked]
              .toString()
              .replace(/[^A-Za-z ]/g, '')
              .trim()}`
            : '',
        );
      } else if (col.includes('NOKNUMBER')) {
        row.splice(
          checked + 1,
          0,
          isInvalid(row[checked])
            ? `+254${row[checked].toString().replace(/[^0-9]/g, '')}`
            : '',
        );
      } else if (col.includes('ADDR (County)')) {
        row.splice(
          checked + 1,
          0,
          isInvalid(row[checked]) ? replaceAddr(row[checked], 'County') : '',
        );
      } else if (col.includes('ADDR (Sub County)')) {
        row.splice(
          checked + 1,
          0,
          isInvalid(row[checked])
            ? replaceAddr(row[checked], 'Sub County')
            : '',
        );
      } else if (col.includes('WARD')) {
        row.splice(
          checked + 1,
          0,
          isInvalid(row[checked]) ? replaceAddr(row[checked], 'Ward') : '',
        );
      } else if (yes && !title.toString().toLowerCase().includes('hiv')) {
        row.splice(
          right ? checked + 1 : checked,
          0,
          right
            ? !!(row[checked] && row[checked].toString().toLowerCase() === 'yes')
            : !!(row[checked] && row[checked].toString().toLowerCase() === 'yes'),
        );
      } else {
        row.splice(
          right ? checked + 1 : checked,
          0,
          right ? (!!row[checked]) : !!row[checked],
        );
      }

      return row;
    });

    // setData(filledCols);

    // setVisible(false);
    return filledCols;
  }
  //   message.error(`Column ${col} already exists`);
  return false;
};

export default insertCol;
