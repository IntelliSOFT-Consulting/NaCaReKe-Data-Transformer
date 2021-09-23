import React from 'react';
import { Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

export default function DataInput(props) {
  const config = {
    onChange: info => {
      if (info.fileList && info.fileList.length == 1) {
        props.handleFile(info.fileList[0]?.originFileObj);
      } else if (info.fileList && info.fileList.length > 1) {
        props.handleFile(
          info.fileList[info.fileList.length - 1]?.originFileObj
        );
      }
    },
    showUploadList: false,
  };

  const SheetJSFT = [
    'xlsx',
    'xlsb',
    'xlsm',
    'xls',
    'xml',
    'csv',
    'txt',
    'ods',
    'fods',
    'uos',
    'sylk',
    'dif',
    'dbf',
    'prn',
    'qpw',
    '123',
    'wb*',
    'wq*',
    'html',
    'htm',
    'json'
  ]
    .map(x => '.' + x)
    .join(',');

  return (
    <Upload data-testid='file-upload' {...config} accept={SheetJSFT}>
      <Button data-testid='upload-btn' icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
  );
}
