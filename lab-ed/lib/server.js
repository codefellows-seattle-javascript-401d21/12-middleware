'use strict'

const express = require('express')
const errorHandler = require('./error-handler')
const app = express()
const router = express.Router()

app.use('/api/v1', router)
require('../route/route-note')(router)
app.use('/*', (req, res) => errorHandler(new Error('route not found'), res))

const server = module.exports = {}
server.isOn = false

server.start = function(port, callback) {
  if(server.isOn) return callback(new Error('server already running'))
  server.isOn = true
  return app.listen(port, callback)
}

server.stop = function(callback) {
  if(!server.isOn) return callback(new Error('can\'t stop a server that isn\'t running'))
  server.isOn = false
  return app.close(callback)
}