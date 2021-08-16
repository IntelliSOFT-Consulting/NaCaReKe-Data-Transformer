import React from 'react';

export default function Table({ data, cols }) {
  return (
    <div className='table-responsive'>
      <table className='table table-striped'>
        <thead>
          <tr>
            {cols.map(c => (
              <th key={c.key}>{c.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((r, i) => (
            <tr key={i}>
              {cols.map(c => (
                <td key={c.key}>
                  {r[c.key] || typeof r[c.key] == 'boolean'
                    ? r[c.key].toString()
                    : r[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
