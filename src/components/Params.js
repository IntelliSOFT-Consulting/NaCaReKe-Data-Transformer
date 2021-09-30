/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { message, Form, Button } from 'antd';
import { FileSyncOutlined } from '@ant-design/icons';
import ColumnModal from './ColModal';
import insertCol from '../helpers/transform';
import addMatch from '../helpers/MatchNCI';
import positions from '../data/positions';
import codes from '../NCIcodes';
import dateFields from '../data/dateFields';
import cleanDate from '../helpers/dates';

const Params = ({
  visible, setVisible, data, setData,
}) => {
  const [cols, setCols] = useState(data[0]);
  const [isParams, setIsParams] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const params = JSON.parse(localStorage.getItem('params'));
    if (params && data.length > 0) {
      setIsParams(true);
    }
  }, [data.length]);

  const formatTime = (datas) => {
    dateFields.forEach((field) => {
      setData(cleanDate(field, datas));
    });
  };

  const handleMatchNCI = (datas = []) => {
    const headers = datas[0];
    if (
      headers.includes('TOP(Matching NCI Codes)')
      || headers.includes('MOR(Matching NCI Codes)')
    ) return;
    const colms = ['TOP', 'MOR'];
    ['TOP(Matching NCI Codes)', 'MOR(Matching NCI Codes)'].forEach(
      (header, i) => {
        setData(addMatch(colms[i], header, datas, codes));
      },
    );
  };

  // Modal form submit
  const onFinish = async (values) => {
    await localStorage.setItem('params', JSON.stringify(values.params));
    await handleMatchNCI(data);
    await formatTime(data);
    await values.params.forEach((param) => {
      const transformed = insertCol(
        param.check,
        param.update[0],
        positions.rights.includes(param.update[0].trim()),
        positions.yes.includes(param.update[0].trim()),
        data,
      );
      transformed ? setData(transformed) : message.error('Column already exists');
    });

    await message.success('Operations applied successfully!');
    await form.resetFields();
    return setIsParams(true);
  };

  // Automatically processes the document from previous configurations
  const autoProcess = async () => {
    const params = JSON.parse(localStorage.getItem('params'));
    await handleMatchNCI(data);
    await formatTime(data);
    if (params) {
      await params.forEach((param) => {
        insertCol(
          param.check,
          param.update[0],
          positions.rights.includes(param.update[0].trim()),
          positions.yes.includes(param.update[0].trim()),
          data,
        );
      });
      await message.success('Operations applied successfully!');
    }
  };

  function handleChange(value) {
    if (value.length > 1) {
      // eslint-disable-next-line no-param-reassign
      value = [value[0]];
    }
  }

  useEffect(() => {
    if (data && data.length > 1) setCols(data[0]);
  }, [data]);

  return (
    <>
      {isParams && (
        <Button type="link" icon={<FileSyncOutlined />} onClick={autoProcess}>
          Auto Process
        </Button>
      )}
      <ColumnModal
        handleChange={handleChange}
        visible={visible}
        setVisible={setVisible}
        cols={cols}
        onFinish={onFinish}
        form={form}
      />
    </>
  );
};

Params.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  setData: PropTypes.func.isRequired,
};

export default Params;
