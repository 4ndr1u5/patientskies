import { Grid, Row, Col, Button } from 'react-bootstrap';
import { debounce } from 'lodash';

import React from 'react';

import Patient from './Patient.jsx';
import Search from '../common/Search.jsx';

import PatientApi from '../../api/patient';

export default class PatientList extends React.Component {
  constructor() {
    super();
    this.state = {
      query: '',
      patients: [],
      newPatients: [],
    };
  }

  componentDidMount() {
    this.search = debounce(() => {
      PatientApi.getAllPatients(this.state.query, patients => {
        this.setState({
          patients,
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
    const newPatients = Array.from(this.state.newPatients);
    newPatients.push({});
    this.setState({ newPatients });
  }

  render() {
    return (
      <Grid>
        <Row>
          <h4 className="title">Patients</h4>
        </Row>
        {this.props.medicineForAssign && (
          <Row>
            <h4>Assign {this.props.medicineForAssign.productName} to</h4>
          </Row>
        )}
        <Row>
          <Col xs={10} md={6}>
            <Search
              onInputChange={this.onInputChange.bind(this)}
              query={this.state.query}
              placeholder={"enter patient's full first or last name"}
            />
          </Col>
          {!this.props.medicineForAssign && (
            <Col xsOffset={4} xs={2}>
              <Button onClick={this.createPatient.bind(this)}>
                Create new
              </Button>
            </Col>
          )}
        </Row>
        <Row className="header-row">
          <Col xs={2}>First name</Col>
          <Col xs={2}>Last name</Col>
          <Col xs={2}>Email</Col>
          <Col xs={2}>Date of birth</Col>
          <Col xs={2}>Phone number</Col>
          <Col xs={2}>Actions</Col>
        </Row>

        {this.state.newPatients.map(patient => (
          <Patient
            key={patient.firstName + patient.lastName}
            patient={patient}
            editMode={true}
            actions={'CRUD'}
          />
        ))}
        {this.state.patients.map(patient => (
          <Patient
            key={patient._id}
            patient={patient}
            editMode={false}
            medicineForAssign={this.props.medicineForAssign}
            actions={this.props.medicineForAssign ? 'assign' : 'CRUD'}
          />
        ))}
      </Grid>
    );
  }
}
