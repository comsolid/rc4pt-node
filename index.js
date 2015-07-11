'use strict';

var api = require('./popcorn/api')
    , com = require('serialport')
    , bunyan = require('bunyan')
    , log = bunyan.createLogger({name: 'rc4pt-node'});

var rport = /usb|acm|^com/i;
com.list(function (err, result) {
    if (err) {
        log.error(err);
        return;
    }

    var ports;
    ports = result.filter(function(val) {
        var available = true;
        // Match only ports that Arduino cares about
        // ttyUSB#, cu.usbmodem#, COM#
        if (!rport.test(val.comName)) {
          available = false;
        }

        return available;
    }).map(function(val) {
        return val.comName;
    });

    if (ports.length === 0) {
        log.error('No ports found. Verify your Ardiuno connection.');
    } else if (ports.length === 1) {
        // load directily
        log.info('Using port %s', ports[0]);
        main(ports[0]);
    } else {
        // ask the user for the correct port
        var inquirer = require('inquirer');
        inquirer.prompt([
            {
                type: 'list',
                name: 'port',
                message: 'What port you want to use?',
                choices: ports
            }
        ], function (answers) {
            main(answers.port);
        });
    }
});

function main(port) {
    var serialPort = new com.SerialPort(port, {
        baudrate: 9600,
        parser: com.parsers.readline('\r\n')
    });

    serialPort.on('open',function() {
        log.info('Port open, ready to go.');
    });

    serialPort.on('data', function(data) {

        function callback(error, response) {
            if (!error && response.statusCode === 200) {
                api.parseAndSend(data);
            } else {
                log.warn('Error while connecting. You have to open Popcorntime manually.');
            }
        }

        api.send('ping', [], callback);
    });
}


