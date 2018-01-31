'use strict';

module.exports = function(err, response) {
    let message = err.message.toLowerCase();

    switch(true) {
    case message.includes('validation error'): return response.status(400).send(`${err.name}: ${err.message}`);
    case message.includes('enoent'): return response.status(404).send(`${err.name}: ${err.message}`);
    default: return response.status(500).send(`${err.name}: ${err.message}`);
    }
};