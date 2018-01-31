'use strict';

const Promise = require('bluebird');
// Promisify fs library
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const debug = require('debug')('http:storage');

const storage = module.exports = {};

storage.create = (schema, item) => {
  debug(`storage.create quote: "${item.quote}" author: "${item.author}"`);
  return fs.writeFileProm(`${__dirname}/../data/${schema}/${item._id}.json`, JSON.stringify(item))
    .then(() => item);
};

// Read the file for the _id in a Buffer
storage.fetchOne = (schema, itemId) => {
  debug(`storage.fetchOne: schema: "${schema}" itemId: "${itemId}"`);
  return fs.readFileProm(`${__dirname}/../data/${schema}/${itemId}.json`);
};

// Read the schema directory for a list of filenames returned as a Buffer
storage.fetchAll = (schema) => {
  debug(`storage.fetchAll: schema: "${schema}"`);
  return fs.readdirProm(`${__dirname}/../data/${schema}`);
};

storage.update = (schema, itemId, item) => {
  debug(`storage.update: schema: "${schema}", itemId: "${itemId}", item.quote: "${item.quote}", item.author: "${item.author}"`);
  return fs.writeFileProm(`${__dirname}/../data/${schema}/${itemId}.json`, JSON.stringify(item))
    .then(() => item);
};

storage.destroy = (schema, itemId) => {
  debug(`storage.destroy: schema: ${schema}, itemId: ${itemId}`);
  fs.unlinkProm(`${__dirname}/../data/${schema}/${itemId}.json`)
    .then(() => itemId);
};
