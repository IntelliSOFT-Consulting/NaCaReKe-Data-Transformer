/* eslint-disable no-undef */
import dates from '../dates';

const immdate = {
  test: [['IMMDATE'], ['04171996']],
  result: [['IMMDATE'], ['1996-04-17']],
};

const incid = {
  test: [['INCID'], ['22/05/2003']],
  result: [['INCID'], ['2003-05-22']],
};

const birthd = {
  test: [['BIRTHD'], ['19300204']],
  result: [['BIRTHD'], ['1930-02-04']],
};

const birthdError = {
  test: [
    ['BIRTHD', 'AGE'],
    ['99990', 24],
  ],
  result: [
    ['BIRTHD', 'AGE'],
    ['1997-01-01', 24],
  ],
};

const raddate = {
  test: [['RADDATE'], ['99999999']],
  result: [['RADDATE'], ['1970-01-01']],
};

describe('dates', () => {
  it('should format mmddyy to yyyy-mm-dd', () => {
    expect(dates('IMMDATE', immdate.test)).toEqual(immdate.result);
  });

  it('Should format date from dd/mm/yyyy to yyyy-mm-dd', () => {
    expect(dates('INCID', incid.test)).toEqual(incid.result);
  });

  it('Formats birthdates if valid', () => {
    expect(dates('BIRTHD', birthd.test)).toEqual(birthd.result);
  });

  it('Should calculate birthd if birthd is invalid', () => {
    expect(dates('BIRTHD', birthdError.test)).toEqual(birthdError.result);
  });

  it('Should defaul unknown dates to 1970-01-01', () => {
    expect(dates('RADDATE', raddate.test)).toEqual(raddate.result);
  });
});
