import React, { ConcurrentMode } from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import App from './components/App';

ReactDOM.render(
  <ConcurrentMode>
    <App />
  </ConcurrentMode>,
  document.getElementById('app')
);