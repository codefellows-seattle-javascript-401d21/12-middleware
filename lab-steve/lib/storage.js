'use strict';

const Promise = require('bluebird');
// Promisify fs librarye
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

const storage = module.exports = {};

storage.create = (schema, item) => {
  let json = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${schema}/${item._id}.json`, json)
    .then(() => item);
};

// Read the file for the _id in a Buffer
storage.fetchOne = (schema, itemId) =>
  fs.readFileProm(`${__dirname}/../data/${schema}/${itemId}.json`);

// Read the schema directory for a list of filenames returned as a Buffer
storage.fetchAll = (schema) =>
  fs.readdirProm(`${__dirname}/../data/${schema}`);

storage.update = (schema, itemId, item) => {
  let json = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${schema}/${itemId}.json`, json)
    .then(() => item);
};

storage.destroy = (schema, itemId) => {
  return fs.unlinkProm(`${__dirname}/../data/${schema}/${itemId}.json`)
    .then(() => itemId);
};
