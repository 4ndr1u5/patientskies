import React from 'react';
import { Row, Col, Button, FormControl } from 'react-bootstrap';

export default class PatientRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: this.props.editMode,
      patient: this.props.patient,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.state = {
      editMode: nextProps.editMode,
      patient: nextProps.patient,
    };
  }

  onInputChange(prop, val) {
    let patient = Object.assign({}, this.state.patient);
    patient[prop] = val;
    this.setState({ patient });
  }

  setEditMode() {
    this.setState({
      editMode: true,
    });
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
          <Button
            onClick={() => {
              this.props.savePatient(this.state.patient);
            }}
          >
            Save
          </Button>
        </Col>
      </Row>
    );
  }

  renderViewMode() {
    return (
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
              <Button onClick={this.props.deletePatient}>Delete</Button>
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
        </Col>
      </Row>
    );
  }

  render() {
    if (this.state.editMode) {
      return this.renderEditMode();
    }
    return this.renderViewMode();
  }
}
