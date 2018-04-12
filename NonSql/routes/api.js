var express = require('express');
var router = express.Router();
var devices = require('../models/devices')

router.get('/', function(req, res, next){
  devices.find({}).then(function(err, data){
    if(err){
      res.send(err);
    }
    res.send(data);
  })
})

module.exports = router
