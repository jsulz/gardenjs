var five = require("johnny-five");
var board = new five.Board();
var https = require('https');
var apiKey = 'fDVTVYtgmxi4iIAj7U_kMd1FBdB4oW4Y';


function eventCapture( data, sensorid, collection ) {
  var time = new Date();
  logMsg({
    '_id' : time.getTime(),
    'sensorid' : sensorid,
    'time' : time.toString(),
    'event' : data
  }, collection );
}

function logMsg( data, collection) {
  var options = {
    host: 'api.mongolab.com',
    port: '443',
    path: '/api/1/databases/gardenjs/collections/' + collection + '?apiKey=' + apiKey,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }

  var req = https.request(options, function(res) {
    res.setEncoding('utf8');
    res.on('data', function(chunk) {
      if (! /.*_id.*/.test(chunk)) 
        console.log('Unexpected server response: ' + chunk)
    })
  })

  // post the data
  req.write(JSON.stringify( data ));
  req.end();
}

var logMongo = function() {

}

board.on("ready", function() {
  var light1, light2, temperature;

  light1 = new five.Light({
	pin: "A1",
	freq: 3000
  });

  light2 = new five.Light({
	pin: "A0",
	freq: 3000
  });

  temperature = new five.Thermometer({
    controller: "DS18B20",
    pin: 7,
    freq: 3000
  });

  light1.on("data", function() {
    eventCapture( this.level, this.pin, 'photocells' );
    console.log('pin A1: ' + this.level);
  });

  light2.on("data", function() {
    eventCapture( this.level, this.pin, 'photocells' );
    console.log('pin A0: ' + this.level);
  });

  temperature.on("data", function() {
    eventCapture( this.celsius, this.pin, 'temp' );
    console.log(this.celsius + "°C");
  });
});
