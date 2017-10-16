import React from 'react';
import ReactDOM from 'react-dom';

import style from '../styles/main.less';

// using ES6 modules
import { BrowserRouter, Route, Link } from 'react-router-dom';

const BasicExample = () => (
  <BrowserRouter>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/patients">Patients</Link></li>
        <li><Link to="/medicine">Medicine</Link></li>
      </ul>

      <hr/>

      <Route exact path="/" component={Home}/>
      <Route path="/patients" component={Patients}/>
      <Route path="/medicine" component={Medicine}/>
    </div>
  </BrowserRouter>
)


const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const Patients = () => (
  <div>
    <h2>Patients</h2>
  </div>
)

const Medicine = ({ match }) => (
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
)

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

ReactDOM.render(<BasicExample />, document.getElementById("main-container"));
