import React, { useState, useEffect, useRef } from 'react';
import XLSX from 'xlsx';
import { Button, Modal, Form, Input } from 'antd';
import { DownloadOutlined, PlusSquareOutlined } from '@ant-design/icons';
import DragDropFile from './DragDrop';
import DataInput from './DataInput';
import OutTable from './Table';
import Params from './Params';
import codes from '../NCIcodes';

export default function SheetJSApp(props) {
  const [data, setData] = useState([]);
  const [cols, setCols] = useState([]);
  const [sheets, setSheets] = useState([]);
  const [activeSheet, setActiveSheet] = useState(0);
  const [workB, setWorkB] = useState(null);
  const [visible, setVisible] = useState(false);
  const [orgModal, setOrgModal] = useState(false);
  const [unit, setUnit] = useState(null);

  const formRef = useRef(null);
  const [form] = Form.useForm();

  String.prototype.capitalize = function () {
    return this.toLowerCase().replace(/\b[a-z]/g, char => char.toUpperCase());
  };

  const cleanAddr = (datas, field) => {
    const addr = datas[0].indexOf(field);
    if (addr >= 0) {
      const cleaned = datas.map((item, i) => {
        if (i == 0) return item;

        item.splice(
          addr,
          1,
          item[addr]
            ? item[addr]
                .capitalize()
                .trim()
                .replace(
                  /UNKNOWN|Unknown|County|Sub County|Invalid code|[.,]+/g,
                  ''
                )
            : ''
        );
        return item;
      });
      setData(cleaned);
      return cleaned;
    }
    return datas;
  };

  const handleFile = async (file /*:File*/) => {
    /* Boilerplate to set up FileReader */

    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = async e => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = await XLSX.read(bstr, { type: rABS ? 'binary' : 'array' });
      await setWorkB(wb);
      await setSheets(wb?.SheetNames);
      /* Get first worksheet */
      const wsname = wb.SheetNames[activeSheet];
      const ws = wb.Sheets[wsname];

      /* Convert array of arrays */
      const datas = XLSX.utils.sheet_to_json(ws, { header: 1 });
      // Remove unwanted characters from address
      let cleaned = datas;
      await ['ADDR (desc)', 'ADDR (cat)'].forEach(field => {
        cleaned = cleanAddr(datas, field);
      });

      await setCols(make_cols(ws['!ref']));
      if (!cleaned[0].includes('OrgUnit')) {
        setOrgModal(true);
      }
    };
    if (rABS) reader.readAsBinaryString(file);
    else reader.readAsArrayBuffer(file);
  };

  const loadData = async () => {
    const wsname = workB.SheetNames[activeSheet];
    const ws = workB.Sheets[wsname];

    /* Convert array of arrays */
    const datas = XLSX.utils.sheet_to_json(ws, { header: 1 });
    let cleaned = datas;
    await [('ADDR (desc)', 'ADDR (cat)')].forEach(field => {
      cleaned = cleanAddr(datas, field);
    });

    setCols(make_cols(ws['!ref']));
  };

  // Switch sheet
  const changeSheet = value => {
    const idx = sheets.indexOf(value);
    setActiveSheet(idx);
    loadData();
  };

  const exportFile = () => {
    /* convert state to workbook */
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'SheetJS');
    /* generate XLSX file and send to client */
    XLSX.writeFile(wb, `${unit || 'export'}.xlsx`);
  };

  const make_cols = refstr => {
    let o = [],
      C = XLSX.utils.decode_range(refstr).e.c + 1;
    for (var i = 0; i < C; ++i)
      o[i] = { name: XLSX.utils.encode_col(i), key: i };
    return o;
  };

  useEffect(() => {
    if (orgModal) {
      orgModals();
    }
  }, [orgModal]);

  // submit & update origanization unit
  const onFinish = values => {
    const header = data[0];
    setUnit(values?.orgUnit);
    if (!header.includes('OrgUnit')) {
      header.splice(0, 0, 'OrgUnit');
      const newData = data.map((row, i) => {
        if (i === 0) return row;
        row.splice(0, 0, values.orgUnit);
        return row;
      });
      form.resetFields();
      setOrgModal(false);
      return setData(newData);
    }
    return form.resetFields();
  };

  // column positions to be placed righ or left & check for yes responses
  const positions = {
    lefts: [
      'CHEMOTREAT (true)',
      'IMMUNOTREAT (true)',
      'HORMONETREATMENT (true)',
      'RADIOTREAT (true)',
      'SURGERY (true)',
      'HIV(true)',
      'SPECIFICALLYPOSITIVE (true)',
      'OTHERTREATMENT(TRUE)',
      'BAS (true)',
      'TELEPHONENO(+254)',
      'OTHERCONCURRENTILLNESS(true)',
    ],
    rights: [
      'MOR(Matching NCI Codes)',
      'TOP(Matching NCI Codes)',
      'ADDR (Sub County)',
      'WARD',
      'NOKNUMBER',
      'NOKNAME',
      'ADDR (County)',
    ],
    yes: [
      'CHEMOTREAT (true)',
      'IMMUNOTREAT (true)',
      'HORMONETREATMENT (true)',
      'RADIOTREAT (true)',
      'SURGERY (true)',
    ],
  };

  // Organization unit modal
  const orgModals = () =>
    Modal.confirm({
      title: 'Enter organization unit',
      visible: { orgModal },
      onOk: () => {
        formRef.current.submit();
      },
      okText: 'Submit',
      content: (
        <Form
          name='dynamic_form_nest_item'
          onFinish={onFinish}
          autoComplete='off'
          ref={formRef}
          form={form}
        >
          <Form.Item
            label='Organization unit'
            name='orgUnit'
            rules={[
              { required: true, message: 'Please enter organization unit!' },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      ),
    });

  return (
    <DragDropFile handleFile={handleFile}>
      <div className='doc-header'>
        <DataInput handleFile={handleFile} />
        {data && data.length > 0 && (
          <>
            <Button
              type='link'
              icon={<PlusSquareOutlined />}
              onClick={() => setVisible(true)}
            >
              Add columns
            </Button>
            <Params
              visible={visible}
              setVisible={setVisible}
              data={data}
              setData={setData}
              positions={positions}
              codes={codes}
            />
          </>
        )}
        <Button
          disabled={!data.length}
          className='btn-export'
          onClick={exportFile}
          type='link'
          icon={<DownloadOutlined />}
        >
          Export
        </Button>
      </div>
      <div className='row'>
        <div className='col-xs-12'>
          <OutTable data={data} cols={cols} />
        </div>
        <div className='sheets'>
          {sheets &&
            sheets.length > 1 &&
            sheets.map(item => (
              <Button
                type='button'
                onClick={() => changeSheet(item)}
                key={item}
                disabled={item === 'NCI codes.'}
              >
                {item}
              </Button>
            ))}
        </div>
      </div>
    </DragDropFile>
  );
}
