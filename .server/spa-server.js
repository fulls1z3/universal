'use strict';

const express = require('express');
const compression = require('compression');
const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

const server = express();
server.use(compression());
server.use(logger('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));
server.use('/', express.static('public', {index: false}));

server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// development error handler
// will print stacktrace
if (server.get('env') === 'development') {
  server.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stack trace leaked
server.use(function(err, req, res) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

const PORT = process.env.PORT || 1337;
const HOST = process.env.BASE_URL || 'localhost';
const baseUrl = `http://${HOST}:${PORT}`;

server.set('port', PORT);

server.listen(server.get('port'), () => {
  console.log(`Express server listening on ${baseUrl}`);
});

module.exports = server;
