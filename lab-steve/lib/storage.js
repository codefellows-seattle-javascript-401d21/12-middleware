'use strict';

const Promise = require('bluebird');
// Promisify fs library
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

const storage = module.exports = {};

storage.create = (schema, item) =>
  fs.writeFileProm(`${__dirname}/../data/${schema}/${item._id}.json`, JSON.stringify(item))
    .then(() => item);

// Read the file for the _id in a Buffer
storage.fetchOne = (schema, itemId) =>
  fs.readFileProm(`${__dirname}/../data/${schema}/${itemId}.json`);

// Read the schema directory for a list of filenames returned as a Buffer
storage.fetchAll = (schema) =>
  fs.readdirProm(`${__dirname}/../data/${schema}`);

storage.update = (schema, itemId, item) =>
  fs.writeFileProm(`${__dirname}/../data/${schema}/${itemId}.json`, JSON.stringify(item))
    .then(() => item);

storage.destroy = (schema, itemId) =>
  fs.unlinkProm(`${__dirname}/../data/${schema}/${itemId}.json`)
    .then(() => itemId);
