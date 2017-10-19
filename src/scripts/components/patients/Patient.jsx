import React from 'react';
import { Button } from 'react-bootstrap';
import PatientRow from './PatientRow.jsx';
import MedicineRow from '../medicine/MedicineRow.jsx';
import PatientApi from '../../api/patient';
import MedicineApi from '../../api/medicine';

export default class Patient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: this.props.editMode,
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

  deletePatient() {
    PatientApi.deletePatient(this.state.patient, () => {
      this.setState({
        deleted: true,
      });
    });
  }

  savePatient(patient) {
    PatientApi.savePatient(patient, data => {
      this.setState({
        editMode: false,
        patient: data,
      });
    });
  }

  assignMedicine(patient) {
    MedicineApi.assign(
      this.props.medicineForAssign,
      patient,
      updatedPatient => {
        this.setState({ patient: updatedPatient });
      },
    );
  }

  toggleAssignedMedicine() {
    this.setState({ medicineShow: !this.state.medicineShow });
  }

  onInputChange(prop, val) {
    const patient = Object.assign({}, this.state.patient);
    patient[prop] = val;
    this.setState({ patient });
  }

  renderEditMode() {
    return (
      <PatientRow
        editMode={true}
        patient={this.state.patient}
        actions={this.props.actions}
        savePatient={this.savePatient.bind(this)}
        deletePatient={this.deletePatient.bind(this)}
      />
    );
  }

  renderViewMode() {
    const showMedicineButton = () => {
      if (this.state.medicineShow) {
        return (
          <Button
            className="row-button"
            bsSize="xsmall"
            onClick={this.toggleAssignedMedicine.bind(this)}
          >
            &#9650;
          </Button>
        );
      }
      return (
        <Button
          className="row-button"
          bsSize="xsmall"
          onClick={this.toggleAssignedMedicine.bind(this)}
        >
          &#9660;
        </Button>
      );
    };
    return (
      <div className="patient-row">
        <PatientRow
          editMode={this.state.editMode}
          patient={this.state.patient}
          actions={this.props.actions}
          savePatient={this.savePatient.bind(this)}
          deletePatient={this.deletePatient.bind(this)}
          assignMedicine={this.assignMedicine.bind(this)}
        >
          {showMedicineButton()}
        </PatientRow>

        {this.state.medicineShow &&
          this.state.patient.medicine &&
          this.state.patient.medicine.map(med => (
            <MedicineRow
              className={'inner-grid-row'}
              key={med.id}
              medicine={med}
            />
          ))}
      </div>
    );
  }

  render() {
    if (this.state.deleted) {
      return null;
    } else if (this.state.editMode) {
      return this.renderEditMode();
    }

    return this.renderViewMode();
  }
}
