var express = require('express');
var bodyParser = require('body-parser')
var mongoose = require('mongoose');

var app = express();

// --- Mongo Config ---
mongoose.Promise = global.Promise;
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost:27017/taxo");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var api = require('./routes/api')

app.use('/api', api);

app.get('/', function(req, res, next){
  res.send({
    message : "Hello World!"
  })
})

module.exports = app;
