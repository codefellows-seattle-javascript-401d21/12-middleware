'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const debug = require('debug')('http:storage');

const storage = module.exports = {};

storage.create = (schema, item) => {
  let json = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${schema}/${item._id}.json`, json)
    .then(() => item);
};

storage.fetchOne = (schema, itemId) => {
  return fs.readFileProm(`${__dirname}/../data/${schema}/${itemId}.json`);
};

storage.fetchAll = (schema) => {
  return fs.readdirProm(`${__dirname}/../data/${schema}`)
    .then(dir => dir.map(file => file.split('.')[0]));
};

storage.update = (schema, itemID, item) => {
  if (item._id !== itemID) return Promise.reject(new Error('Validation Error: Cannot update file with unmatched ID'));
  let json = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${schema}/${itemID}.json`, json)
    .then(() => item);
};


storage.destroy = (schema, itemID) => {
  return fs.unlinkProm(`${__dirname}/../data/${schema}/${itemID}.json`);
};

