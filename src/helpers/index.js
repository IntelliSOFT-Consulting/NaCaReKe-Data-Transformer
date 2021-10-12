/* eslint-disable consistent-return */
import county from './county';
import checkSubCounty from './SubCounty';
import checkWard from './ward';
import cleanDate from './dates';
import cleanPhone from './phone';
import mor from './mor';
import nok from './nok';
import top from './top';
import hiv from './hiv';
import therapies from './therapies';

const addresses = (data, check) => {
  if (check.includes('desc')) {
    return checkSubCounty(data, check);
  }
  if (check.includes('cat')) {
    return county(data, check);
  }
  if (check.includes('other')) {
    return checkWard(data, check);
  }
  return data;
};

export {
  addresses,
  cleanDate,
  cleanPhone,
  mor,
  nok,
  top,
  hiv,
  therapies,
};
