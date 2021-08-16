import React, { useState, useEffect, useRef } from 'react';
import { Form, Input, Button, Space, Modal, Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

const Params = ({ visible, setVisible, data, setData }) => {
  const [cols, setCols] = useState(data[0]);
  const [form] = Form.useForm();

  const formRef = useRef();

  const onFinish = values => {
    values.params.forEach(param => {
      insertCol(
        param.check,
        param.update,
        param.position == 'right',
        param.yes === 'yes'
      );
    });
  };

  const insertCol = (title, col, right = false, yes = null) => {
    const headers = data[0];
    const checked = headers.indexOf(title);

    headers.splice(
      right ? headers.indexOf(title) + 1 : headers.indexOf(title),
      0,
      col
    );

    const filledCols = data.map((row, i) => {
      if (i === 0) {
        return row;
      }

      if (yes) {
        row.splice(
          right ? checked + 1 : checked,
          0,
          right
            ? row[checked] && row[checked].toLowerCase() === 'yes'
              ? true
              : false
            : row[checked + 1] && row[checked + 1].toLowerCase() === 'yes'
            ? true
            : false
        );
      } else if (title.toLowerCase().includes('hiv') && !yes) {
        console.log(row[checked] && row[checked]);
        row.splice(
          right ? checked + 1 : checked,
          0,

          row[checked + 1] && row[checked + 1].toLowerCase() === 'positive'
            ? true
            : false
        );
      } else {
        row.splice(
          right ? checked + 1 : checked,
          0,
          right
            ? row[checked]
              ? true
              : false
            : row[checked + 1]
            ? true
            : false
        );
      }

      return row;
    });

    setData(filledCols);
    form.resetFields();
    setVisible(false);
    return filledCols;
  };

  useEffect(() => {
    if (data && data.length > 1) setCols(data[0]);
  }, [data]);

  return (
    <>
      <Modal
        title='Edit data'
        visible={visible}
        onOk={() => formRef.current.submit()}
        onCancel={() => setVisible(false)}
        width={1000}
        okText='Submit'
      >
        <Form
          name='dynamic_form_nest_item'
          onFinish={onFinish}
          autoComplete='off'
          ref={formRef}
          form={form}
        >
          <Form.List name='params'>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: 'flex', marginBottom: 8 }}
                    align='baseline'
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
                        placeholder='Select column to check'
                        optionFilterProp='children'
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {cols &&
                          cols.map((col, i) => (
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
                      <Input placeholder='Column to be created' />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, 'position']}
                      fieldKey={[fieldKey, 'position']}
                      rules={[
                        {
                          required: true,
                          message:
                            'Please choose position for column to be created',
                        },
                      ]}
                    >
                      <Select
                        placeholder='Select position'
                        style={{ width: 120 }}
                      >
                        <Option value='left'>Left</Option>
                        <Option value='right'>Right</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'yes']}
                      fieldKey={[fieldKey, 'yes']}
                      rules={[
                        {
                          required: true,
                          message: 'Please choose value to check',
                        },
                      ]}
                    >
                      <Select
                        placeholder='Select value to check for'
                        style={{ width: 120 }}
                      >
                        <Option value='yes'>Yes</Option>
                        <Option value='any'>Any value</Option>
                      </Select>
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type='dashed'
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add column
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </Modal>
    </>
  );
};

export default Params;
