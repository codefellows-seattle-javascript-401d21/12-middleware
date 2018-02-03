'use strict';

const Promise = require('bluebird'); //overwrites default promise
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'}); //promisifies files, gives suffix
const storage = module.exports = {};
// const errorHandler = require('../lib/error-handler');
// const debug = require('debug')('http:storage');

const basePath = `${__dirname}/../data`;

let writer = (schema, id, json) =>
  fs.writeFileProm(`${basePath}/${schema}/${id}.json`, json); //doesnt return anything, so the , json at the end returns the item

let reader = (schema, id) => //optionally id
  fs.readFileProm(`${basePath}/${schema}/${id}.json`); //returns buffer

storage.create = (schema, id, item) => writer(schema, id, item);
storage.fetchOne = (schema, id) => reader(schema, id);
storage.fetchAll = (schema) => fs.readdirProm(`${basePath}/${schema}`);
storage.destroy = (schema, id) => fs.unlinkProm(`${basePath}/${schema}/${id}.json`);
storage.update = (schema, id, item) => writer(schema, id, item);