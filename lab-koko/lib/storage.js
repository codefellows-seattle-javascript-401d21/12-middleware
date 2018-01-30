'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

// const debug = require('debug')('http:storage');
const storage = module.exports = {};
const basePath = `${__dirname}/../data`;


let writer = (schema, id, json) => fs.writeFileProm(`${basePath}/${schema}/${id}.json`, json);
let reader = (schema, id) => fs.readFileProm(`${basePath}/${schema}/${id}.json`);

storage.create = (schema, itemId, item) => writer(schema, itemId, item);

storage.fetchOne = (schema, itemId) => reader(schema, itemId);

storage.fetchAll = (schema) => fs.readdirProm(`${basePath}/${schema}`);

storage.update = (schema, itemId, item) => writer(schema, itemId, item);

storage.destroy = (schema, itemId) => fs.unlinkProm(`${__dirname}/../data/${schema}/${itemId}.json`);
