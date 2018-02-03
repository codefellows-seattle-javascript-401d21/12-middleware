'use strict';

//application dependencies
const express = require('express');
const cors = require('cors');
const errorHandler = require('./error-handler');

//application setup
const app = express();
const router = express.Router(); //don't need new keyword, effectively same as thing thing
//can also write as:
// app.use('api/v1/student, router_student)
app.use('/api/v1/student', router); //using /api/v1/student means we have to change routes to be '/:id' or '/' instead
//tells express 2 things
// all routes should have a base of /api/v1, and more specifically all routes mounterd to this router
// app.use essentially way for us to say 'hey express/app, i want you to use this middleware.' the router is a piece of middleware

app.use(cors());

// app.use(bodyParser); //somewhat incorrect way, says THIS IS GLOBAL MIDDLWARE, ATTACH TO EVERY ROUTE IN APPLICATION

//route setup
//can also write as:
require('../route/route-student')(router); //this that inject thing, to make sure we using the same instance of router for everything
//it mounts any routes we set up in those modules to that router, and then part of the application b/c we've mounter the router to the app
app.use('/{0,}', (req, res) => { //catchall for anything, what you're asking for doesn't exist in any of my route files so i create an error path err 404 and hand that over to error handler
  //app.use may need to be '/{0,}'
  let err = new Error('Path Error. Route not found');
  errorHandler(err, res); //this is the one-off case in the drawing in notes for today
}); 

//one line version
// app.use('/*', (req, res) => errorHandler(new Error('Path ERror. ROute not found.', res)));

//server controls
const server = module.exports = {};
server.isOn = false; //so if PORT already being used, allows us to start up and validate that its not running already
server.http = null;
//if it is running, going to catch that error and do something. layer of testability and dev-defined layer of handling someone trying to start server if already running

server.start = function(port, callback) { //can cache return value of server.start if we need it somewhere
  if(server.isOn) return callback(new Error('Server running, cannot start server'));
  server.isOn = true;
  server.http = app.listen(port, callback);

  //below line wasn't working properly, wasnt allowing the server to actually close by just returning app
  // return app.listen(port, callback); //sets up server listening on a port, and back in entry point, the callback in index.js will be returned and executed there
};

server.stop = function(callback) { //callback whatever you want it to be
  if(!server.isOn) return callback(new Error('Server not running'));
  server.isOn = false;
  server.http.close();
  console.log('server closed');
  // return app.close(callback);
};