/**
 * Used if rpi-gpio package fails to load (ie not on a raspberry...)
 */
module.exports = {
  DIR_OUT: "out",
  setup: function(pin, dir, cb){
    console.log("setup " + pin + " " + dir);
    cb();
  },
  write: function(pin, value, cb){
    console.log("write " + pin + " " + value);
    cb();
  },
  destroy: function(cb){
    console.log("destroy");
    cb();
  }
}