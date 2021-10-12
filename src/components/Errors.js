/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import { Table, Tag } from 'antd';

export default function Errors({ errors }) {
  const columns = [
    {
      title: 'Sub Counties',
      key: 'addr',
      dataIndex: 'addr',
      render: (tags) => (
        tags?.map((tag) => (
          <Tag color="volcano" key={tag}>
            {tag}
          </Tag>
        ))
      ),
    },
    {
      title: 'TOP',
      dataIndex: 'top',
      key: 'top',
      render: (tops) => (
        <p>{tops?.join(', ')}</p>
      ),
    },
    {
      title: 'MOR',
      dataIndex: 'mor',
      key: 'mor',
      render: (mors) => (
        <p>{mors?.join(', ')}</p>
      ),
    },

  ];

  console.log(errors);

  return (
    <div>
      <a
        href={`data:text/json;charset=utf-8,${encodeURIComponent(
          JSON.stringify(errors),
        )}`}
        download="errors.json"
      >
        Download Json
      </a>
      <Table columns={columns} dataSource={errors} />
    </div>
  );
}

Errors.propTypes = {
  errors: PropTypes.array.isRequired,
};
