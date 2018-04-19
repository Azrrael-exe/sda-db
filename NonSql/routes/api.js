var express = require('express');
var router = express.Router();
var device = require('../models/devices')

router.get('/', function(req, res, next){
  device.find({}).then(function(err, data){
    if(err){
      res.send(err);
    }
    res.send(data);
  })
})

router.post('/', function (req, res, next) {
  var newDevice = new device();
  newDevice['name'] = req.body.name
  newDevice['status'] = req.body.status
  newDevice.save().then(function(err, data){
    if(err){
      res.send(err)
    }
    else {
      res.send({
        message : "Device created!"
      })
    }
  })
})

module.exports = router
