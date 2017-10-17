/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "style" }] */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, browserHistory, Link } from 'react-router-dom';
// import { Router, Route, Switch, browserHistory, IndexRoute } from 'react-router'
// import PropTypes from 'prop-types';
import style from '../styles/main.less';

import PatientList from './components/patients/PatientList.jsx';
import Menu from './components/common/Menu.jsx';
import MedicineList from './components/medicine/MedicineList.jsx';

const Main = () => (
  <BrowserRouter history={browserHistory}>
    <div>
      <Menu />
      <hr />
      <Route exact path='/patients' component={PatientList} />
      <Route path='/medicine' component={MedicineList} />
    </div>
  </BrowserRouter>
);

ReactDOM.render(<Main />, document.getElementById('main-container'));
