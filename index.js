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

function sendCmd(cmd){
    port.write(cmd, function(err) {
        if (err) {
            return console.log('Error on write: ', err.message);
        }
        console.log('message written: ' + cmd);
    });
}

function start_test(){
    var cmds = [
        'set_config&ID=11111&ACK& ',
        'set_config&EID=2222&ACK& ',
        'set_config&TRANSMIT_TIMER_INTERVAL=5&ACK& ',
        'set_config&RECIVE_TIMER_INTERVAL=5&ACK& '
    ];
    setTimeout(function(){sendCmd(cmds[0])},0);
    setTimeout(function(){sendCmd(cmds[1])},1000);
    setTimeout(function(){sendCmd(cmds[2])},2000);
    setTimeout(function(){sendCmd(cmds[3])},3000);

    setInterval(function(){
        var buf = port.read();
        if(buf){
            console.log('received: '+buf.toString());
        };
    },1000);
}
