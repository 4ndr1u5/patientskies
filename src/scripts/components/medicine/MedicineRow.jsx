import React from 'react';
import {Row, Col, Button, FormControl} from 'react-bootstrap';

export default class PatientRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      medicine: this.props.medicine
    };
  }


  render() {
    return <Row className="show-grid">
          <Col xs={2} md={2}>{this.state.medicine.productName}</Col>
          <Col xs={2} md={2}>{this.state.medicine.typeName}</Col>
          <Col xs={2} md={2}>{this.state.medicine.form}</Col>
          <Col xs={2} md={2}>{this.state.medicine.atcName}</Col>
          <Col xs={2} md={2}>{this.state.medicine.atcCatName}</Col>
          <Col xs={2} md={2}>Action</Col>
        </Row>;
  }
}
