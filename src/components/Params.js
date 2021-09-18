import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, Space, Modal, Select, message } from 'antd';
import {
  MinusCircleOutlined,
  PlusOutlined,
  FileSyncOutlined,
} from '@ant-design/icons';
import didYouMean from 'didyoumean';

const { Option } = Select;

const Params = ({ visible, setVisible, data, setData, positions, codes }) => {
  const [cols, setCols] = useState(data[0]);
  const [isParams, setIsParams] = useState(false);
  const [form] = Form.useForm();

  const formRef = useRef();

  const isInvalid = input =>
    input &&
    !/UNKNOWN|Unknown|NONE|N\/A|Invalid code|Invalid category.+/g.test(input);

  const replaceAddr = (addr, txt = '') => {
    return `${addr
      .toString()
      .replace(/UNKNOWN|Unknown|County| Sub County|Invalid code|[.,]+/g, '')
      .trim()} ${txt}`;
  };

  useEffect(() => {
    const params = JSON.parse(localStorage.getItem('params'));
    if (params && data.length > 0) {
      setIsParams(true);
    }
  }, [data.length]);

  // Modal form submit
  const onFinish = async values => {
    await localStorage.setItem('params', JSON.stringify(values.params));
    await handleMatchNCI(data);
    await values.params.forEach(param => {
      insertCol(
        param.check,
        param.update[0],
        positions.rights.includes(param.update[0].trim()),
        positions.yes.includes(param.update[0].trim())
      );
    });

    await message.success('Operations applied successfully!');
    await form.resetFields();
    return setIsParams(true);
  };

  // Automatically processes the document from previous configurations
  const autoProcess = async () => {
    const params = JSON.parse(localStorage.getItem('params'));
    await handleMatchNCI(data);
    if (params) {
      await params.forEach(param => {
        insertCol(
          param.check,
          param.update[0],
          positions.rights.includes(param.update[0].trim()),
          positions.yes.includes(param.update[0].trim())
        );
      });
      await message.success('Operations applied successfully!');
    }
  };

  // Insert columns and update the data accordingly
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
        } else if (
          title.toString().toLowerCase().includes('hiv') ||
          title.toString().toUpperCase().includes('SPECIFICALLYPOSITIVE')
        ) {
          row.splice(
            right ? checked + 1 : checked,
            0,

            row[checked] &&
              (row[checked].toString().toLowerCase().includes('positive') ||
                row[checked].toString().toLowerCase() === 'yes')
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
            isInvalid(row[checked])
              ? `+254${row[checked].toString().replace(/[^0-9]/g, '')}`
              : ''
          );
        } else if (col.includes('ADDR (County)')) {
          row.splice(
            checked + 1,
            0,
            isInvalid(row[checked]) ? replaceAddr(row[checked], 'County') : ''
          );
        } else if (col.includes('ADDR (Sub County)')) {
          row.splice(
            checked + 1,
            0,
            isInvalid(row[checked])
              ? replaceAddr(row[checked], 'Sub County')
              : ''
          );
        } else if (col.includes('WARD')) {
          row.splice(
            checked + 1,
            0,
            isInvalid(row[checked]) ? replaceAddr(row[checked], 'Ward') : ''
          );
        } else if (yes && !title.toString().toLowerCase().includes('hiv')) {
          row.splice(
            right ? checked + 1 : checked,
            0,
            right
              ? row[checked] && row[checked].toString().toLowerCase() === 'yes'
                ? true
                : false
              : row[checked] && row[checked].toString().toLowerCase() === 'yes'
              ? true
              : false
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

  const handleMatchNCI = (datas = []) => {
    const headers = datas[0];
    if (
      headers.includes('TOP(Matching NCI Codes)') ||
      headers.includes('MOR(Matching NCI Codes)')
    )
      return;
    const colms = ['TOP', 'MOR'];
    ['TOP(Matching NCI Codes)', 'MOR(Matching NCI Codes)'].forEach(
      (header, i) => {
        addMatch(colms[i], header, datas);
      }
    );
  };

  // Match morphology & topology codes
  const addMatch = (title, col, datas) => {
    const headers = datas[0];
    const nci = codes.filter((item, i) => i > 1);
    const checkMor = title.includes('MOR')
      ? nci.map(item => [item[0], item[1]])
      : nci.map(item => [item[2], item[3]]);

    const idx = headers.indexOf(title);

    headers.splice(idx + 1, 0, col);

    const final = datas.map((row, i) => {
      if (i === 0) {
        return row;
      }
      if (title.includes('MOR')) {
        const nci_match = checkMor.map(item => item[0]);
        const finder = row[idx + 1]
          ? didYouMean(row[idx + 1].toString(), nci_match)
          : '';
        row.splice(
          idx + 1,
          0,
          finder && checkMor[nci_match.indexOf(row[idx + 1])]
            ? checkMor[nci_match.indexOf(row[idx + 1])][1]
            : ''
        );
      } else {
        const nci_match_top = checkMor.map(item =>
          item[1] ? item[1].replace(/[C.]+/g, '') : ''
        );

        row.splice(
          idx + 1,
          0,
          row[idx] && nci_match_top.includes(row[idx].toString())
            ? checkMor[nci_match_top.indexOf(row[idx].toString())][1]
            : ''
        );
      }
      return row;
    });
    setData(final);
  };

  function handleChange(value) {
    if (value.length > 1) {
      value = [value[0]];
    }
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
