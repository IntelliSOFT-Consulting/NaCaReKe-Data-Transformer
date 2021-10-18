/* eslint-disable no-undef */
import phone from '../phone';

describe('phone', () => {
  it('should return phone number starting with +254', () => {
    const result = [
      ['PHNUMBER', 'TELEPHONENO(+254)'],
      ['073823232', '+254073823232'],
    ];
    expect(phone([['PHNUMBER'], ['073823232']], 'PHNUMBER')).toEqual(result);
  });

  it('Should not format invalid or blank fields', () => {
    const result = [
      ['PHNUMBER', 'TELEPHONENO(+254)'],
      ['073823232', '+254073823232'],
      ['none', ''],
    ];
    expect(phone([['PHNUMBER'], ['073823232'], ['none']], 'PHNUMBER')).toEqual(
      result,
    );
  });
});
