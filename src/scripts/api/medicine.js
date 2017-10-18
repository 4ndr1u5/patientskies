var MedicineApi = (function() {
	let search = function(query, cb) {
		fetch('http://localhost:3000/medicine/' + query, {
			method: 'GET',
		})
			.then(response => {
				return response.json();
			})
			.then(body => {
				cb(body);
			});
	};

	let assign = function(medicine, patient, cb) {
		fetch('http://localhost:3000/medicine/assign', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				medicine: medicine,
				patient: patient,
			}),
		})
			.then(response => {
				return response.json();
			})
			.then(body => {
				cb(body.data);
			});
	};

	return {
		search: search,
		assign: assign,
	};
})();

module.exports = MedicineApi;
