import React, { useState, useEffect, useRef } from 'react';
import XLSX from 'xlsx';
import { Button, Modal, Form, Input } from 'antd';
import { DownloadOutlined, PlusSquareOutlined } from '@ant-design/icons';
import DragDropFile from './DragDrop';
import DataInput from './DataInput';
import OutTable from './Table';
import Params from './Params';
import axios from 'axios';

export default function SheetJSApp(props) {
  const [data, setData] = useState([]);
  const [cols, setCols] = useState([]);
  const [sheets, setSheets] = useState([]);
  const [activeSheet, setActiveSheet] = useState(0);
  const [workB, setWorkB] = useState(null);
  const [visible, setVisible] = useState(false);
  const [matched, setMatched] = useState(false);
  const [orgModal, setOrgModal] = useState(false);
  const [unit, setUnit] = useState(null);
  const [extUnit, setExtUnit] = useState(null);

  const readCodeFile = async () => {
    const { data } = await axios.get(
      'https://res.cloudinary.com/victoriaaqua/raw/upload/v1629195873/codes_tc1v2t.json'
    );
    if (data) {
      setExtUnit(data);
    }
  };

  const formRef = useRef(null);
  const [form] = Form.useForm();

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
      const addr = datas[0].indexOf('ADDR (desc)');
      const cleaned = datas.map((item, i) => {
        if (i == 0) return item;
        item.splice(
          addr,
          1,
          item[addr]
            ? item[addr]
                .trim()
                .replace(/UNKNOWN|Unknown|County|Invalid code|[.,]+/g, '')
            : ''
        );
        return item;
      });

      /* Update state */
      setData(cleaned);
      setCols(make_cols(ws['!ref']));
      setOrgModal(true);
    };
    if (rABS) reader.readAsBinaryString(file);
    else reader.readAsArrayBuffer(file);
  };

  const loadData = () => {
    const wsname = workB.SheetNames[activeSheet];
    const ws = workB.Sheets[wsname];

    /* Convert array of arrays */
    const datas = XLSX.utils.sheet_to_json(ws, { header: 1 });
    const addr = datas[0].indexOf('ADDR (desc)');
    if (addr >= 0) {
      const cleaned = datas.map((item, i) => {
        if (i == 0) return item;
        item.splice(
          addr,
          1,
          item[addr]
            .trim()
            .replace(/UNKNOWN|Unknown|County|Invalid code|[.,]+/g, '')
        );
        return item;
      });

      /* Update state */
      setData(cleaned);
    } else {
      setData(datas);
    }
    setCols(make_cols(ws['!ref']));
  };

  const getNCI = () => {
    const wsname = workB.SheetNames[sheets.indexOf('NCI codes.')];
    readCodeFile();
    if (wsname) {
      const ws = workB.Sheets[wsname];

      /* Convert array of arrays */
      const datas = XLSX.utils.sheet_to_json(ws, { header: 1 });
      return datas;
    } else {
      return extUnit;
    }
  };

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

  const handleMatchNCI = (datas = []) => {
    const headers = datas[0];
    if (
      headers.includes('TOP(Matching NCI Codes)') ||
      headers.includes('MOR(Matching NCI Codes)')
    )
      return data;
    const top = headers.indexOf('TOP');
    const nci = getNCI().filter((item, i) => i > 1);
    const checkMor = nci.map(item => [item[0], item[1]]);
    const checkTop = nci.map(item => [item[2], item[3]]);

    headers.splice(top + 1, 0, 'TOP(Matching NCI Codes)');

    const mor = headers.indexOf('MOR');
    headers.splice(mor + 1, 0, 'MOR(Matching NCI Codes)');

    const final = datas.map((row, i) => {
      if (i === 0) {
        return row;
      }
      const nci_match = checkMor.map(item => item[0]);
      const nci_match_top = checkTop.map(item =>
        item[1] ? item[1].replace(/[C.]+/g, '') : ''
      );
      row.splice(
        mor,
        0,
        nci_match.includes(row[mor])
          ? checkMor[nci_match.indexOf(row[mor])][1]
          : ''
      );

      row.splice(
        top + 1,
        0,
        row[top] && nci_match_top.includes(row[top].toString())
          ? checkTop[nci_match_top.indexOf(row[top].toString())][1]
          : ''
      );

      return row;
    });

    return final;
  };

  useEffect(() => {
    if (data && data.length > 0 && activeSheet === 0 && !matched) {
      setTimeout(() => setData(handleMatchNCI(data)), 1000);
      setMatched(true);
    }
    if (activeSheet > 0 && matched) {
      setMatched(false);
    }
  }, [activeSheet, data.length]);

  useEffect(() => {
    if (orgModal) {
      orgModals();
    }
  }, [orgModal]);

  const onFinish = values => {
    const header = data[0];
    if (!header.includes('OrgUnit')) {
      header.splice(0, 0, 'OrgUnit');
      const newData = data.map((row, i) => {
        if (i === 0) return row;
        row.splice(0, 0, values.orgUnit);
        return row;
      });
      setData(newData);
      setOrgModal(false);
      return form.resetFields();
    }
    setUnit(values?.orgUnit);
    return form.resetFields();
  };

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

  const orgModals = () =>
    Modal.confirm({
      title: 'Enter organization unit',
      visible: { orgModal },
      onOk: () => formRef.current.submit(),
      onCancel() {
        console.log('');
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
