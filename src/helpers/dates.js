/* eslint-disable eqeqeq */
const isYear = (date) => date.length === 4;
const isUnknown = (date) => (date == '99' ? '01' : date);
const isDashed = (date) => date && date.includes('-');
const isDateFormatted = (date) => (date && date.includes('-')) || (date && date.includes('/'));
const splitAt = (index) => (x) => [x.slice(0, index), x.slice(index)];
const firstElement = (arr) => (arr.length ? arr[0] : undefined);

// Handles numeric dates
const compactDate = (date) => {
  const firstFour = date.substr(0, 4);
  const lastFour = date.substr(date.length - 4);
  const thisYear = new Date().getFullYear();
  const year = Number(firstFour) > 1920 && Number(firstFour) <= thisYear ? firstFour : lastFour;

  const dates = year === firstFour ? lastFour : firstFour;
  const datesArr = splitAt(2)(dates).map((item) => item.replace('99', '01'));

  const formatedDate = firstElement(datesArr) > 12 ? datesArr.reverse() : datesArr;

  const birthYear = year.replace('9999', '1970');

  const dateProvided = dates ? formatedDate.join('-') : '01-01';

  return `${birthYear}-${dateProvided}`;
};

// Handles formatted with slashes or dashes
const slashedDate = (date) => {
  const splitDate = isDashed(date) ? date.split('-') : date.split('/');

  const dateArr = splitDate.map((item) => (isYear(item) ? item : isUnknown(item)));

  const year = dateArr.filter((item) => isYear(item)).join('');
  const dates = dateArr.filter((item) => !isYear(item));
  const formatedDate = firstElement(dates) > 12 ? dates.reverse() : dates;

  return `${year}-${formatedDate.join('-')}`;
};

// Format only birth dates
const birthDates = (date, age = null) => {
  const dateString = date?.toString();

  // Calculate birth year and sets 1970 as default if missing
  const year = age ? new Date().getFullYear() - Number(age) : '1970';
  const isDateCorrect = (!dateString || dateString.length < 8) ? `${year}-01-01` : dateString;

  return isDateFormatted(isDateCorrect) ? slashedDate(isDateCorrect) : compactDate(isDateCorrect);
};

// Format dates other than birth dates
const formatDates = (date) => {
  const dateString = date?.toString();
  if (!dateString) return '';
  return isDateFormatted(dateString) ? slashedDate(dateString)
    : compactDate(dateString);
};

// clean each date field
const cleanDate = (col, datas) => {
  const headers = datas[0];
  const idx = headers.indexOf(col);
  const age = headers.indexOf('AGE');
  if (idx === -1) return datas;

  headers.splice(idx, 1, col);

  const final = datas.map((row, i) => {
    // First element is the header: skip it
    if (i === 0) {
      return row;
    }

    // Birth dates are formatted here
    if (col === 'BIRTHD') {
      row.splice(idx, 1, birthDates(row[idx], row[age]));
    } else {
      row.splice(idx, 1, formatDates(row[idx]));
    }

    return row;
  });
  return final;
};

export default cleanDate;
