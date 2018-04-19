var Board = require('firmata')
var arduino = new Board('/dev/ttyACM0');

arduino.on('ready', function(){
  console.log("Arduino connected");
})

module.exports = arduino;
