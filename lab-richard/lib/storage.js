'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const debug = require('debug')('http:storage');

const storage = module.exports = {};
const basePath = `${__dirname}/../data`;


let writer = (schema, path, itemId, json) => fs.writeFileProm(`${basePath}/${schema}/${itemId}.json`, json);
let reader = (schema, path, itemId) => fs.readFileProm(`${basePath}/${schema}/${itemId}.json`);

storage.create = (schema, id, item) => writer(schema, id, item);
debug('#storage.create Create');

storage.fetchOne = (schema, itemId) => reader(`${basePath}/${schema}/${itemId}.json`);
debug('#storage.fetchOne Just one');

storage.fetchAll = (schema) => fs.readdirProm(`${basePath}/${schema}`);
debug('#storage.fetchAll ALL');

storage.update = (schema, itemId, item) => fs.writer(`${basePath}/${schema}/${itemId}.json`, item);
debug('#storage.update Update');

storage.delete = (schema, itemId) => fs.unlinkProm(`${basePath}/${schema}/${itemId}.json`);
debug('#storage.delete Seek and Destroy');