/* eslint-disable no-undef */
import checkCounty from '../county';

describe('checkCounty', () => {
  it('should validate the county and format correctly', () => {
    const result = {
      addr: [
        ['ADDR (cat)', 'ADDR (County)'],
        ['Nairobi', 'Nairobi County'],
      ],
      err: [],
    };

    expect(checkCounty([['ADDR (cat)'], ['Nairobi']], 'ADDR (cat)')).toEqual(
      result,
    );
  });

  it('Should remove unwanted characters', () => {
    const result = {
      addr: [
        ['ADDR (cat)', 'ADDR (County)'],
        ['Nairobi UNKNOWN', 'Nairobi County'],
      ],
      err: [],
    };
    expect(checkCounty([['ADDR (cat)'], ['Nairobi UNKNOWN']], 'ADDR (cat)')).toEqual(
      result,
    );
  });

  it('Should add unmapped counties to errors', () => {
    const result = {
      addr: [
        ['ADDR (cat)', 'ADDR (County)'],
        ['Kanairo County', 'Kanairo County'],
      ],
      err: ['Kanairo County'],
    };
    expect(checkCounty([['ADDR (cat)'], ['Kanairo County']], 'ADDR (cat)')).toEqual(
      result,
    );
  });
});
