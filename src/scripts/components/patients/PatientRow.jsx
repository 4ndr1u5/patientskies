import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

const PatientRow = () => (
  <Row className="show-grid">
      <Col xs={3} md={3}>Namex</Col>
      <Col xs={3} md={3}>Emailx</Col>
      <Col xs={3} md={3}>Date of birthx</Col>
      <Col xs={3} md={3}>Phone numberx</Col>
    </Row>
);

export default PatientRow;
