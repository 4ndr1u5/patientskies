/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "style" }] */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, browserHistory, Link } from 'react-router-dom';
// import { Router, Route, Switch, browserHistory, IndexRoute } from 'react-router'
// import PropTypes from 'prop-types';
import style from '../styles/main.less';

import PatientList from './components/patients/PatientList.jsx';
import Menu from './components/common/Menu.jsx';
// import { MedicineList } from './components/medicine/MedicineList.jsx';

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
);

const MedicineList = ({ match }) => (
  <div>
    <h2>Medicine</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic}/>
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>
);

// MedicineList.propTypes = {
//   match: PropTypes.string.isRequired,
// };

// export default class Main extends React.Component {
//   render() {
//     return <BrowserRouter>
//       <div>
//         <ul>
//           <li><Link to='/patients'>Patients</Link></li>
//           <li><Link to='/medicine'>Medicine</Link></li>
//         </ul>
//         <hr/>
//         <Route path='/patients' component={PatientList}/>
//         <Route path='/medicine>' component={MedicineList}/>
//       </div>
//       </BrowserRouter>;
//   }
// }

const Main = () => (
  <BrowserRouter  history={browserHistory}>
    <div>
      <Menu />

      <hr/>
      <Route path='/patients' component={PatientList}/>
      <Route path='/medicine' component={MedicineList}/>
    </div>
  </BrowserRouter>
);

// Main.propTypes = {
//   name: PropTypes.string.isRequired,
// };

// const Home = () => (
//   <div>
//     <h2>Home</h2>
//   </div>
// );

// const PatientList = () => (
//   <div>
//     <h2>PatientList</h2>
//   </div>
// );

ReactDOM.render(<Main />, document.getElementById('main-container'));
