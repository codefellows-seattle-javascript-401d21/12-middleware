'use strict';

//Application dependencies
const express = require('express');
const errorHandler = require('./error-handler');

//Application setup
const app = express();
const router_notes = express.Router();

//Route setup
require('../route/route-note')(router_notes);
//require('../route/route-category')(router)
app.use('/{0,}', (request, response) => errorHandler(new Error('Path Error. Route not found.'), response));

//Server controls
const server = module.exports = {};
server.isOn = false;

server.start = function(port, callback) {
    if(server.isOn) return callback(new Error('Server running. Cannot start server again.'));
    server.isOn = true;
    return app.listen(port, callback);
};

server.stop = function(callback) {
    if(!server.isOn) return callback(new Error('Server not running. You\'re dumb. Don\'t do that.'));
    server.isOn = false;
    return app.close(callback);
};