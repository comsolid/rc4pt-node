'use strict';

var btoa = require('btoa'),
    request = require('request');

request.debug = false;

// use when you want a empty callback
var noop = function() {};

var Api = function(config) {
    this.host = config.host;
    this.port = config.port;
    this.username = config.username;
    this.password = config.password;
    this.currentPlayer = 0;
};

Api.prototype.getURL = function() {
    return 'http://' + this.host + ':' + this.port;
};

Api.prototype.send = function(method, params, callback) {
    params = params || [];
    callback = callback || noop;

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
            remote: 'PTR-0.3.5-3'
        }
    };

    request(options, callback);
};

Api.prototype.parseAndSend = function(value) {
    if (/^rc4pt:(.*)$/.test(value)) {
        var aux = value.split(':');
        var cmd = aux[1];
        var self = this;

        // verifica qual a tela em que o usuário está, e o controle
        // se adapta de acordo com a visão
        this.send('getviewstack', [], function(error, response, data) {
            if (!error && response.statusCode === 200) {
                var currentView;
                // Check if the client is an old version of popcorntime (pre 0.3.4).
                if (typeof(data.result.popcornVersion) === 'undefined') {
                    currentView = data.result[0][data.result[0].length - 1];
                }
                // The popcorntime client is version 0.3.4 or higher.
                else {
                    currentView = data.result.viewstack[data.result.viewstack.length - 1];
                }

                switch (currentView) {
                    case 'main-browser':
                        self.handleMainBrowser(cmd);
                        break;
                    case 'player':
                        self.handlePlayer(cmd);
                        break;
                    case 'shows-container-contain':
                        self.handleShows(cmd);
                        break;
                    case 'movie-detail':
                        self.handleMovieDetail(cmd);
                        break;
                }
            } else {
                console.log(error);
            }
        });
    } else {
        console.log('ignored value:', value);
    }
};

Api.prototype.handleMainBrowser = function(cmd) {
    switch (cmd) {
        case 'btn-4':
        case 'previous':
            this.send('left');
            break;
        case 'btn-6':
        case 'next':
            this.send('right');
            break;
        case 'btn-2':
        case 'volume-up':
            this.send('up');
            break;
        case 'btn-8':
        case 'volume-down':
            this.send('down');
            break;
        case 'btn-5':
        case 'play-pause':
            this.send('enter');
            break;
        case 'btn-0':
            this.send('showfavourites');
            break;
        case 'up':
            this.send('toggletab');
            break;
    }
};

Api.prototype.handlePlayer = function(cmd) {
    switch (cmd) {
        case 'play-pause':
            this.send('toggleplaying');
            break;
        case 'func-stop':
            this.send('togglefullscreen');
            break;
        case 'down':
            this.send('back');
            break;
    }
};

Api.prototype.handleShows = function (cmd) {
    switch (cmd) {
        case 'btn-2':
        case 'volume-up':
            this.send('up');
            break;
        case 'btn-8':
        case 'volume-down':
            this.send('down');
            break;
        case 'btn-5':
        case 'play-pause':
            this.send('enter');
            break;
        case 'btn-4':
        case 'previous':
            this.send('previousseason');
            break;
        case 'btn-6':
        case 'next':
            this.send('nextseason');
            break;
        case 'btn-0':
            this.send('showfavourites');
            break;
        case 'btn-7':
            this.send('togglequality');
            break;
        case 'btn-9':
            this.changePlayer();
            break;
    }
};

Api.prototype.handleMovieDetail = function (cmd) {
    switch (cmd) {
        case 'down':
            this.send('back');
            break;
        case 'btn-7':
            this.send('togglequality');
            break;
        case 'play-pause':
            this.send('enter');
            break;
        case 'btn-1':
            this.send('watchtrailer');
            break;
        case 'btn-9':
            this.changePlayer();
            break;
    }
};

Api.prototype.changePlayer = function () {
    var self = this;
    this.send('getplayers', [], function (error, response, data) {
        var players = data.result.players;
        var len = players.length;
        
        self.currentPlayer++;
        if (self.currentPlayer === len) {
            self.currentPlayer = 0;
        }
        
        self.send('setplayer', [players[self.currentPlayer].id]);
    });
};

var config = require('./config');
module.exports = new Api(config);
