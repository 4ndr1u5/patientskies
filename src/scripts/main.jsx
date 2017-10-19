/* eslint no-unused-vars: ['error', { 'varsIgnorePattern': 'style' }] */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, browserHistory, Switch } from 'react-router-dom';
import style from '../styles/main.less';

import PatientList from './components/patients/PatientList.jsx';
import Menu from './components/common/Menu.jsx';
import MedicineList from './components/medicine/MedicineList.jsx';

export default class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      medicineForAssign: {},
    };
  }
  onMedicineAssign(medicine) {
    this.setState({ medicineForAssign: medicine });
  }

  render() {
    return (
      <BrowserRouter history={browserHistory}>
        <div>
          <Menu />
          <Route exact path="/" component={PatientList} />
          <Route exact path="/patients" component={PatientList} />
          <Switch>
            <Route
              exact
              path="/medicine"
              render={props => (
                <MedicineList
                  {...props}
                  onMedicineAssign={this.onMedicineAssign.bind(this)}
                />
              )}
            />
            <Route
              exact
              path="/medicine/assign"
              render={props => (
                <PatientList
                  {...props}
                  medicineForAssign={this.state.medicineForAssign}
                />
              )}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById('main-container'));
