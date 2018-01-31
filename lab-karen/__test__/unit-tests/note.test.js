'use strict';

const Note = require('../../model/note')
require('jest');

describe('Note module', function () {
  describe('Note constructor', () => {
    let newNote = new Note('A Christmas Carol', 'Scrooge');

    it('should create a promise', () => { expect(newNote).toBeInstanceOf(Promise);
    });
    it('should have a title, content, _id', () => {
      return new Note ('A Christmas Carol', 'Scrooge')
        .then(res => {
          expect(res).toHaveProperty('title');
          expect(res).toHaveProperty('content');
          expect(res).toHaveProperty('_id');
        });
    });
  });
});
