'use strict';

const debug = require('debug')('http:error-handler');

module.exports = function(err, res) {
  debug('#error-handler start');
  let msg = err.message.toLowerCase();

  switch(true) {
  case msg.includes('validation error'): return res.status(400).send(`${err.name}: ${err.message}`);
  case msg.includes('enoent'): return res.status(404).send(`${err.name}: ${err.message}`);
  case msg.includes('path error'): return res.status(404).send(`${err.name}: ${err.message}`);
  default: return res.status(500).send(`${err.name}: ${err.message}`);
  }
};