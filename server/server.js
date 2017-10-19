//Import the mongoose module
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');

//Set up default mongoose connection
var mongoDB =
  'mongodb://paprikosas:vienas11@ds121575.mlab.com:21575/patientskies';
mongoose.connect(mongoDB, {
  useMongoClient: true,
});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  res.header('Access-Control-Allow-Methods', 'DELETE');
  next();
});
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  }),
);

app.get('/', function(req, res) {
  console.log('Got a GET request');
  res.send('Got a GET request');
});

var Schema = mongoose.Schema;

var Medicine = new Schema({
  id: { type: String },
  typeName: { type: String },
  typeId: { type: String },
  atcId: { type: String },
  atcCatName: { type: String },
  atcName: { type: String },
  substanceName: { type: String },
  productName: { type: String },
  form: { type: String },
  strength: { type: String },
  units: { type: String },
});

var Patient = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  medicine: [Medicine],
});

var PatientModel = mongoose.model('Patient', Patient);

app.get('/patients', function(req, res) {
  return PatientModel.find(function(err, patients) {
    if (!err) {
      res.send(
        JSON.stringify({
          patients: patients,
          title: 'Patients',
        }),
      );
    } else {
      return console.log(err);
    }
  });
});

app.get('/patients/add', function(req, res) {
  var patient_data = {
    // _id: "",
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    phoneNumber: '',
  };

  res.send(
    JSON.stringify({
      title: 'Patient data',
      patient: patient_data,
    }),
  );
});

app.post('/patients/add', function(req, res) {
  var patient;

  patient = new PatientModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    dateOfBirth: req.body.dateOfBirth,
    phoneNumber: req.body.phoneNumber,
  });

  patient.save(function(err) {
    if (!err) {
      return res.send(
        JSON.stringify({
          status: 'success',
          data: patient,
        }),
      );
    } else {
      return console.log(err);
    }
  });
});

app.get('/patients/:id', function(req, res) {
  return PatientModel.findById(req.params.id, function(err, patient_data) {
    if (!err) {
      res.send(
        JSON.stringify({
          title: 'Patient data',
          patient: patient_data,
        }),
      );
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
        return res.send(
          JSON.stringify({
            status: 'success',
            data: patient_data,
          }),
        );
      } else {
        return console.log(err);
      }
      res.redirect('/patients/', 301);
    });
  });
});

app.get('/patients/search/:query', function(req, res) {
  return PatientModel.find(
    {
      $or: [
        { firstName: req.params.query },
        { lastName: req.params.query },
        { email: req.params.query },
      ],
    },
    function(err, patients) {
      if (!err) {
        return res.send(
          JSON.stringify({
            patients: patients,
            title: 'Patients',
          }),
        );
      } else {
        return console.log(err);
      }
    },
  );
});

app.delete('/patients/:id', function(req, res) {
  return PatientModel.findById(req.params.id).exec(function(err, doc) {
    if (err || !doc) {
      res.statusCode = 404;
      res.send({});
    } else {
      doc.remove(function(err) {
        if (err) {
          res.statusCode = 403;
          res.send(err);
        } else {
          res.send({});
        }
      });
    }
  });
});

app.get('/medicine/:query', function(req, res) {
  return request({
    uri: 'https://fest-searcher.herokuapp.com/api/fest/s/' + req.params.query,
  }).pipe(res);
});

app.post('/medicine/assign', function(req, res) {
  return PatientModel.findById(req.body.patient._id, function(
    err,
    patient_data,
  ) {
    patient_data.medicine.push(req.body.medicine);
    return patient_data.save(function(err) {
      if (!err) {
        return res.send(
          JSON.stringify({
            status: 'success',
            data: patient_data,
          }),
        );
      } else {
        return console.log(err);
      }
      res.redirect('/patients/', 301);
    });
  });
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
