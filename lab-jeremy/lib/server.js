'use strict';

// Application dependencies
const express = require('express');
const errorHandler = require('./error-handler');
const debug = require('debug')('http:server');


// Application setup
const app = express();
const router = express.Router();
app.use('/api/v1', router);
// Bad way of mounting to every route
// app.use(bodyParser) // Applies the package to every route in the app 

// Route setup
require('../route/route-note')(router);
app.use('/*', (req, res) => errorHandler(new Error('Path Error. Route not found.'), res)); //Using the * until someone proves otherwise. Used it in 301 and it worked fine.

// Server controls
const server = module.exports = {};
server.isOn = false;
server.http = null

server.start = function(port, callback) {
  if(server.isOn) return callback(new Error('Server running. Cannot start server again.'))
  server.isOn = true
  server.http = app.listen(port, callback)
}

server.stop = function(callback) {
  if(!server.isOn) return callback(new Error('Server not running. You\'re dumb. Don\'t do that.'))
  server.isOn = false
  server.http.close()
}