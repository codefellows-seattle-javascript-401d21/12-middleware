'use strict';

const Book = require('../../model/book');


describe('Book module', function () {

  describe('Valid input', () => {

    test('Create a book model', () => {
      new Book('Title', 'Author')
        .then(res => expect(res.title).toBe('Title'));
    });

  });

  describe('Invalid input', () => {

    test('throws an error if empty string for title', () => {
      new Book('', 'Author')
        .catch(err => expect(err.message).toBe('Validation Error. Title and author required.'));
    });

    test('throws an error if no author passed', () => {
      new Book('Title')
        .catch(err => expect(err.message).toBe('Validation Error. Title and author required.'));
    });

  });

});
