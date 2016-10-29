import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import { hashHistory } from 'react-router';
// import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

ReactDOM.render(
  <Routes history={hashHistory} />,
  document.getElementById('root')
);
