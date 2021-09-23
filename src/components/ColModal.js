/* eslint-disable react/forbid-prop-types */
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import ColumnForm from './ColumnForm';

export default function ColModal({
  opts,
  handleChange,
  onFinish,
  visible,
  form,
  cols,
  setVisible,
}) {
  const formRef = useRef();
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
        form={form}
        formRef={formRef}
        onFinish={onFinish}
        opts={opts}
        handleChange={handleChange}
        cols={cols}
      />
    </Modal>
  );
}

ColModal.propTypes = {
  opts: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  onFinish: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  form: PropTypes.object.isRequired,
  cols: PropTypes.array.isRequired,
  setVisible: PropTypes.func.isRequired,
};
