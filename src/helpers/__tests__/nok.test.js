/* eslint-disable no-undef */
import nok from '../nok';

describe('NOKNUMBER', () => {
  it('should return phone number starting with +254', () => {
    const result = [
      ['PHONENOK', 'NOKNAME', 'NOKNUMBER'],
      ['073823232', '', '+254073823232'],
    ];
    expect(nok([['PHONENOK'], ['073823232']], 'PHONENOK')).toEqual(result);
  });

  it('Should not format invalid or blank fields', () => {
    const result = [
      ['PHONENOK', 'NOKNAME', 'NOKNUMBER'],
      ['073823232 Harry', 'Harry', '+254073823232'],
      ['none', '', ''],
    ];
    expect(nok([['PHONENOK'], ['073823232 Harry'], ['none']], 'PHONENOK')).toEqual(
      result,
    );
  });
});
