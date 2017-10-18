import React from 'react';
import PatientRow from './PatientRow.jsx';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { browserHistory } from 'react-router-dom';
import Search from '../common/Search.jsx';
import { debounce } from 'lodash';

export default class PatientList extends React.Component {
  constructor() {
    super();
    this.state = { query: '', patients: [], createPatient: false };
  }

  componentDidMount() {
    this.search = debounce(val => {
      let url =
        this.state.query.length > 0
          ? 'http://localhost:3000/patients/search/' + val
          : 'http://localhost:3000/patients';
      fetch(url, {
        method: 'GET',
      })
        .then(response => {
          return response.json();
        })
        .then(body => {
          this.setState({
            patients: body.patients,
          });
        });
    }, 1000);
    this.search();
  }

  onInputChange(val) {
    this.setState({ query: val });
    this.search(val);
  }

  createPatient() {
    this.setState({ createPatient: true });
  }

  render() {
    return (
      <Grid>
        <Row className="show-grid">
          <h2>Patients</h2>
        </Row>
        <Row className="show-grid">
          <Col xs={10} md={6}>
            <Search
              onInputChange={this.onInputChange.bind(this)}
              query={this.state.query}
            />
          </Col>
          <Col xs={2} md={2}>
            <Button onClick={this.createPatient.bind(this)}>Create new</Button>
          </Col>
        </Row>
        <Row className="show-grid">
          <Col xs={2} md={2}>
            First name
          </Col>
          <Col xs={2} md={2}>
            Last name
          </Col>
          <Col xs={2} md={2}>
            Email
          </Col>
          <Col xs={2} md={2}>
            Date of birth
          </Col>
          <Col xs={2} md={2}>
            Phone number
          </Col>
          <Col xs={2} md={2}>
            Actions
          </Col>
        </Row>
        {this.state.createPatient ? (
          <PatientRow patient={{}} editMode={true} />
        ) : null}
        {this.state.patients.map(patient => {
          return <PatientRow patient={patient} editMode={false} />;
        })}
      </Grid>
    );
  }
}
