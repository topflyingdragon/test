var SerialPort = require('serialport');
var port = new SerialPort('/dev/ttyS0', {
    baudRate: 115200,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false
}, function(err){
    console.log(err);
});

port.on('open', function() {
    console.log("open");
    setInterval(function(){
        console.log(port.read());
    },1000);
});