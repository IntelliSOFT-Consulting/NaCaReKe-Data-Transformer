/* eslint-disable no-undef */
import checkWard from '../ward';

describe('checkWard', () => {
  it('should validate the county and format correctly', () => {
    const result = {
      addr: [
        ['OTHERADDRESS', 'ADDR (Ward)'],
        ['Nairobi', 'Nairobi Ward'],
      ],
      err: [],
    };

    expect(checkWard([['OTHERADDRESS'], ['Nairobi']], 'OTHERADDRESS')).toEqual(
      result,
    );
  });

  it('Should remove unwanted characters', () => {
    const result = {
      addr: [
        ['OTHERADDRESS', 'ADDR (Ward)'],
        ['Nairobi UNKNOWN', 'Nairobi Ward'],
      ],
      err: [],
    };
    expect(checkWard([['OTHERADDRESS'], ['Nairobi UNKNOWN']], 'OTHERADDRESS')).toEqual(
      result,
    );
  });
});
