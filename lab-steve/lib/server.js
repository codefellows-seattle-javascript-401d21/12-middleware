'use strict';

// Application dependencies
const express = require('express');
const errorHandler = require('./error-handler');


// Application setup
const app = express();
const router = express.Router();
app.use('/api/v1', router);

// Route setup
require('../route/route-quote')(router);
app.use('/{0,}', (req, res) => errorHandler(new Error('Path Error. Route not found.'), res));

// Server controls
const server = module.exports = {};
server.isOn = false;
server.http = null;

server.start = (port, callback) => {
  if(server.isOn) return callback(new Error('Error: Server running. Cannot start.'));
  server.isOn = true;
  server.http = app.listen(port, callback);
  return server.http;
};

server.stop = (callback) => {
  if(!server.isOn) return callback(new Error('Error: Server stopped. Cannot stop.'));
  server.isOn = false;
  server.close();
};
