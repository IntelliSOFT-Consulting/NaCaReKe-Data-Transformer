/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import { Table, Tag, Popconfirm } from 'antd';
import { closestMatch } from 'closest-match';
import correctAddress from '../corrections/address';
import subCounties from '../data/scounties';

export default function Errors({ errors, setErrors, data, setData }) {
  const columns = [
    {
      title: 'Sub Counties',
      key: 'addr',
      dataIndex: 'addr',
      render: (tags) => (
        tags?.map((tag) => {
          const alt = closestMatch(tag, subCounties);
          const handleCorrect = async (sc, replace) => {
            const newData = await correctAddress(data, sc, replace);
            await setData(newData);
            setErrors([{ ...errors[0], addr: errors[0].addr.filter((t) => t !== tag) }]);
          };

          return (
            <>
              {alt ? (
                <Popconfirm
                  title={(
                    <p>
                      Replace with
                      {' '}
                      <strong>{alt}</strong>
                      ?
                    </p>
)}
                  onConfirm={() => handleCorrect(tag, alt)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Tag color="gold" key={tag}>
                    {tag}
                  </Tag>
                </Popconfirm>
              ) : (
                <Tag color="volcano" key={tag}>
                  {tag}
                </Tag>
              )}
            </>
          );
        })
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

  return (
    <div>
      {errors && Object.keys(errors).length > 0 && (
      <a
        href={`data:text/json;charset=utf-8,${encodeURIComponent(
          JSON.stringify(errors),
        )}`}
        download="errors.json"
        className="err-container"
      >
        Download Json
      </a>
      )}
      <Table columns={columns} dataSource={errors} />
    </div>
  );
}

Errors.propTypes = {
  errors: PropTypes.array.isRequired,
  setErrors: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  setData: PropTypes.func.isRequired,
};
