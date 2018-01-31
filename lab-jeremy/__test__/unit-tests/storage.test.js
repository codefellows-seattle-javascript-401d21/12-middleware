'use strict';

const storage = require('../../lib/storage');
require('jest');

let testItem = {title: 'unit test title', content: 'unit test content', _id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'};

describe('Storage Unit Tests', function() {
  describe('Valid tests', function() {
    describe('Storage methods tests', function() {
      it('should return the note object', () => {
        return storage.create('note', testItem)
          .then(file => expect(file).toHaveProperty('title'));
      });
      it('should return the note object', () => {
        return storage.fetchOne('note', testItem._id)
          .then(file => {
            file = JSON.parse(file.toString());
            expect(file.content).toBe('unit test content');
          });
      });
      it('should return an array of item ids', () => {
        return storage.fetchAll('note')
          .then(filePaths => expect(Array.isArray(filePaths)).toBeTruthy());
      });
      it('should not return the file within the list of ids', () => {
        return storage.destroy('note', testItem._id)
          .then(() => {
            return storage.fetchAll('note')
              .then(files => {
                expect(files).not.toContain(testItem._id);
              });
          });
      });
    });
  });
//invalid tests handled in the router
});