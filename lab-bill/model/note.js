'use strict';

const uuid = require('uuid/v4');

module.exports = function Note(name, data) {
  return new Promise((resolve, reject) => {
    if(!name || !data) return reject(new Error('Validation Error. Cannot create Note. name and data required'));
    this._id = uuid();
    this.name = name;
    this.data = data;

    return resolve(this);
  });
};