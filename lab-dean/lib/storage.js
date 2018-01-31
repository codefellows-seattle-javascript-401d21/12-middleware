'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

const storage = module.exports = {};

storage.create = (schema, item) => {
  let json = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${schema}/${item._id}.json`, json)
    .then(() => item);
};

storage.fetchOne = (schema, id) => {
  return fs.readFileProm(`${__dirname}/../data/${schema}/${id}.json`);
};

storage.fetchAll = (schema) => {
  return fs.readdirProm(`${__dirname}/../data/${schema}`)
    .then(list => list.map(file => file.split('.')[0]));
};

storage.update = (schema, id, item) => {
  if(item._id !== id) return Promise.reject(new Error('Validation error: This item does not exist.'));
  let json = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${schema}/${item._id}.json`, json)
    .then(() => item);
};

storage.delete = (schema, id) => {
  return fs.unlinkProm(`${__dirname}/../data/${schema}/${id}.json`);
};