'use strict';

const debug = require('debug')('http:storage');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

const storage = module.exports = {};

storage.create = (schema, item) => {
  debug('storage.create');
  let json = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${schema}/${item._id}.json`, json)
    .then(()=> item);
};

storage.fetchOne = (schema, itemId) => fs.readFileProm(`${__dirname}/../data/${schema}/${itemId}.json`);


storage.fetchAll = (schema) => fs.readdirProm(`${__dirname}/../data/${schema}`);

storage.update = (schema, itemId, item) => 
  fs.writeFileProm(`${__dirname}/../data/${schema}/${itemId}.json`, item);


storage.destroy = (schema, itemId) => fs.unlinkProm(`${__dirname}/../data/${schema}/${itemId}.json`);
