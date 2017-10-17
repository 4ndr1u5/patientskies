import React from 'react';
import PatientRow from './PatientRow.jsx';
import {Grid, Row, Col} from 'react-bootstrap';
import {browserHistory} from 'react-router-dom';
import Search from '../common/Search.jsx';
import {debounce} from 'lodash';

export default class PatientList extends React.Component {
  constructor() {
    super();
    this.state = { query: "", patients: [] };
  }

  componentWillMount(){
    this.search = debounce((val) => {
      fetch("http://localhost:3000/patients/search/" + val, {
      method: "GET"
    }).then((response) => {
      return response.json();
    }).then((body) => {
      this.setState({
        patients: body.patients.map(pat => {return {_id: pat._id,
        firstName: pat.firstName,
        lastName: pat.lastName,
        email: pat.email,
        dateOfBirth: pat.dateOfBirth,
        phoneNumber: pat.phoneNumber}})
      });
    });
    }, 1000)

    fetch("http://localhost:3000/patients", {
      method: "GET"
    }).then((response) => {
      return response.json();
    }).then((body) => {
      this.setState({
        patients: body.patients
      });
    });
  }

  onInputChange(val){
    this.setState({query: val});
    this.search(val);
  }

  render() {
    return <Grid>
        <Row className="show-grid">
          <h2>Patients</h2>
        </Row>
        <Row className="show-grid">
          <Col xs={12} md={6}>
            <Search onInputChange={this.onInputChange.bind(this)} query={this.state.query}/>
          </Col>
        </Row>
        <Row className="show-grid">
          <Col xs={2} md={2}>First name</Col>
          <Col xs={2} md={2}>Last name</Col>
          <Col xs={2} md={2}>Email</Col>
          <Col xs={2} md={2}>Date of birth</Col>
          <Col xs={2} md={2}>Phone number</Col>
          <Col xs={2} md={2}>Actions</Col>
        </Row>
        {this.state.patients.map((patient) => {
          return <PatientRow patient={patient} />;
        })}
      </Grid>;
  }
}
