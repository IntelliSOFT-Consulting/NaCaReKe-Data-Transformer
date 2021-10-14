/* eslint-disable no-undef */
import {
  dataCleaner,
  cleanAddrChars,
  capitalize,
  phoneCheck,
  checkFields,
} from '../cleaners';

const testAddr = [['ADDR (desc)'], ['nairobi.']];
const testCleanAddr = [['ADDR (desc)'], ['Kisumu']];
const testWhiteSpace = [['ADDR (desc)'], ['Eldoret ']];

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
  it('should capitalize & remove all non-alphanumeric characters', async () => {
    const result = await dataCleaner(testAddr);
    expect(result).toEqual([['ADDR (desc)'], ['Nairobi']]);
  });

  it('should not change the string if it is already clean', async () => {
    const result = await dataCleaner(testCleanAddr);
    expect(result).toEqual(testCleanAddr);
  });

  it('should remove whitespaces', async () => {
    const result = await dataCleaner(testWhiteSpace);
    expect(result).toEqual([
      ['ADDR (desc)'],
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

describe('Phone Check', () => {
  const phones = [
    ['078556443', '078556443'],
    ['none', ''],
    ['NONE', ''],
  ];
  test.each(phones)('should format the phone number', (phone, expected) => {
    expect(phoneCheck(phone)).toEqual(expected);
  });
});

describe('Check Fields', () => {
  const datas = [
    ['INCID', 'ADDR (desc)'],
    ['#N/A', 'Kisumu'],
    ['Unknown', 'n/a'],
    ['invalid code', 'Naivasha unknown'],
    ['N/A', 'Westlands Sub County'],
  ];
  const output = 'INCID,ADDR (desc),,Kisumu,,,,Naivasha ,,Westlands';
  expect(checkFields(datas)).toEqual(output);
});
