/* eslint-disable no-undef */
import subCounties from '../SubCounty';

describe('subCounties', () => {
  it('should validate the county and format correctly', () => {
    const result = {
      addr: [
        ['ADDR (desc)', 'ADDR (Sub County)'],
        ['Westlands', 'Westlands Sub County'],
      ],
      err: [],
    };

    expect(subCounties([['ADDR (desc)'], ['Westlands']], 'ADDR (desc)')).toEqual(
      result,
    );
  });

  it('Should remove unwanted characters', () => {
    const result = {
      addr: [
        ['ADDR (desc)', 'ADDR (Sub County)'],
        ['Westlands UNKNOWN', 'Westlands Sub County'],
      ],
      err: [],
    };
    expect(subCounties([['ADDR (desc)'], ['Westlands UNKNOWN']], 'ADDR (desc)')).toEqual(
      result,
    );
  });

  it('Should add unmapped counties to errors', () => {
    const result = {
      addr: [
        ['ADDR (desc)', 'ADDR (Sub County)'],
        ['Burundi County', 'Burundi Sub County'],
      ],
      err: ['Burundi Sub County'],
    };
    expect(subCounties([['ADDR (desc)'], ['Burundi County']], 'ADDR (desc)')).toEqual(
      result,
    );
  });
});
