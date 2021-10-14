/* eslint-disable no-undef */
import top from '../top';

describe('top', () => {
  it('should return matching NCI Code', () => {
    const result = {
      mapped: [
        ['TOP', 'TOP(Matching NCI Codes)'],
        ['159', 'C15.9'],
      ],
      err: [],
    };
    expect(top([['TOP'], ['159']])).toEqual(result);
  });

  it('should log error if NCI code not matched', () => {
    const result = {
      mapped: [
        ['TOP', 'TOP(Matching NCI Codes)'],
        ['56565', ''],
      ],
      err: ['56565'],
    };
    expect(top([['TOP'], ['56565']])).toEqual(result);
  });
});
