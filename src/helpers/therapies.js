/* eslint-disable eqeqeq */
const therapies = (data, col, coded = false, treat = false) => {
  const headers = data[0];
  if (treat) {
    let therapy = '';
    if (col.toLowerCase().includes('radio')) {
      therapy = 'RADIOTREAT (true)';
    }
    if (col.toLowerCase().includes('chemo')) {
      therapy = 'CHEMOTREAT (true)';
    }
    if (col.toLowerCase().includes('hormo')) {
      therapy = 'HORMONETREATMENT (true)';
    }
    if (col.toLowerCase().includes('sur')) {
      therapy = 'SURGERY (true)';
    }
    if (col.toLowerCase().includes('imm')) {
      therapy = 'IMMUNOTREAT (true)';
    }
    if (col.toLowerCase().includes('othert')) {
      therapy = 'OTHERTREATMENT(TRUE)';
    }
    if (col.toLowerCase().includes('otherc') || col.toLowerCase().includes('diseasec')) {
      therapy = 'OTHERCONCURRENTILLNESS(true)';
    }
    const idx = data[0].indexOf(col);

    if (idx >= 0) {
      headers.splice(idx + 1, 0, therapy);
      const matched = data.map((item, i) => {
        if (i === 0) return item;
        const positive = !coded
          ? item[idx]?.toString()?.toLowerCase()?.includes('yes')
          : item[idx] == '2';
        item.splice(idx + 1, 0, positive);
        return item;
      });
      return matched;
    }
    return data;
  }
  return data;
};

export default therapies;
