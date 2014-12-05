
var ajax = require('djax')
    , btoa = require('btoa')
    , XMLHttpRequest = require('xhr2')
    , request = require('request');

//ajax.xhr = XMLHttpRequest;
request.debug = false;

var Api = function (config) {
    this.host = config.host;
    this.port = config.port;
    this.username = config.username;
    this.password = config.password;
};

Api.prototype.getURL = function () {
    return 'http://' + this.host + ':' + this.port;
};

Api.prototype.send = function (method, params, callback) {
    params = params || [];

    var options = {
        url: this.getURL(),
        headers: {
            'Authorization': btoa(this.username + ':' + this.password)
        },
        method: 'POST',
        json: true,
        body: {
            params: params,
            id: 10,
            method: method,
            jsonrpc: '2.0',
            remote: "PTR-0.3.5-3"
        }
    };

    request(options, callback);
};

Api.prototype.parseAndSend = function (value) {
    if (/^rc4pt:(.*)$/.test(value)) {
        //console.log(value);
        var aux = value.split(':');
        var cmd = aux[1];
        switch (cmd) {
            case 'left':
                this.send('left', [], function () {});
                break;
            case 'right':
                this.send('right', [], function () {});
                break;
            case 'up':
                this.send('up', [], function () {});
                break;
            case 'down':
                this.send('down', [], function () {});
                break;
            case 'enter':
                this.send('enter', [], function () {});
                break;
            case 'toggleplaying':
                this.send('toggleplaying', [], function () {});
                break;
        }
    } else {
        console.log('ignored value:', value);
    }
};

var config = require('./config');
module.exports = new Api(config);
