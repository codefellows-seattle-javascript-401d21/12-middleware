'use strict';

module.exports = function(err, res) {
  let msg = err.message;

  switch(true) {
  case msg.includes('Validation Error'): 
    return res.status(400).send(`${err.name}: ${err.message}`);
  case msg.includes('ENONET'): 
    return res.status(404).send(`${err.name}: ${err.message}`);
  case msg.includes('Route not found'):
    return res.status(404).send(`${err.name}: ${err.message}`);
  default: 
    return res.status(500).send(`${err.name}: ${err.message}`);
  }
};