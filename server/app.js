'use strict';
process.env.NODE_ENV = 'production';
process.env.PORT = 80;
var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');

mongoose.connect(config.mongo.uri, config.mongo.options);

if(config.seedDB) { require('./config/seed'); }

var app = express();
var server = require('http').createServer(app);
var socketio = require('socket.io')(server, {
  serveClient: (config.env === 'production') ? false : true,
  path: '/socket.io-client'
});
require('./config/socketio')(socketio);
require('./config/express')(app);
require('./routes')(app);

server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

exports = module.exports = app;
