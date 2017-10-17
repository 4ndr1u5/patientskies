import React from 'react';
import PatientRow from './PatientRow.jsx';
import {Grid, Row, Col} from 'react-bootstrap';

export default class PatientList extends React.Component {
  constructor() {
    super();
    this.onClick = this.handleSubmit.bind(this);
  }

  /* eslint class-methods-use-this: ["error", { "exceptMethods": ["handleSubmit"] }] */
  handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:3000", {
      method: "POST",
      headers: {
        "Content-Type": "text/json"
      },
      body: JSON.stringify({})
    }).then((response) => {
      return response.blob();
    }).then((body) => {
      console.log(body);
    });
  }

  render() {
    var rows = [];
    for (var i=0; i < 4; i++) {
      rows.push(<PatientRow />);
    }
    return <div>
      <h2>PatientList</h2>
      <Grid>
        <Row className="show-grid">
          <Col xs={3} md={3}>Name</Col>
          <Col xs={3} md={3}>Email</Col>
          <Col xs={3} md={3}>Date of birth</Col>
          <Col xs={3} md={3}>Phone number</Col>
        </Row>
        {rows}
      </Grid>
      <button onClick={this.onClick}>POST</button>
    </div>;
  }
}
