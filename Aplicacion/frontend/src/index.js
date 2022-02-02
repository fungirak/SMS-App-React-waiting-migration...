import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'materialize-css'; // It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css';


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


