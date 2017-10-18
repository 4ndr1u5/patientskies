import React from 'react';
import { Grid, Row, Col, Button, FormControl } from 'react-bootstrap';
import MedicineRow from './MedicineRow.jsx';
import Search from '../common/Search.jsx';
import { debounce } from 'lodash';
import MedicineApi from '../../api/medicine.js';

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
      MedicineApi.search(val, medicine => {
        this.setState({
          medicine: medicine.map(med => {
            return {
              id: med.id,
              productName: med.productName,
              typeName: med.typeName,
              form: med.form,
              atcName: med.atcName,
              atcCatName: med.atcCatName,
              substanceName: med.substanceName,
              units: med.units,
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
        <Row>
          <h4 class="title">Medicine</h4>
        </Row>

        <Row>
          <Col xs={12} md={6}>
            <Search
              onInputChange={this.onInputChange.bind(this)}
              query={this.state.query}
              placeholder={'enter medicine name'}
            />
          </Col>
        </Row>
        <Row className="header-row">
          <Col xs={2}>productName</Col>
          <Col xs={2}>typeName</Col>
          <Col xs={2}>form</Col>
          <Col xs={2}>atcName</Col>
          <Col xs={2}>atcCatName</Col>
          <Col xs={2}>Actions</Col>
        </Row>
        {this.state.medicine.map(med => {
          return (
            <MedicineRow
              key={med.id}
              onMedicineAssign={this.props.onMedicineAssign}
              medicine={med}
            />
          );
        })}
      </Grid>
    );
  }
}
