import React, { useState, useEffect, useRef } from 'react';
import { Form, Input, Button, Space, Modal, Select, message } from 'antd';
import {
  MinusCircleOutlined,
  PlusOutlined,
  FileSyncOutlined,
} from '@ant-design/icons';

const { Option } = Select;

const Params = ({ visible, setVisible, data, setData, positions }) => {
  const [cols, setCols] = useState(data[0]);
  const [isParams, setIsParams] = useState(false);
  const [form] = Form.useForm();

  const formRef = useRef();

  useEffect(() => {
    const params = JSON.parse(localStorage.getItem('params'));
    if (params && data.length > 0) {
      setIsParams(true);
    }
  }, [data.length]);

  const onFinish = values => {
    localStorage.setItem('params', JSON.stringify(values.params));
    values.params.forEach(param => {
      insertCol(
        param.check,
        param.update[0],
        positions.rights.includes(param.update[0].trim()),
        positions.yes.includes(param.update[0].trim())
      );
    });
    message.success('Operations applied successfully!');
    form.resetFields();
    return setIsParams(true);
  };

  const autoProcess = () => {
    const params = JSON.parse(localStorage.getItem('params'));
    if (params) {
      params.forEach(param => {
        insertCol(
          param.check,
          param.update[0],
          positions.rights.includes(param.update[0].trim()),
          positions.yes.includes(param.update[0].trim())
        );
      });
      message.success('Operations applied successfully!');
    }
  };

  const insertCol = (title, col, right = false, yes = null) => {
    const headers = data[0];
    if (!headers.includes(col)) {
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

        if (yes && !title.toLowerCase().includes('hiv')) {
          row.splice(
            right ? checked + 1 : checked,
            0,
            right
              ? row[checked] && row[checked].toLowerCase() === 'yes'
                ? true
                : false
              : row[checked] && row[checked].toLowerCase() === 'yes'
              ? true
              : false
          );
        } else if (title.toLowerCase().includes('hiv')) {
          row.splice(
            right ? checked + 1 : checked,
            0,

            row[checked] &&
              (row[checked].toLowerCase().includes('positive') ||
                row[checked].toLowerCase() === 'yes')
              ? true
              : false
          );
        } else if (col.includes('TELEPHONENO(+254)')) {
          row.splice(
            checked,
            0,
            row[checked] &&
              !/UNKNOWN|Unknown|County|NONE|N\/A|Invalid code+/g.test(
                row[checked]
              )
              ? `+254${row[checked].toString().replace(/[^0-9]/g, '')}`
              : ''
          );
        } else if (col.includes('NOKNAME')) {
          row.splice(
            checked + 1,
            0,
            row[checked] &&
              !/UNKNOWN|Unknown|NONE|N\/A|Invalid code+/g.test(row[checked])
              ? `${row[checked]
                  .toString()
                  .replace(/[^A-Za-z ]/g, '')
                  .trim()}`
              : ''
          );
        } else if (col.includes('NOKNUMBER')) {
          row.splice(
            checked + 1,
            0,
            row[checked] &&
              !/UNKNOWN|Unknown|County|NONE|N\/A|Invalid code+/g.test(
                row[checked]
              )
              ? `+254${row[checked].toString().replace(/[^0-9]/g, '')}`
              : ''
          );
        } else if (col.includes('ADDR (County)')) {
          row.splice(
            checked + 1,
            0,
            row[checked] &&
              !/UNKNOWN|Unknown|NONE|N\/A|Invalid code+/g.test(row[checked])
              ? `${row[checked]
                  .toString()
                  .replace(/UNKNOWN|Unknown|County|Invalid code|[.,]+/g, '')
                  .trim()} County`
              : ''
          );
        } else if (col.includes('ADDR (Sub-County)')) {
          row.splice(
            checked + 1,
            0,
            row[checked] &&
              !/UNKNOWN|Unknown|NONE|N\/A|Invalid code+/g.test(row[checked])
              ? `${row[checked]
                  .toString()
                  .replace(/UNKNOWN|Unknown|County|Invalid code|[.,]+/g, '')
                  .trim()} Sub-County`
              : ''
          );
        } else if (col.includes('WARD')) {
          row.splice(
            checked + 1,
            0,
            row[checked] &&
              !/UNKNOWN|Unknown|NONE|N\/A|Invalid code+/g.test(row[checked])
              ? `${row[checked]
                  .toString()
                  .replace(/UNKNOWN|Unknown|County|Invalid code|[.,]+/g, '')
                  .trim()} Ward`
              : ''
          );
        } else {
          row.splice(
            right ? checked + 1 : checked,
            0,
            right ? (row[checked] ? true : false) : row[checked] ? true : false
          );
        }

        return row;
      });

      setData(filledCols);

      setVisible(false);
      return filledCols;
    } else {
      message.error(`Column ${col} already exists`);
      return setVisible(false);
    }
  };

  function handleChange(value) {
    console.log(value);
    if (value.length > 1) {
      value = [value[0]];
    }
    console.log(value);
  }

  useEffect(() => {
    if (data && data.length > 1) setCols(data[0]);
  }, [data]);

  const children = [
    ...new Set([...positions.rights, ...positions.yes, ...positions.lefts]),
  ];

  return (
    <>
      {isParams && (
        <Button type='link' icon={<FileSyncOutlined />} onClick={autoProcess}>
          Auto Process
        </Button>
      )}
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
          className='col-form'
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
                      <Select
                        showSearch
                        style={{ width: 250 }}
                        mode='tags'
                        placeholder='Column to be created'
                        onChange={handleChange}
                      >
                        {children.map((item, i) => (
                          <Option key={item}>{item}</Option>
                        ))}
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
