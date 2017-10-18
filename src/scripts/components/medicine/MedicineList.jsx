import React from 'react';
import { Grid, Row, Col, Button, FormControl } from 'react-bootstrap';
import MedicineRow from './MedicineRow.jsx';
import Search from '../common/Search.jsx';
import { debounce } from 'lodash';

export default class MedicineList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      medicine: [],
    };
  }

  componentWillMount() {
    this.search = debounce(val => {
      fetch('http://localhost:3000/medicine/' + val, {
        method: 'GET',
      })
        .then(response => {
          return response.json();
        })
        .then(body => {
          this.setState({
            medicine: body.map(med => {
              return {
                productName: med.productName,
                typeName: med.typeName,
                form: med.form,
                atcName: med.atcName,
                atcCatName: med.atcCatName,
              };
            }),
          });
        });
    }, 1000);
  }

  onInputChange(val) {
    this.setState({ query: val });
    this.search(val);
  }

  render() {
    return (
      <Grid>
        <Row className="show-grid">
          <h2>Medicine</h2>
        </Row>
        <Row className="show-grid">
          <Col xs={12} md={6}>
            <Search
              onInputChange={this.onInputChange.bind(this)}
              query={this.state.query}
            />
          </Col>
        </Row>
        <Row className="show-grid">
          <Col xs={2} md={2}>
            productName
          </Col>
          <Col xs={2} md={2}>
            typeName
          </Col>
          <Col xs={2} md={2}>
            form
          </Col>
          <Col xs={2} md={2}>
            atcName
          </Col>
          <Col xs={2} md={2}>
            atcCatName
          </Col>
          <Col xs={2} md={2}>
            Actions
          </Col>
        </Row>
        {this.state.medicine.map(med => {
          return <MedicineRow medicine={med} />;
        })}
      </Grid>
    );
  }
}
