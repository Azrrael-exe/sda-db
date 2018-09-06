var express = require('express');
var router = express.Router();
var Device = require('../models/devices')
var Read = require('../models/reads')

router.get('/', function(req, res, next){
  Device.find({}, function(err, data ){
    if(err){
      res.send(err);
    }
    res.send({
      message : "List of devices",
      payload : data
    });
  })
});

router.post('/', Device.findDevice, function (req, res, next) {
  if(req.body.device_id && !req.device && req.body.device_id.indexOf(" ")==-1){
    var dev = new Device({
      device_id : req.body.device_id,
      location : req.body.location || null,
      description : req.body.description || null
    })
    dev.save(function(err, device){
      if(err){
        res.send(err);
      } else {
        res.send({
          message : "New device created",
          payload : device
        })
      }
    })
  } else {
    res.status = 400;
    res.send({
      message : "invalid requests"
    })
  }
});

router.put('/:device_id', Device.findDevice, function(req, res, next){
  console.log(req.body)
  if(req.device){
    req.device.set({location : req.body.location || req.device.location })
    req.device.set({ description : req.body.description || req.device.description})
    req.device.save(function(err, updatedevice){
      if(err){
        res.send(err)
      } else {
        res.send({
          message : "Device updated",
          payload : updatedevice
        })
      }
    })
  } else {
    res.status = 404
    res.send({
      message: "Device not found"
    })
  }
});

router.delete('/:device_id', Device.findDevice, Read.findByDevice, function(req, res, next){
  if(req.device){
    req.device.remove(function(err, device){
      if(err){
        res.send(err)
      } else {
        Read.deleteMany({device : req.device._id}, null)
        res.send({
          message : "Device removed",
          payload : device
        })
      }
    })
  } else {
    res.status = 404
    res.send({
      message: "Device not found"
    })
  }
});

router.get('/:device_id', Device.findDevice, Read.findByDevice, function(req, res, next){
  if(req.device) {
    res.send({
      message : "List of Reads",
      payload : {
        device : req.device,
        reads : req.reads
      }
    })
  } else {
    res.status = 404
    res.send({
      message: "Device not found"
    })
  }
})

router.post('/:device_id', Device.findDevice, function(req, res, next){
  if(req.device){
    var new_read = new Read({
      device : req.device._id,
      value : req.body.value
    })
    new_read.save(function(err, value){
      res.send({
        message : "read added",
        payload : new_read
      })
    })
  } else {
    res.status = 404
    res.send({
      message: "Device not found"
    })
  } 
});

router.put('/:device_id/:read', Device.findDevice, function(req, res, next){
  Read.findOne({device: req.device._id, _id: req.params.read}, function(err, read){
    if(err){
      res.send(err)
    } else {
      read.set({value : req.body.value || read.value})
      read.save(function(err, updatedread){
        if(err){
          res.send(err)
        } else {
          res.send({
            message : "read updated",
            payload : read
          })
        }
      })
    }
  })
});

router.delete('/:device_id/:read', function(req, res, next){
  Read.findOne({device: req.device._id, _id: req.params.read}, function(err, read){
    if(err){
      res.send(err)
    } else {
      read.remove(function(err, updatedread){
        if(err){
          res.send(err)
        } else {
          res.send({
            message : "read deleted",
            payload : read
          })
        }
      })
    }
  })
});

module.exports = router