//Import the mongoose module
const mongoose = require('mongoose');
const express = require('express');
const app = express();
var bodyParser = require('body-parser');

//Set up default mongoose connection
var mongoDB = 'mongodb://paprikosas:vienas11@ds121575.mlab.com:21575/patientskies';
mongoose.connect(mongoDB, {
    useMongoClient: true
});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

app.get('/', function(req, res) {
    console.log('Got a GET request');
    res.send('Got a GET request');
});

var Schema = mongoose.Schema;

var Patient = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    phoneNumber: { type: String, required: true }
});

var PatientModel = mongoose.model('Patient', Patient);

app.get('/patients', function(req, res) {

    return PatientModel.find(function(err, patients) {
        if (!err) {
            res.send(JSON.stringify({
                patients: patients,
                title: 'Patients'
            }));
        } else {
            return console.log(err);
        }
    });
});

app.get('/patients/add', function(req, res) {
    var patient_data = {
        _id: "",
        firstName: "",
        lastName: "",
        email: "",
        dateOfBirth: "",
        phoneNumber: ""
    };

    res.send(JSON.stringify({
        title: 'Patient data',
        patient: patient_data
    }));
});

app.post('/patients/add', function(req, res) {
    console.log(req.body);
    var patient;

    patient = new PatientModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        dateOfBirth: req.body.dateOfBirth,
        phoneNumber: req.body.phoneNumber
    });
    console.log(patient);

    patient.save(function(err) {
        if (!err) {
            console.log("created");
            res.send(JSON.stringify({
                status: 'success',
                data: patient
            }));
        } else {
            console.log(err);
        }
    });
});

app.get('/patients/:id', function(req, res) {
    return PatientModel.findById(req.params.id, function(err, patient_data) {
        if (!err) {
            res.send(JSON.stringify({
                title: 'Patient data',
                patient: patient_data
            }));

        } else {
            console.log(err);
        }
    });
});

app.post('/patients/:id', function(req, res) {

    return PatientModel.findById(req.params.id, function(err, patient_data) {
        patient_data.firstName = req.body.firstName;
        patient_data.lastName = req.body.lastName;
        patient_data.email = req.body.email;
        patient_data.dateOfBirth = req.body.dateOfBirth;
        patient_data.phoneNumber = req.body.phoneNumber;
        return patient_data.save(function(err) {
            if (!err) {
                console.log("updated");
                res.send(JSON.stringify({
                    status: 'success',
                    data: patient_data
                }));
            } else {
                console.log(err);
            }
            res.redirect('/patients/', 301);
        });
    });
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
