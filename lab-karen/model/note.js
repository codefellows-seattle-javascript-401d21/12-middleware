'use strict';

const uuid = require('uuid/v4');
const debug = require('debug')('http:note');

module.exports = function Note(title, content) {
  debug('note');
  return new Promise((resolve, reject) => {
    if(!title || !content) return reject(new Error('Validation Error. Cannot create Note. Title and Content required.'));
    this._id = uuid();
    this.title = title;
    this.content = content;

    return resolve(this);
  });
};
