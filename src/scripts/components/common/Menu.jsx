import React from 'react';
import { Link } from 'react-router-dom';
// import { Link } from 'react-router';
// export default class Menu extends React.Component {
//   render() {
//     return <div><h2>Menu</h2></div>;
//   }
// }

const Menu = () => (
  <ul>
    <li><Link to= '/patients'>Patients</Link></li>
    <li><Link to='/medicine'>Medicine</Link></li>
  </ul>
);

export default Menu;
