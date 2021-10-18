import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { Table } from 'antd';

export default function DataTable({ data, cols }) {
  const [rowData, setRowData] = useState(null);
  const [colData, setColData] = useState(null);

  const columns = (colm) => colm
    && colm.map((item) => ({
      title: item.name,
      dataIndex: item.key,
      key: item.key,
    }));

  const rowDatas = (datas) => datas.map((r, i) => {
    const obj = {};
    cols.forEach((c) => {
      obj[c.key] = r[c.key] || typeof r[c.key] === 'boolean'
        ? r[c.key].toString()
        : r[c.key];
      obj.key = i;
    });
    return obj;
  });

  useEffect(() => {
    if (cols) {
      setColData(columns(cols));
    }
    if (data.length > 0) {
      setRowData(rowDatas(data));
    }
  }, [data, cols]);

  return (
    <div data-testid="table" className="full-width">
      <Table dataSource={rowData} columns={colData} />
    </div>
  );
}

DataTable.propTypes = {
  data: propTypes.arrayOf(propTypes.array).isRequired,
  cols: propTypes.arrayOf(propTypes.object).isRequired,
};
