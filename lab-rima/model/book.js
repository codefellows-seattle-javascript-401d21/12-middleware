'use strict';

const uuid = require('uuid/v4');
const debug = require('debug')('http:note-constructor');


module.exports = function(title, author){

  return new Promise((resolve, reject) => {

    if(!title || !author){
      return reject(new Error('Validation Error. Title and author required.'));
    }

    this._id = uuid();
    this.title = title;
    this.author = author;

    debug(`Created a note: Title: ${this.title}, Author: ${this.author}, ID: ${this._id}`);
    return resolve(this);

  });
};
