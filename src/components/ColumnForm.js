/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Form, Button, Space, Select,
} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import positions from '../data/positions';

const { Option } = Select;

export default function ColumnForm({
  cols,
  onFinish,
  handleChange,
  formRef,
  form,
}) {
  const opts = [
    ...new Set([...positions.rights, ...positions.yes, ...positions.lefts]),
  ];
  return (
    <Form
      name="dynamic_form_nest_item"
      onFinish={onFinish}
      autoComplete="off"
      ref={formRef}
      form={form}
      className="col-form"
    >
      <Form.List name="params">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({
              key, name, fieldKey, ...restField
            }) => (
              <Space
                key={key}
                style={{ display: 'flex', marginBottom: 8 }}
                align="baseline"
              >
                <Form.Item
                  {...restField}
                  name={[name, 'check']}
                  fieldKey={[fieldKey, 'check']}
                  rules={[
                    {
                      required: true,
                      message: 'Missing column to be checked',
                    },
                  ]}
                >
                  <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Select column to check"
                    optionFilterProp="children"
                    filterOption={(input, option) => option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0}
                  >
                    {cols
                      && cols.map((col, i) => (
                        <Option value={col} key={i}>
                          {col}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  {...restField}
                  name={[name, 'update']}
                  fieldKey={[fieldKey, 'update']}
                  rules={[
                    {
                      required: true,
                      message: 'Missing column to be created',
                    },
                  ]}
                >
                  <Select
                    showSearch
                    style={{ width: 250 }}
                    mode="tags"
                    placeholder="Column to be created"
                    onChange={handleChange}
                  >
                    {opts.map((item) => (
                      <Option key={item}>{item}</Option>
                    ))}
                  </Select>
                </Form.Item>

                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
                id="add-button"
              >
                Add column
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form>
  );
}

ColumnForm.propTypes = {
  cols: PropTypes.arrayOf(PropTypes.string).isRequired,
  onFinish: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  formRef: PropTypes.object.isRequired,
  form: PropTypes.shape({}).isRequired,
};
