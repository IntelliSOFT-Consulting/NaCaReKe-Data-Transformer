/* eslint-disable no-undef */
import transform from '../transform';
import { data } from '../../tableData';

describe('Phone numbers', () => {
  const resultPhone = transform(
    'TELEPHONENO',
    'TELEPHONENO(+254)',
    false,
    null,
    data,
  );
  it('Adds TELEPHONENO(+254) column', () => {
    expect(resultPhone[0]).toEqual(
      expect.arrayContaining(['TELEPHONENO(+254)']),
    );
  });

  it('Updates the value of phone number with country code +254', () => {
    expect(resultPhone[1]).toEqual(expect.arrayContaining(['+2547843434343']));
  });
});

describe('NOK', () => {
  const resultNOK = transform(
    'TELEPHONENUMBERNOK',
    'NOKNUMBER',
    true,
    null,
    data,
  );

  const nokName = transform('TELEPHONENUMBERNOK', 'NOKNAME', true, null, data);
  it('Adds NOKNUMBER column', () => {
    expect(resultNOK[0]).toEqual(expect.arrayContaining(['NOKNUMBER']));
  });

  it('Updates the value of NOK phone number with country code +254', () => {
    expect(resultNOK[1]).toEqual(expect.arrayContaining(['+25473223928382']));
  });

  it('Adds NOKNAME column', () => {
    expect(nokName[0]).toEqual(expect.arrayContaining(['NOKNAME']));
  });

  it('Updates the value of NOK name', () => {
    expect(nokName[1]).toEqual(expect.arrayContaining(['Michael']));
  });
});

describe('Address', () => {
  const county = transform('ADDR (cat)', 'ADDR (County)', true, null, data);
  const subcounty = transform(
    'ADDR (desc)',
    'ADDR (Sub County)',
    true,
    null,
    data,
  );

  it('Adds ADDR (County) column', () => {
    expect(county[0]).toEqual(expect.arrayContaining(['ADDR (County)']));
  });

  it('Updates the value of county correctly', () => {
    expect(county[1]).toEqual(expect.arrayContaining(['Nairobi County']));
  });

  it('Adds ADDR (Sub County) column', () => {
    expect(subcounty[0]).toEqual(expect.arrayContaining(['ADDR (Sub County)']));
  });

  it('Updates the value of subcounty correctly', () => {
    expect(subcounty[1]).toEqual(
      expect.arrayContaining(['Westlands Sub County']),
    );
  });
});

describe('Radiotherapy', () => {
  const resultRadiotherapy = transform(
    'RADIOTREAT (desc)',
    'RADIOTREAT (true)',
    false,
    'yes',
    data,
  );

  it('Adds RADIOTREAT (true) column', () => {
    expect(resultRadiotherapy[0]).toEqual(
      expect.arrayContaining(['RADIOTREAT (true)']),
    );
  });

  it('Updates the value of radiotherapy correctly', () => {
    expect(resultRadiotherapy[1][89]).toEqual(false);
  });
});

describe('Chemotherapy', () => {
  const resultChemotherapy = transform(
    'CHEMOTREAT (desc)',
    'CHEMOTREAT (true)',
    false,
    'yes',
    data,
  );

  it('Adds CHEMOTREAT (true) column', () => {
    expect(resultChemotherapy[0]).toEqual(
      expect.arrayContaining(['CHEMOTREAT (true)']),
    );
  });

  it('Updates the value of chemotherapy correctly', () => {
    expect(resultChemotherapy[1][77]).toEqual(true);
  });
});

describe('Hormone Therapy', () => {
  const resultHormone = transform(
    'HORMONETREATMENT (desc)',
    'HORMONETREATMENT (true)',
    false,
    'yes',
    data,
  );

  it('Adds HORMONETREATMENT (true) column', () => {
    expect(resultHormone[0]).toEqual(
      expect.arrayContaining(['HORMONETREATMENT (true)']),
    );
  });

  it('Updates the value of hormone therapy correctly', () => {
    expect(resultHormone[1][85]).toEqual(false);
  });
});

describe('Immunotherapy', () => {
  const resultImmunotherapy = transform(
    'IMMUNOTREAT (desc)',
    'IMMUNOTREAT (true)',
    false,
    'yes',
    data,
  );

  it('Adds IMMUNOTREAT (true) column', () => {
    expect(resultImmunotherapy[0]).toEqual(
      expect.arrayContaining(['IMMUNOTREAT (true)']),
    );
  });

  it('Updates the value of immunotherapy correctly', () => {
    expect(resultImmunotherapy[1][81]).toEqual(false);
  });
});
