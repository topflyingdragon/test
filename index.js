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
    var cmds = [
        'set_config&ID=11111&ACK& ',
        'set_config&EID=2222&ACK& ',
        'set_config&TRANSMIT_TIMER_INTERVAL=5&ACK& ',
        'set_config&RECIVE_TIMER_INTERVAL=5&ACK& '
    ];

    for(var i=0; i<cmds.length; i++){
        var cmd = cmds[i];
        setTimeout(function(){
            port.write(cmd, function(err) {
                if (err) {
                    return console.log('Error on write: ', err.message);
                }
                console.log('message written:' + cmd);
            });
        }, i*1000);
    };

    setInterval(function(){
        var buf = port.read();
        console.log(buf);
        if(buf){
            console.log(buf.toString());
        };
    },1000);
}