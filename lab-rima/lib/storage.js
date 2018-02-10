'use strict';

//const debug = require('debug')('http:storage');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const storage = module.exports = {};


storage.fetchOne = (schema, itemId) => {
  return fs.readFileProm(`${__dirname}/../data/${schema}/${itemId}.json`)
    .then((item) => item)
    .catch(err => err);
};

storage.fetchAll = (schema) => {
  var filesArr = [];
  return fs.readdirProm(`${__dirname}/../data/${schema}`)
    .then((files) => {
      files.forEach(function(filename){
        let x = fs.readFileSync(`${__dirname}/../data/${schema}/${filename}`);
        filesArr.push(JSON.parse(x));
      });
    })
    .then(() => filesArr)
    .catch(err => err);
};

storage.create = (schema, item) => {
  let itemJson = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${schema}/${item._id}.json`, itemJson)
    .then(() => item)
    .catch(err => err);
};

storage.update = (schema, itemId, newData) => {
  let itemJson = JSON.stringify(newData);
  return fs.writeFileProm(`${__dirname}/../data/${schema}/${itemId}.json`, itemJson)
    .catch(err => err);
};

storage.deleteOne = (schema, itemId) => {
  return fs.unlinkProm(`${__dirname}/../data/${schema}/${itemId}.json`)
    .catch(err => {throw err;});
};

storage.deleteAll = (schema) => {
  return fs.readdirProm(`${__dirname}/../data/${schema}`)
    .then((files) => {
      files.forEach(function(filename){
        fs.unlinkProm(`${__dirname}/../data/${schema}/${filename}`);
      });
    })
    .catch(err => err);
};
