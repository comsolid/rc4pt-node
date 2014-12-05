
var api = require('./popcorn/api')
    , com = require('serialport');

//api.send('ping');

var serialPort = new com.SerialPort('/dev/ttyUSB0', {
    baudrate: 9600,
    parser: com.parsers.readline('\r\n')
});

serialPort.on('open',function() {
    console.log('Port open');
});

serialPort.on('data', function(data) {

    function callback(error, response, body) {
        if (!error && response.statusCode === 200) {
            api.parseAndSend(data);
        } else {
            console.log(error);
        }
    }

    api.send('ping', [], callback);
});
