var five = require('johnny-five');
var board = new five.Board();

board.on('ready', function(){
  	this.pinMode(1, five.Pin.ANALOG);
  	this.analogRead(1, function(voltage) {
    console.log(voltage);
  });
});

/*var serialport = require('serialport');
var portName = '/dev/tty.usbmodem1411';
var sp = new serialport.SerialPort(portName, {
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false,
    parser: serialport.parsers.readline("\r\n")
}, true);

sp.on('data', function(input) {
    console.log(input);
});*/