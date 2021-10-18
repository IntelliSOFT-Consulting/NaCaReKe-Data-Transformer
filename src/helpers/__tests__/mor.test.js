/* eslint-disable no-undef */
import mor from '../mor';

describe('mor', () => {
  it('should return matching NCI Code', () => {
    const result = {
      mapped: [
        ['MOR (desc)', 'MOR(Matching NCI Codes)'],
        ['Squamous cell carcinoma, NOS', 'M8070/3'],
      ],
      err: [],
    };
    expect(mor([['MOR (desc)'], ['Squamous cell carcinoma, NOS']])).toEqual(result);
  });

  it('should log error if NCI code not matched', () => {
    const result = {
      mapped: [
        ['MOR (desc)', 'MOR(Matching NCI Codes)'],
        ['fail', ''],
      ],
      err: ['fail'],
    };
    expect(mor([['MOR (desc)'], ['fail']])).toEqual(result);
  });
});
