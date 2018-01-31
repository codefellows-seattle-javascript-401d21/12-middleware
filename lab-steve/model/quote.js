'use strict';

const uuid = require('uuid/v4');

module.exports = function Quote(author, quote) {
  return new Promise((resolve, reject) => {
    // Validation
    if (!author && !quote) return reject(new Error('Validation Error: Cannot create Quote - `author` and `quote` required.'));
    if (!author) return reject(new Error('Validation Error: Cannot create Quote. `author` required.'));
    if (!quote) return reject(new Error('Validation Error: Cannot create Quote. `quote` required.'));

    // Make the Quote
    this._id = uuid();
    this.author = author;
    this.quote = quote;

    return resolve(this);
  });
};
