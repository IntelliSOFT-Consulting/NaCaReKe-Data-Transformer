/* eslint-disable react/forbid-prop-types */
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import ColumnForm from './ColumnForm';

export default function ColModal({
  handleChange,
  onFinish,
  visible,
  cols,
  setVisible,
  form,
}) {
  const formRef = useRef(null);
  return (
    <Modal
      title="Edit data"
      visible={visible}
      onOk={() => formRef.current.submit()}
      onCancel={() => setVisible(false)}
      width={1000}
      okText="Submit"
    >
      <ColumnForm
        formRef={formRef}
        onFinish={onFinish}
        handleChange={handleChange}
        cols={cols}
        form={form}
      />
    </Modal>
  );
}

ColModal.propTypes = {
  handleChange: PropTypes.func.isRequired,
  onFinish: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  cols: PropTypes.array.isRequired,
  setVisible: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
};
