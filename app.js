var path = require('path');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var Q = require('q');
var Pin = require('./modules/pin.js');
var config = require('./config');

var gpio = null;
try{
  gpio = require('rpi-gpio');
}
catch(err){
  console.log(err);
  gpio = require('./modules/mock-rpi-gpio.js');
}

app.use(express.static(path.join(__dirname, 'public')));

server.listen(3000, function () {
  console.log('Server listening at port 3000');
});

var pir = new Pin(config.pinPirSensor);

Q.all([
  pir.setupInput(pirMovement)
])
.then(function(){
  console.log("GPIO initialized");
})
.catch(function(err){
  console.log(err);
});

function pirMovement(val){
  if (val){
    console.log("pir movement!");
  }
}

/*
io.on('connection', function(socket){
  console.log('Socket client connected');
  socket.on('setLedState', function (data) {
    console.log(data);
    if (data.led1 != null){
      led1.write(data.led1);
    }
    if (data.led2 != null){
      led2.write(data.led2);
    }
    if (data.led3 != null){
      led3.write(data.led3);
    }
    if (data.led4 != null){
      led4.write(data.led4);
    }
    if (data.led5 != null){
      led5.write(data.led5);
    }
  });
});
*/

process.on('SIGINT', function () {
  gpio.destroy(function() {
    console.log('All pins unexported');
  });
  io.close();
});


