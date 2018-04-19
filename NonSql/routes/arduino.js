var express = require('express');
var router = express.Router();
var Arduino = require('../board.js')

router.post('/setup/:pin', function(req, res, next){
  var mode = req.body['mode']
  console.log(mode)
  mode_value = 0x00
  if (mode == 'output'){
    mode_value = 0x01;
  }
  var pin = req.params.pin
  if(mode == 'input'){
    Arduino.digitalRead(pin, function(value){
      ;;
    })
  }
  Arduino.pinMode(pin, mode_value)
  res.send({
    message : "Pin Number " + pin +" was set as " + mode
  })
})

router.post('/set/:pin', function(req, res, next){
  var pin = req.params['pin'];
  var value = req.body['value'];
  if (value > 0){
    value = Arduino.HIGH;
  }
  else {
    value = Arduino.LOW;
  }
  Arduino.digitalWrite(pin, value);
  res.send ({
    message : "Pin " + pin + " set to " + value
  })
})

router.get('/read/:pin', function(req, res, next){
  res.send({
    message : Arduino.pins[req.params.pin].value
  })
})


module.exports = router
