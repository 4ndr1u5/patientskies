import React from 'react';
import {Row, Col} from 'react-bootstrap';

const PatientRow = props => (
  <Row className="show-grid">
    <Col xs={3} md={3}>{props.patient.firstName} {props.patient.lastName}</Col>
    <Col xs={3} md={3}>{props.patient.email}</Col>
    <Col xs={3} md={3}>{props.patient.dateOfBirth}</Col>
    <Col xs={3} md={3}>{props.patient.phoneNumber}</Col>
  </Row>
);

export default PatientRow;
