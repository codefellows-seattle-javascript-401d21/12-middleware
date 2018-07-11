'use strict';

const uuid = require('uuid/v4');

module.exports = function Note(book, description) {
  return new Promise((resolve, reject) => {
    if(!book || !description) return reject(new Error('Validation Error. Cannot create Note. Book and description required.'));
    this._id = uuid();
    this.book = book;
    this.description = description;

    return resolve(this);
  });
};