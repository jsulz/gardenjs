var five = require('johnny-five');
var board = new five.Board();
var voltageConstant = .004882814;
var voltageMin = .4;
var voltageMax = 2.0;
var maxWindSpeed = 32;

board.on('ready', function(){
  	var anemometerPin = this.pinMode(5, five.Pin.ANALOG);
  	var board = this;
  	anemometerPin.analogRead(5, function(voltage) {
  		board.loop( 3000, function() {
		     var voltageRead = voltage * voltageConstant;
		     var windSpeed = ( voltageRead - voltageMin ) * maxWindSpeed / ( voltageMax - voltageMin );
		     console.log( voltageRead );
  		});
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