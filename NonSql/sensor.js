var request = require('request');
var SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline')

var port = new SerialPort('/dev/ttyACM0',{
  baudRate : 115200
});

const parser = port.pipe(new Readline({ delimiter: '\r\n' }))
parser.on('data', function(data){
    request.post('http://localhost:8080/api/device/Arduino', data, function(erro, response , body){
        console.log(body)
    })
})
