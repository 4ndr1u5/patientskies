var PatientApi = (function() {
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
	};
})();

module.exports = PatientApi;
