'use strict';

//Aplication dependancies
const express = require('express');
const errorHandler = require('./error-handler');
const cors = require('cors');
const debug = require('debug')('http:server');

//Application Set Up
const app = express();
const router_notes = express.Router();
app.use('/api/v1/note', router_notes);
app.use(cors());

//Route set up
require('../route/route-note')(router_notes);
app.use('/{0,}', (req, res) => errorHandler(new Error ('Path Error. Route not found.'), res));

//Server controls
const server = module.exports = {};
debug('server');
server.isOn = false;
server.http = null;

server.start = function (port, callback) {
  if(server.isOn) return callback(new Error ('Server running.  Cannot start again.'));
  server.isOn = true;
  console.log(port);
  server.http = app.listen(port, callback); //instance of Node server object
};

server.stop = function(callback) {
  if(!server.isOn) return callback(new Error ('Server not running.  Cannot stop.'));
  server.isOn = false;
  server.http.close();
};
