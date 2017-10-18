import React from 'react';
import Patient from './Patient.jsx';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { browserHistory } from 'react-router-dom';
import Search from '../common/Search.jsx';
import { debounce } from 'lodash';
import PatientApi from '../../api/patient.js';

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
    this.search = debounce(val => {
      PatientApi.getAllPatients(this.state.query, patients => {
        this.setState({
          patients: patients,
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
    let newPatients = Array.from(this.state.newPatients);
    newPatients.push({});
    this.setState({ newPatients: newPatients });
  }

  // assignMedicine(patient) {
  //   MedicineApi.assign(
  //     this.props.medicineForAssign,
  //     patient,
  //     updatedPatient => {
  //       this.setState({ patient: updatedPatient });
  //     },
  //   );
  // }

  render() {
    return (
      <Grid>
        <Row className="show-grid">
          <h2>Patients</h2>
        </Row>
        {this.props.medicineForAssign && (
          <Row className="show-grid">
            <h4>Assign {this.props.medicineForAssign.productName} to</h4>
          </Row>
        )}
        <Row className="show-grid">
          <Col xs={10} md={6}>
            <Search
              onInputChange={this.onInputChange.bind(this)}
              query={this.state.query}
            />
          </Col>
          {!this.props.medicineForAssign && (
            <Col xs={2} md={2}>
              <Button onClick={this.createPatient.bind(this)}>
                Create new
              </Button>
            </Col>
          )}
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

        {this.state.newPatients.map(patient => {
          return <Patient patient={patient} editMode={true} actions={'CRUD'} />;
        })}
        {this.state.patients.map(patient => {
          return (
            <Patient
              key={patient._id}
              patient={patient}
              editMode={false}
              medicineForAssign={this.props.medicineForAssign}
              actions={this.props.medicineForAssign ? 'assign' : 'CRUD'}
            />
          );
        })}
      </Grid>
    );
  }
}
