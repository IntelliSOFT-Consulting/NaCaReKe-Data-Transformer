/* eslint-disable eqeqeq */
/* eslint-disable no-extend-native */
/* eslint-disable func-names */
const isYear = (date) => date.length === 4;
const isUnknown = (date) => (date == '99' ? '01' : date);
const isDashed = (date) => date.includes('-');
const splitAt = (index) => (x) => [x.slice(0, index), x.slice(index)];

Array.prototype.lastElement = function () {
  return this.length ? this[this.length - 1] : undefined;
};

// handles dates without formatting, withoutslashes or dashes
const compactDate = (date, age = null) => {
  const firstFour = date.substr(0, 4);
  const lastFour = date.substr(date.length - 4);
  const thisYear = new Date().getFullYear();
  const year = Number(firstFour) > 1920 && Number(firstFour) <= thisYear
    ? firstFour
    : lastFour;

  const dates = year === firstFour ? lastFour : firstFour;
  const datesArr = splitAt(2)(dates).map((item) => item.replace('99', '01'));

  const formatedDate = datesArr.lastElement > 12 ? datesArr.reverse() : datesArr;

  const birthYear = age ? thisYear - Number(age) : year.replace('9999', '1970');

  return `${birthYear}-${formatedDate.join('-')}`;
};

// handles dates with slashes or dashes
const slashedDate = (date) => {
  const splitDate = isDashed(date) ? date.split('-') : date.split('/');

  const dateArr = splitDate.map((item) => (isYear(item) ? item : isUnknown(item)));

  const year = dateArr.filter((item) => isYear(item)).join('');
  const dates = dateArr.filter((item) => !isYear(item));
  const formatedDate = dates.lastElement > 12 ? dates.reverse() : dates;

  return `${year}-${formatedDate.join('-')}`;
};

// Format date to YYYY-MM-DD
const formatDates = (date, age = null) => {
  if (!date && !age) return '1970-01-01';
  const dateString = date.toString();
  if (isDashed(dateString) || dateString.includes('/')) {
    return slashedDate(dateString);
  }
  return compactDate(dateString, age);
};

// clean each date field
const cleanDate = (col, datas) => {
  const headers = datas[0];
  const idx = headers.indexOf(col);
  const age = headers.indexOf('AGE');
  if (idx === -1) return datas;

  headers.splice(idx, 1, col);

  const final = datas.map((row, i) => {
    if (i === 0) {
      return row;
    }

    const passAge = !row[idx] && col === 'BIRTHD' ? row[age] : null;

    const date = row[idx]?.toString().length > 7 ? formatDates(row[idx], passAge) : '1970-01-01';

    row.splice(idx, 1, date);

    return row;
  });
  return final;
};

export default cleanDate;
