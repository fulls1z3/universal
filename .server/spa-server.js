'use strict';

/**
 * Server dependencies
 */
const express = require('express');
const compression = require('compression');
const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

const server = express();
server.use(compression());
server.use(logger('dev'));

/**
 * Parsers for POST data
 */
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

/**
 * Point static path to `public`
 */
server.use('/', express.static('public', {index: false}));

/**
 * Catch all routes and return the `index.html`
 */
server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

/**
 * Error handlers
 */
// development error handler
// will print stacktrace
if (server.get('env') === 'development') {
    server.use(function (err, req, res) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
server.use(function (err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

/**
 * Port & host settings
 */
const PORT = process.env.PORT || 1337;
const HOST = process.env.BASE_URL || 'localhost';
const baseUrl = `http://${HOST}:${PORT}`;

server.set('port', PORT);

/**
 * Begin listening
 */
server.listen(server.get('port'), () => {
  console.log(`Express server listening on ${baseUrl}`);
});

module.exports = server;
