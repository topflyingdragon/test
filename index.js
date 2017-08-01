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
    console.log("port open");
    start_test();
});

function start_test(){
    const msg1 = 'set_config&TRANSMIT_TIMER_INTERVAL=5&ACK& ';
    const msg2 = 'set_config&RECIVE_TIMER_INTERVAL=5&ACK& ';
    
    port.write(msg1, function(err) {
        if (err) {
            return console.log('Error on write: ', err.message);
        }
        console.log('message written:' + msg1);
    });
    port.write(msg2, function(err) {
        if (err) {
            return console.log('Error on write: ', err.message);
        }
        console.log('message written:' + msg2);
    });

    setInterval(function(){
        console.log(port.read());
    },1000);
}