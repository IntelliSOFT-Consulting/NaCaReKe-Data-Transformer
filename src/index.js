import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './styles.css';

import App from './App';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement,
);
