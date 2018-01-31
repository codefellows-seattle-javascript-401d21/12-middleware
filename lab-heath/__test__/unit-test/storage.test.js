'use strict';


let storage = require('../../lib/storage');
let fs = require('fs');
require('jest');


let test = { title: 'hello', content: 'world', _id: 1234 };
let test1 = { title: 'big', content: 'star', _id: 4321 };

describe('stroage module', function () {
  describe('get one note', function () {
    storage.create('note', test);
    describe('create a new note', function () {
      it('should create a file and read the note folder to see if its there.', () => {
        expect(fs.readdirSync(`${__dirname}/../../data/Note`)).toContain('1234.json');
      });
    });
  });

  describe('get one note', function () {
    it('Should return a valid note object when provided valid inputs', () => {
      return storage.fetchOne('note', test._id)
        .then(data => {
          data = JSON.parse(data.toString());
          expect(data.title).toBe('hello');
        });
    });
  });

  describe('get all note', function () {
    storage.create('note', test1);
    it('should return a array of ids', () => {
      return storage.fetchAll('note')
        .then(data => {
          expect(Array.isArray(data)).toBe(true);
        });
    });
  });

  describe('to update a note', function () {
    storage.create('note', test);
    it('Should properly update the file given new information', () => {
      let fixed = JSON.stringify(test1);
      storage.update('note', test._id, fixed);
      storage.fetchOne('note', test._id)
        .then(data => {
          data = JSON.parse(data.toString());
          expect(data.title).toBe('big');
        });
    });
  });

  describe('Delete a note', function () {
    storage.create('note', test);
    it('it should delete a note with the passed id in', () => {
      return storage.destroy('note', test._id)
        .then(() => {
          expect(test).not.toContain('hello');
        });
    });
  });
});
