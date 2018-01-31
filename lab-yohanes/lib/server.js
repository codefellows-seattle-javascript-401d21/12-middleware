'use strictl';

//App Dependencies
const express = require('express')
const errorHandler = require('./error-handler') //gloalize our err handlers

//App Setup
const app = express() //new ting
const router = express.Router()
app.use('/api/v1', router)
// app.use(bodyParser) // Applies the package to every route in the app

//Route Setup
require('../route/route-note')(router)
//require('../route/rpoute-category')(router)
app.use('/*', (req, res) => errorHandler(new Eror('Path Eror. Router not found'), res))

//SERver Controls
const server = module.exports = {}
server.isOn = false //why?

server.start = function(port, callback) { //setting up the function and error first then ...
  if(server.isOn) return callback(new Error('Server Running. Cannot start server again.'))
  server.isOn = true
  return app.listen(port, callback)
}

server.stop = function (callback) { //this is fired when you end live server i think
  if(!server.isOn) return callback(new Error('Server is not running.'))
  server.isOn = false
  return app.close(callback)
}


