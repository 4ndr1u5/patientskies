var PatientApi = (function() {
	let getAllPatients = function(query, cb) {
		let url =
			query.length > 0
				? 'http://localhost:3000/patients/search/' + query
				: 'http://localhost:3000/patients';
		fetch(url, {
			method: 'GET',
		})
			.then(response => {
				return response.json();
			})
			.then(body => {
				cb(body.patients);
			});
	};

	let deletePatient = function(patient, cb) {
		fetch('http://localhost:3000/patients/' + patient._id, {
			method: 'delete',
		})
			.then(response => {
				return response.json();
			})
			.then(body => {
				cb();
			});
	};

	let savePatient = function(patient, cb) {
		const url = patient._id
			? 'http://localhost:3000/patients/' + patient._id
			: 'http://localhost:3000/patients/add';
		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(patient),
		})
			.then(response => {
				return response.json();
			})
			.then(body => {
				cb(body.data);
			});
	};

	return {
		deletePatient: deletePatient,
		savePatient: savePatient,
		getAllPatients: getAllPatients,
	};
})();

module.exports = PatientApi;
