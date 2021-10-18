/* eslint-disable consistent-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { message, Form, Button } from 'antd';
import { FileSyncOutlined } from '@ant-design/icons';
import ColumnModal from './ColModal';
import dateFields from '../data/dateFields';
import {
  addresses,
  cleanDate,
  cleanPhone,
  mor,
  nok,
  top,
  hiv,
  therapies,
} from '../helpers';

// eslint-disable-next-line no-unused-vars
const Params = ({ visible, setVisible, data, setData, setErrors, errors }) => {
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

  // Modal form submit
  const onFinish = async (values) => {
    const { params } = values;
    await localStorage.setItem('params', JSON.stringify(params));
    const err = {};
    const mors = await mor(data);
    const tops = await top(data);
    await setData(mors.mapped);
    await setData(tops.mapped);
    err.mor = [...new Set(mors.err)];
    err.top = [...new Set(tops.err)];
    await formatTime(data);
    if (params) {
      await params.forEach(async (param) => {
        // eslint-disable-next-line no-unused-vars
        const { check, update } = param;
        if (check?.toLowerCase()?.includes('addr')) {
          const setAddr = await addresses(data, check);
          setData(setAddr.addr);
          err.addr = err.addr ? [...err.addr, ...new Set(setAddr.err)] : [...new Set(setAddr.err)];
        }
        if (
          check?.toLowerCase()?.includes('phnumber') && !check?.toLowerCase()?.includes('nok')
        ) {
          await setData(cleanPhone(data, check));
        }
        if (check?.toLowerCase()?.includes('phonenok')) {
          await setData(nok(data, check));
        }
        if (check?.toLowerCase()?.includes('hiv')
      || check?.toLowerCase()?.includes('specifically')) {
          await setData(hiv(data, check));
        }
        if (update[0]?.toLowerCase()?.includes('true')) {
          const isCoded = !check.includes('desc');
          await setData(therapies(data, check, isCoded, true));
        }
      });
      setErrors([err]);
      await message.success('Operations applied successfully!');
      await form.resetFields();
      return setIsParams(true);
    }
    return false;
  };
  // Automatically processes the document from previous configurations
  const autoProcess = async () => {
    const params = JSON.parse(localStorage.getItem('params'));
    const err = {};
    const mors = await mor(data);
    const tops = await top(data);
    await setData(mors.mapped);
    await setData(tops.mapped);
    err.mor = [...new Set(mors.err)];
    err.top = [...new Set(tops.err)];
    await formatTime(data);
    if (params) {
      await params.forEach(async (param) => {
        // eslint-disable-next-line no-unused-vars
        const { check, update } = param;
        if (check?.toLowerCase()?.includes('addr')) {
          const setAddr = await addresses(data, check);
          setData(setAddr.addr);
          err.addr = err.addr ? [...err.addr, ...new Set(setAddr.err)] : [...new Set(setAddr.err)];
        }
        if (
          check?.toLowerCase()?.includes('phnumber') && !check?.toLowerCase()?.includes('nok')
        ) {
          await setData(cleanPhone(data, check));
        }
        if (check?.toLowerCase()?.includes('phonenok')) {
          await setData(nok(data, check));
        }
        if (check?.toLowerCase()?.includes('hiv')
      || check?.toLowerCase()?.includes('specifically')) {
          await setData(hiv(data, check));
        }
        if (update[0]?.toLowerCase()?.includes('true')) {
          const isCoded = !check.includes('desc');
          await setData(therapies(data, check, isCoded, true));
        }
      });
      setErrors([err]);
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
  setErrors: PropTypes.func.isRequired,
  errors: PropTypes.array.isRequired,
};

export default Params;
