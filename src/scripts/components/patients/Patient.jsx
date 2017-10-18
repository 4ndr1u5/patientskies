import React from 'react';
import { Row, Col, Button, FormControl } from 'react-bootstrap';
import PatientRow from './PatientRow.jsx';
import MedicineRow from '../medicine/MedicineRow.jsx';
import PatientApi from '../../api/patient.js';

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

	toggleAssignedMedicine() {
		this.setState({ medicineShow: !this.state.medicineShow });
	}

	onInputChange(prop, val) {
		let patient = Object.assign({}, this.state.patient);
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
		return (
			<div>
				<Row>
					<Col>
						{this.state.medicineShow && (
							<Button
								onClick={this.toggleAssignedMedicine.bind(this)}
							>
								Hide medicine
							</Button>
						)}
						{!this.state.medicineShow && (
							<Button
								onClick={this.toggleAssignedMedicine.bind(this)}
							>
								Show medicine
							</Button>
						)}
					</Col>
				</Row>
				<PatientRow
					editMode={this.state.editMode}
					patient={this.state.patient}
					actions={this.props.actions}
					savePatient={this.savePatient.bind(this)}
					deletePatient={this.deletePatient.bind(this)}
				/>

				{this.state.medicineShow &&
					this.state.patient.medicine &&
					this.state.patient.medicine.map(med => {
						return <MedicineRow key={med.id} medicine={med} />;
					})}
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
