'use strict';

let storage = require('../../lib/storage');
let fs = require('fs');

let testData = {quote: 'testdatarun', author: 'test data run', _id: 'testdatafile' };
let testUpdate = {quote: 'testupdaterun', author: 'test data run', _id: 'testdatafile' };
let testWrong = {quote: 'testwrongrun', author: 'test data run', _id: 'invalidid'};
storage.create('quote', testData);

describe('Storage Module', () => {
  describe('#create', () => {
    it('should create a file when handed good data', () => {
      expect(fs.readdirSync(`${__dirname}/../../data/quote`)).toContain('testdatafile.json');
    });
  });

  describe('#update', () => {
    it('should properly update the file', () => {
      return storage.update('quote', testData._id, testUpdate)
        .then(() => storage.fetchOne('quote', testData._id))
        .then(buffer => buffer.toString())
        .then(json => JSON.parse(json))
        .then(quote => expect(quote.quote).toBe('testupdaterun'));
    });

    it('should return a validation error if the id in the file does not match the requested file', () => {
      return storage.update('quote', testData._id, testWrong)
        .catch(err => expect(err).toBeInstanceOf(Error));
    });
  });

  describe('#fetch', () => {
    it('should return an array of quote filenames', () => {
      return storage.fetchAll('quote')
        .then(fnames => expect(Array.isArray(fnames)).toBeTruthy());
    });
  });

  describe('#fetchOne', () => {
    it('should return a JSON representation of a Quote', () => {
      return storage.fetchOne('quote', testData._id)
        .then(buffer => buffer.toString())
        .then(json => JSON.parse(json))
        .then(quote => expect(quote.author).toBe('test data run'));
    });
  });

  describe('#destroy', () => {
    it('should successfully delete a file from the storage directory', () => {
      return storage.destroy('quote', testData._id)
        .then(() => {
          return storage.fetchAll('quote')
            .then(files => {
              expect(files).not.toContain('testdatafile');
            });
        });
    });
  });
});
