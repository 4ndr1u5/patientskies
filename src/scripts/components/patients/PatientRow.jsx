import React from 'react';
import { Row, Col, Button, FormControl } from 'react-bootstrap';

export default class PatientRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: this.props.editMode,
      patient: this.props.patient,
      validations: [],
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

  submitPatient() {
    const validations = this.validateAllFields();
    if (validations.every(v => v === '')) {
      this.props.savePatient(this.state.patient);
      this.setState({ validations: [] });
    } else {
      this.setState({ validations });
    }
  }

  validateAllFields() {
    return [
      'firstName',
      'lastName',
      'email',
      'phoneNumber',
      'dateOfBirth',
    ].map(prop => this.validateField(prop, this.state.patient[prop]));
  }

  /* eslint class-methods-use-this: ["error", { "exceptMethods": ["validateField"] }] */
  validateField(prop, val) {
    const validationRegexp = {
      firstName: {
        regexp: new RegExp('^[A-Za-z]{1,16}$'),
        error: 'First name must be between 1 and 16 letters long',
      },
      lastName: {
        regexp: new RegExp('^[A-Za-z]{0,16}$'),
        error: 'Last name must be between 1 and 16 letters long',
      },
      email: {
        regexp: new RegExp(
          '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$',
        ),
        error: 'Please enter valid email address',
      },
      phoneNumber: {
        regexp: new RegExp('\\d{12}'),
        error: 'Phone number must be 12 digits long',
      },
      dateOfBirth: {
        regexp: new RegExp(
          '^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$',
        ),
        error: 'Date must be of format YYYY-MM-DD',
      },
    };

    const validationResult = validationRegexp[prop].regexp.test(val);
    if (!validationResult) {
      return validationRegexp[prop].error;
    }
    return '';
  }

  setEditMode() {
    this.setState({
      editMode: true,
    });
  }

  renderEditMode() {
    return (
      <div>
        {this.state.validations.map(err => (
          <Row key={err} className="validation-message-row">
            {err}
          </Row>
        ))}
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
              onClick={this.submitPatient.bind(this)}
            >
              Save
            </Button>
          </Col>
        </Row>
      </div>
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
              {this.props.children}
            </div>
          )}
          {this.props.actions === 'assign' && (
            <div>
              <Button
                className="row-button"
                bsSize="xsmall"
                onClick={() => {
                  this.props.assignMedicine(this.state.patient);
                }}
              >
                Assign
              </Button>
              {this.props.children}
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
