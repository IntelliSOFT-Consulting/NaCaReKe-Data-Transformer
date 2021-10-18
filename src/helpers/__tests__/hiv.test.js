/* eslint-disable no-undef */
import hiv from '../hiv';

describe('HIV (desc)', () => {
  it('Should return true if yes', () => {
    const result = [
      ['HIV (desc)', 'HIV(true)'],
      ['Yes', true],
    ];
    expect(hiv([['HIV (desc)'], ['Yes']], 'HIV (desc)')).toEqual(result);
  });

  it('Should return true if positive', () => {
    const result = [
      ['HIV (desc)', 'HIV(true)'],
      ['HIV Positive', true],
    ];
    expect(hiv([['HIV (desc)'], ['HIV Positive']], 'HIV (desc)')).toEqual(result);
  });

  it('Should return false if negative', () => {
    const result = [
      ['HIV (desc)', 'HIV(true)'],
      ['HIV Negative', false],
    ];
    expect(hiv([['HIV (desc)'], ['HIV Negative']], 'HIV (desc)')).toEqual(result);
  });

  it('Should return false if No', () => {
    const result = [
      ['HIV (desc)', 'HIV(true)'],
      ['No', false],
    ];
    expect(hiv([['HIV (desc)'], ['No']], 'HIV (desc)')).toEqual(result);
  });
});
