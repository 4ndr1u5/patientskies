//Import the mongoose module
const mongoose = require('mongoose');
const express = require('express');
const app = express();

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

app.get('/', function (req, res) {
  console.log('Got a GET request');
  res.send('Got a GET request');
});

app.post('/', function (req, res) {
  console.log('Got a POST request');
  res.send('Got a POST request');
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
