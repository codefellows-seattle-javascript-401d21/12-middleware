'use strict'

if(process.env.NODE_ENV !== 'production') require('dotenv').config()

const server = require('./lib/server')
server.start(process.env.PORT, () => console.log(`listening on ${process.env.PORT}`))