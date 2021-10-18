/* eslint-disable import/no-mutable-exports */
let data = [
  [
    'RECS',
    'RECS (desc)',
    'CHEC',
    'CHEC (desc)',
    'AGE',
    'ADDR',
    'ADDR (cat)',
    'ADDR (desc)',
    'INCID',
    'TOP',
    'TOP (cat)',
    'TOP (desc)',
    'LTERALITY',
    'LTERALITY (desc)',
    'MOR',
    'MOR (desc)',
    'BEH',
    'BEH (desc)',
    'BAS',
    'BAS (desc)',
    'MPCODE',
    'MPSEQ',
    'MPTOT',
    'I10',
    'UPDATE',
    'ICCC',
    'OBSOLETEFLAGTUMOURTABLE',
    'TUMOURID',
    'PATIENTIDTUMOURTABLE',
    'PATIENTRECORDIDTUMOURTABLE',
    'TUMOURUPDATEDBY',
    'TUMOURUNDUPLICATIONSTATUS',
    'LABNUMBER',
    'LABREPORTAVAILABLEPTFILE',
    'LABREPORTAVAILABLEPTFILE (desc)',
    'CD4COUNT',
    'STATUSINDICATEDONCLINICALNOTES',
    'STATUSINDICATEDONCLINICALNOTES (desc)',
    'SPECIFICALLYNEGATIVE',
    'SPECIFICALLYNEGATIVE (desc)',
    'SPECIFICALLYPOSITIVE',
    'SPECIFICALLYPOSITIVE (desc)',
    'OTHERCONCURRENTILLNESS',
    'OTHERADDRESS',
    'GRADE',
    'GRADE (desc)',
    'STAGE',
    'STAGE (desc)',
    'REGNO',
    'PERS',
    'PERS (desc)',
    'FIRSTN',
    'MIDDLNAME',
    'FAMN',
    'SEX',
    'SEX (desc)',
    'BIRTHD',
    'TRIB',
    'TRIB (desc)',
    'OCCU',
    'OCCU (desc)',
    'DLC',
    'STAT',
    'STAT (desc)',
    'MIDN',
    'OBSOLETEFLAGPATIENTTABLE',
    'PATIENTRECORDID',
    'PATIENTUPDATEDBY',
    'PATIENTUPDATEDATE',
    'PATIENTRECORDSTATUS',
    'PATIENTCHECKSTATUS',
    'SURTCT',
    'SURTCT (desc)',
    'SURGERYDATE',
    'CHEMOTREAT',
    'CHEMOTREAT (desc)',
    'CHEMOTREATMENTDATE',
    'IMMUNOTREAT',
    'IMMUNOTREAT (desc)',
    'IMMUNOTREATMENTDATE',
    'HORMONETREATMENT',
    'HORMONETREATMENT (desc)',
    'HORMONETHERAPY',
    'RADIOTREAT',
    'RADIOTREAT (desc)',
    'RADIOTREATMENTDATE',
    'OTHERTREATMENT',
    'OTHERDATE',
    'HOSPITALNUMBER',
    'DEATHCAUSE',
    'REMARKSIFANY',
    'IDENTIFICATIONNO',
    'MARITALSTATUS',
    'MARITALSTATUS (desc)',
    'TELEPHONENO',
    'TELEPHONENUMBERNOK',
    'RELIGION',
    'RELIGION (desc)',
    'EDUCATIONLEVEL',
    'EDUCATIONLEVEL (desc)',
    'SMOKINGSTATUS',
    'SMOKINGSTATUS (desc)',
    'DRINKINGSTATUS',
    'DRINKINGSTATUS (desc)',
  ],
  [
    1,
    'Confirmed',
    1,
    'Done: OK',
    1,
    101,
    'Nairobi',
    'Westlands',
    2018010,
    250,
    'PANCREAS',
    'Head of pancreas',
    9,
    'Unknown',
    8140,
    'Adenocarcinoma, NOS',
    3,
    'Malignant',
    7,
    'Histology of primary',
    null,
    0,
    1,
    'C250',
    '25/11/2019',
    '11f',
    0,
    'KH0150890101',
    'KH015089',
    'KB43743847',
    'carolyne',
    null,
    null,
    9,
    'Unknown',
    null,
    9,
    'Unknown',
    9,
    'Unknown',
    9,
    'Unknown',
    null,
    null,
    9,
    'Unknown',
    9,
    'Unknown',
    'KH015089',
    null,
    'Invalid code.',
    'John',
    'Doe',
    'Jane',
    1,
    'Male',
    '99/99/2016',
    2,
    'Kangemi',
    8,
    'Child',
    '30/11/2018',
    1,
    'Alive',
    'John',
    null,
    'KB43743847',
    'Jean',
    '25/11/2018',
    0,
    null,
    9,
    'Unknown',
    null,
    2,
    'Yes',
    null,
    1,
    'Unknown',
    null,
    9,
    'Unknown',
    null,
    9,
    'Unknown',
    null,
    null,
    null,
    3293232,
    null,
    null,
    null,
    5,
    'Child',
    '7843434343',
    '73223928382 Michael',
    1,
    'Muslim',
    7,
    'Child',
    9,
    'Unknown',
    9,
    'Unknown',
  ],
];

const positions = {
  lefts: [
    'CHEMOTREAT (true)',
    'IMMUNOTREAT (true)',
    'HORMONETREATMENT (true)',
    'RADIOTREAT (true)',
    'SURGERY (true)',
    'HIV(true)',
    'SPECIFICALLYPOSITIVE (true)',
    'OTHERTREATMENT(TRUE)',
    'BAS (true)',
    'TELEPHONENO(+254)',
    'OTHERCONCURRENTILLNESS(true)',
  ],
  rights: [
    'MOR(Matching NCI Codes)',
    'TOP(Matching NCI Codes)',
    'ADDR (Sub County)',
    'WARD',
    'NOKNUMBER',
    'NOKNAME',
    'ADDR (County)',
  ],
  yes: [
    'CHEMOTREAT (true)',
    'IMMUNOTREAT (true)',
    'HORMONETREATMENT (true)',
    'RADIOTREAT (true)',
    'SURGERY (true)',
  ],
};

let visible = true;

const setVisible = () => {
  visible = !visible;
};

const setData = (datas) => {
  data = datas;
};

export { setData, data, visible, setVisible, positions };
