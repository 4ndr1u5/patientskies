import React from 'react';
import PatientRow from './PatientRow.jsx';
import {Grid, Row, Col} from 'react-bootstrap';
import {browserHistory} from 'react-router-dom';

export default class PatientList extends React.Component {
  constructor() {
    super();
    this.state = { patients: [] };
  }

  componentWillMount(){
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

  render() {
    return
      <Grid>
        <Row className="show-grid">
          <h2>Patients</h2>
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
