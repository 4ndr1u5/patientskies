import React from 'react';
import { Row, Col, Button, FormControl } from 'react-bootstrap';

export default class PatientRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: this.props.editMode,
      patient: this.props.patient,
      medicineShow: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.patient._id !== nextProps.patient._id) {
      this.setState({
        patient: nextProps.patient,
      });
    }
  }

  setEditMode() {
    this.setState({
      edit: true,
    });
  }

  deletePatient() {
    fetch('http://localhost:3000/patients/' + this.state.patient._id, {
      method: 'delete',
    })
      .then(response => {
        return response.json();
      })
      .then(body => {
        this.setState({
          deleted: true,
        });
        console.log(body);
      });
  }

  saveRecord() {
    const url = this.state.patient._id
      ? 'http://localhost:3000/patients/' + this.state.patient._id
      : 'http://localhost:3000/patients/add';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.patient),
    })
      .then(response => {
        return response.json();
      })
      .then(body => {
        this.setState({
          edit: false,
        });
        console.log(body);
      });
  }

  toggleAssignedMedicine() {
    this.setState({ medicineShow: !this.state.medicineShow });
  }

  onInputChange(prop, val) {
    let patient = Object.assign({}, this.state.patient);
    patient[prop] = val;
    this.setState({ patient });
  }

  renderEditMode() {
    return (
      <Row className="show-grid">
        <Col xs={2} md={2}>
          <FormControl
            type="text"
            onChange={e => this.onInputChange('firstName', e.target.value)}
            value={this.state.patient.firstName}
          />
        </Col>
        <Col xs={2} md={2}>
          <FormControl
            type="text"
            onChange={e => this.onInputChange('lastName', e.target.value)}
            value={this.state.patient.lastName}
          />
        </Col>
        <Col xs={2} md={2}>
          <FormControl
            type="text"
            onChange={e => this.onInputChange('email', e.target.value)}
            value={this.state.patient.email}
          />
        </Col>
        <Col xs={2} md={2}>
          <FormControl
            type="text"
            onChange={e => this.onInputChange('dateOfBirth', e.target.value)}
            value={this.state.patient.dateOfBirth}
          />
        </Col>
        <Col xs={2} md={2}>
          <FormControl
            type="text"
            onChange={e => this.onInputChange('phoneNumber', e.target.value)}
            value={this.state.patient.phoneNumber}
          />
        </Col>
        <Col xs={2} md={2}>
          <Button onClick={this.saveRecord.bind(this)}>Save</Button>
        </Col>
      </Row>
    );
  }

  renderViewMode() {
    return (
      <div>
        <Row className="show-grid">
          <Col xs={2} md={2}>
            {this.state.patient.firstName}
          </Col>
          <Col xs={2} md={2}>
            {this.state.patient.lastName}
          </Col>
          <Col xs={2} md={2}>
            {this.state.patient.email}
          </Col>
          <Col xs={2} md={2}>
            {this.state.patient.dateOfBirth}
          </Col>
          <Col xs={2} md={2}>
            {this.state.patient.phoneNumber}
          </Col>
          <Col xs={2} md={2}>
            {this.props.actions === 'CRUD' && (
              <div>
                <Button onClick={this.setEditMode.bind(this)}>Edit</Button>
                <Button onClick={this.deletePatient.bind(this)}>Delete</Button>
              </div>
            )}
            {this.props.actions === 'assign' && (
              <div>
                <Button
                  onClick={() => {
                    this.props.assignMedicine(this.state.patient);
                  }}
                >
                  Assign
                </Button>
              </div>
            )}
            {this.state.medicineShow && (
              <Button
                onClick={() => {
                  this.toggleAssignedMedicine();
                }}
              >
                Hide medicine
              </Button>
            )}
            {!this.state.medicineShow && (
              <Button
                onClick={() => {
                  this.toggleAssignedMedicine();
                }}
              >
                Show medicine
              </Button>
            )}
          </Col>
        </Row>

        {this.state.medicineShow &&
          this.state.patient.medicine &&
          this.state.patient.medicine.map(med => {
            return (
              <Row>
                <Col xs={4} md={4}>
                  {med.productName}
                </Col>
                <Col xs={4} md={4}>
                  {med.substanceName}
                </Col>
                <Col xs={4} md={4}>
                  {med.form}
                </Col>
              </Row>
            );
          })}
      </div>
    );
  }

  render() {
    if (this.state.deleted) {
      return null;
    } else if (this.state.edit) {
      return this.renderEditMode();
    }

    return this.renderViewMode();
  }
}
