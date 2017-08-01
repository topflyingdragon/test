var SerialPort = require('serialport');
var port = new SerialPort('/dev/ttyS', {
    baudRate: 115200
}, function(err){
    console.log(err);
});

port.on('open', function() {
    console.log("open");
    setInterval(function(){
        console.log(port.read());
    },1000);
});