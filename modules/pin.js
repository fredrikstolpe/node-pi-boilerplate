var Q = require('q');

var gpio = null;

try{
  gpio = require('rpi-gpio');
}
catch(err){
  console.log(err);
  gpio = require('./modules/mock-rpi-gpio.js');
}

module.exports = Pin;

function Pin(pin){
  this.pin = pin;
};

Pin.prototype.setupOutput = function(){
  var self = this;
  var deferred = Q.defer();
  gpio.setup(this.pin, gpio.DIR_OUT, function(){
    deferred.resolve();
  });
  return deferred.promise;
};

Pin.prototype.write = function(value){
  var self = this;
  var deferred = Q.defer();
  gpio.write(this.pin, value, function(err) {
    if (err){
      deferred.reject(err);
    }
    else{
      deferred.resolve();
    }
  });
  return deferred.promise;
};

Pin.prototype.setupInput = function(callback){
  var self = this;
  var deferred = Q.defer();
  gpio.setup(this.pin, gpio.DIR_IN, gpio.EDGE_BOTH, function(err){
    gpio.on('change', function(channel, value) {
      if (channel == self.pin){
        callback(value);
      }
    });
    deferred.resolve();
  });
  return deferred.promise;
};