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
      'https://res.cloudinary.com/victoriaaqua/raw/upload/v1629205570/codes_tc1v2t_ks1s7j.json'
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

  useEffect(() => {
    readCodeFile();
  }, []);

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
    if (wsname) {
      const ws = workB.Sheets[wsname];

      /* Convert array of arrays */
      const datas = XLSX.utils.sheet_to_json(ws, { header: 1 });
      console.log(datas);
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
    const cols = ['TOP', 'MOR'];
    ['TOP(Matching NCI Codes)', 'MOR(Matching NCI Codes)'].forEach(
      (header, i) => {
        addMatch(cols[i], header, datas);
      }
    );
  };

  const addMatch = (title, col, datas) => {
    const headers = datas[0];
    const chooseNci = getNCI() || extUnit;
    const nci = chooseNci.filter((item, i) => i > 1);
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
        row.splice(
          idx + 1,
          0,
          nci_match.includes(row[idx + 1])
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

  useEffect(() => {
    if (data && data.length > 0 && activeSheet === 0 && !matched) {
      setTimeout(() => handleMatchNCI(data), 1000);
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
