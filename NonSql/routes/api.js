var express = require('express');
var router = express.Router();
var device = require('./devices')

router.get('/', function(req, res, next){
  res.send({
    message : "Welcome to API"
  });
})

router.use('/device', device);

module.exports = router

