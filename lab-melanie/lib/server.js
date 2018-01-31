'use strict';

// Application dependencies
const express = require('express');
const cors = require('cors');
const errorHandler = require('./error-handler.js');

// Application Setup
const app = express();
const router = express.Router();
app.use('/api/v1', router);
app.use(cors());

// Route Setup
require('../route/route-note.js')(router);
app.use('/{0,}', (req, res) => errorHandler(new Error('Path Error. Route not found'), res));

// Server Controls
const server = module.exports = {};
server.isOn = false;
server.http = null;

server.start = function(port, callback) {
  if(server.isOn) return callback(new Error('Server is already running'));
  server.isOn = true;
  server.http = app.listen(port, callback);
};

server.stop = function(callback) {
  if(!server.isOn) return callback(new Error('Server not running'));
  server.isOn = false;
  server.http.close();
};