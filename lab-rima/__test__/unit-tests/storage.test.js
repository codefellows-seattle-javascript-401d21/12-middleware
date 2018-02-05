'use strict';

const db = require('../../lib/storage');
const server = require('../../lib/server');
const Book = require('../../model/book');


describe('Storage module', function () {

  beforeAll(() => server.start(8888, () => {console.log('Listening on 8888');}));
  afterAll(() => server.stop());
  afterAll(() => db.deleteAll('book'));

  describe('Create method', function () {
  
    describe('Valid input', function () {

      test('should actually save a new data in storage', () => {
        let b1;
        new Book('testT2', 'testA2')
          .then(book => {
            b1 = book;
            db.create('book', book);})
          .then(book => db.fetchOne('book', b1._id))
          .then((item) => {
            item = JSON.parse(item.toString())
            expect(item.title).toEqual(b1.title);
            expect(item.author).toEqual(b1.author);
            expect(item._id).toEqual(b1._id);});
      });
    });
  });

  describe('Get method', function() {

    describe('Valid input', function() {

      test('should get one book by id', () => {
        let b1;
        new Book('testT3', 'testA3')
          .then(book => db.create('book', book))
          .then(book => db.fetchOne('book', book._id))
          .then(book => {
            b1 = JSON.parse(book.toString());
            expect(item.title).toEqual(b1.title);
            expect(item.author).toEqual(b1.author);
            expect(item._id).toEqual(b1._id);})
      });

      test('should get all books when no id passed', () => {
        let b1, b2, b3;
        let a1 = new Book('testT4', 'testA4')
          .then(book => {
            b1 = book;
            db.create('book', book);});
        let a2 = new Book('testT5', 'testA5')
          .then(book => {
            b2 = book;
            db.create('book', book);});
        let a3 = new Book('testT6', 'testA6')
          .then(book => {
            b3 = book;
            db.create('book', book);});
        Promise.all([a1, a2, a3])
          .then(() => db.fetchAll('book'))
          .then((items) => {
            expect(items).toContainEqual(b1);
            expect(items).toContainEqual(b2);
            expect(items).toContainEqual(b3);
          });
      });
    });
  });

  describe('Update method', () => {

    describe('Valid input', () => {

      test('should update a data in database', () => {
        new Book('testT7', 'testA7')
          .then(book => db.update('book', book._id, {title: 'update title', author: 'update author'}))
          .then(book => db.fetchOne('book', book._id))
          .then((item) => {
            item = JSON.parse(item.toString());
            expect(item.title).toEqual('update title');
            expect(item.author).toEqual('update author');
          });
      });
    });
  });

  describe('Delete method', () => {

    describe('Valid input', () => {

      test('should delete a data from database', () => {
        let b1;
        new Book('testT8', 'testA8')
          .then(book => db.create('book', book))
          .then(book => {
            b1 = JSON.parse(book.toString());
            db.deleteOne('book', b1._id);})
          .then(() => db.fetchOne('book', b1._id))
          .catch(err => err)
      });

    });
  });

});
