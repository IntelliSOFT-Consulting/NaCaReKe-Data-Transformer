/* eslint-disable no-undef */
import addMatch from '../MatchNCI';
import codes from '../../NCIcodes';

const mor = {
  test: [['MOR (desc)'], ['Tumor cells, malignant']],
  result: [
    ['MOR(Matching NCI Codes)', 'MOR (desc)'],
    ['M8001/3', 'Tumor cells, malignant'],
  ],
};

const top = {
  test: [['TOP'], ['179']],
  result: [
    ['TOP', 'TOP(Matching NCI Codes)'],
    ['179', 'C17.9'],
  ],
};

it('adds a MOR match to the list', () => {
  const res = addMatch('MOR', 'MOR(Matching NCI Codes)', mor.test, codes);
  expect(res).toEqual(mor.result);
});

it('adds TOP match and column to the list', () => {
  const res = addMatch('TOP', 'TOP(Matching NCI Codes)', top.test, codes);
  expect(res).toEqual(top.result);
});
