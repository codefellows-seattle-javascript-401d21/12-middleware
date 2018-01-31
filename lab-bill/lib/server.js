'use strict';

const express = require('express');
const errorHandler = require('./error-handler');
const cors = require('cors');

const app = express();
const router = express.Router();
app.use('/api/v1', router);
app.use(cors());
require('../route/route-note')(router);

app.use('/*', (req, res) => errorHandler(new Error('Path Error. Route not found.'), res));

const server = module.exports = {};
server.isOn = false;
server.http = null;

server.start = function(port, callback) {
  if(server.isOn) return callback(new Error('Server running. Cannot start server again.'));
  server.isOn = true;
  server.http = app.listen(port, callback);
};

server.stop = function(callback) {
  if(!server.isOn) return callback(new Error('Server not running.'));
  server.isOn = false;
  server.http.close();
};