import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import { hashHistory } from 'react-router';
import './index.css';

ReactDOM.render(
  <Routes history={hashHistory} />,
  document.getElementById('root')
);
