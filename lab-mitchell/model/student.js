'use strict';

const uuid = require('uuid/v4');

module.exports = function(name, city) {
  return new Promise((resolve, reject) => {
    if(!name || !city) return reject(new Error('Validation Error. Cannot create Student. Name and City required.'));
    this._id = uuid();
    this.name = name;
    this.city = city;

    return resolve(this); //resolves new object, meaning .then() will have access to the object created
    //so when creating a new student instance we can use it's information in follow .then's
    //
  });
};