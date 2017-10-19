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
    this.setState({
      editMode: nextProps.editMode,
    });
  }

  onInputChange(prop, val) {
    const patient = Object.assign({}, this.state.patient);
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
      <Row className="grid-row">
        <Col xs={2}>
          <FormControl
            type="text"
            onChange={e => this.onInputChange('firstName', e.target.value)}
            value={this.state.patient.firstName}
          />
        </Col>
        <Col xs={2}>
          <FormControl
            type="text"
            onChange={e => this.onInputChange('lastName', e.target.value)}
            value={this.state.patient.lastName}
          />
        </Col>
        <Col xs={2}>
          <FormControl
            type="text"
            onChange={e => this.onInputChange('email', e.target.value)}
            value={this.state.patient.email}
          />
        </Col>
        <Col xs={2}>
          <FormControl
            type="text"
            onChange={e => this.onInputChange('dateOfBirth', e.target.value)}
            value={this.state.patient.dateOfBirth}
          />
        </Col>
        <Col xs={2}>
          <FormControl
            type="text"
            onChange={e => this.onInputChange('phoneNumber', e.target.value)}
            value={this.state.patient.phoneNumber}
          />
        </Col>
        <Col xs={2}>
          <Button
            className="row-button"
            bsSize="xsmall"
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
      <Row className="grid-row">
        <Col xs={2}>{this.state.patient.firstName}</Col>
        <Col xs={2}>{this.state.patient.lastName}</Col>
        <Col xs={2}>{this.state.patient.email}</Col>
        <Col xs={2}>{this.state.patient.dateOfBirth}</Col>
        <Col xs={2}>{this.state.patient.phoneNumber}</Col>
        <Col xs={2}>
          <div>
            {this.props.actions === 'CRUD' && (
              <div>
                <Button
                  className="row-button"
                  bsSize="xsmall"
                  onClick={this.setEditMode.bind(this)}
                >
                  Edit
                </Button>
                <Button
                  className="row-button"
                  bsSize="xsmall"
                  onClick={this.props.deletePatient}
                >
                  Delete
                </Button>
              </div>
            )}
            {this.props.actions === 'assign' && (
              <Button
                className="row-button"
                bsSize="xsmall"
                onClick={() => {
                  this.props.assignMedicine(this.state.patient);
                }}
              >
                Assign
              </Button>
            )}
            {this.props.children}
          </div>
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
