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
// Exmple of other models
// require('../route/route-category')(router);
app.use('/*', (req, res) => errorHandler(new Error('Path Error. Route not found.'), res));

// Server controls
const server = module.exports = {};
server.isOn = false;

server.start = (port, callback) => {
  if(server.isOn) return callback(new Error('Error: Server running. Cannot start.'));
  server.isOn = true;
  return app.listen(port, callback);
};

server.stop = (callback) => {
  if(!server.isOn) return callback(new Error('Error: Server stopped. Cannot stop.'));
  server.isOn = false;
  return app.close(callback);
};
