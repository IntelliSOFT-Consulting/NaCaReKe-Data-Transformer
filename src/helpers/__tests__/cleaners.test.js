/* eslint-disable no-undef */
import { cleanAddr, cleanAddrChars, capitalize } from '../cleaners';

const testAddr = [['ADDR(desc)'], ['nairobi.']];
const testCleanAddr = [['ADDR(desc)'], ['Kisumu']];
const testWhiteSpace = [['ADDR(desc)'], ['Eldoret ']];

describe('Capitalize', () => {
  it('should capitalize every first letter of a string', () => {
    expect(capitalize('hello nci')).toBe('Hello Nci');
  });

  it('should not change the string if it is already capitalized', () => {
    expect(capitalize('Hello')).toBe('Hello');
  });

  it('should not change the string if it is empty', () => {
    expect(capitalize('')).toBe('');
  });
});

describe('Clean Addr', () => {
  it('should capitalize & remove all non-alphanumeric characters', () => {
    expect(cleanAddr(testAddr, 'ADDR(desc)')).toEqual([
      ['ADDR(desc)'],
      ['Nairobi'],
    ]);
  });

  it('should not change the string if it is already clean', () => {
    expect(cleanAddr(testCleanAddr, 'ADDR(desc)')).toEqual(testCleanAddr);
  });

  it('should remove whitespaces', () => {
    expect(cleanAddr(testWhiteSpace, 'ADDR(desc)')).toEqual([
      ['ADDR(desc)'],
      ['Eldoret'],
    ]);
  });
});

describe('Clean Addr Chars', () => {
  const addresses = [
    ['Kisumu Unknown', 'Kisumu'],
    ['Nairobi Sub county', 'Nairobi'],
    ['Eldoret County', 'Eldoret'],
    ['invalid category', ''],
    ['Invalid Code', ''],
    ['Eldoret UNKNOWN', 'Eldoret'],
  ];

  test.each(addresses)(
    'should remove all unwanted characters',
    (addr, expected) => {
      expect(cleanAddrChars(addr)).toEqual(expected);
    },
  );

  it('should not change the string if it is already clean', () => {
    expect(cleanAddrChars("Murang'a")).toEqual('Muranga');
  });

  it('should remove whitespaces', () => {
    expect(cleanAddrChars('Westlands. ')).toEqual('Westlands');
  });
});
