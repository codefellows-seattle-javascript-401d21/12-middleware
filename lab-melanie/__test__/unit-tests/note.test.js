'use strict';

const Note = require('../../model/note.js');
require('jest');

describe('Note Module', function() {
  describe('Note constructor', () => {
    let newNote = new Note('new', 'note');
    it('should create a promise', () => {
      expect(newNote).toBeInstanceOf(Promise);
    });
    it('should have a title property', () => {
      return new Note('next', 'note')
        .then(res => {
          expect(res).toHaveProperty('title');
        }); 
    });
    it('should assign a unique id property', () => {
      return new Note('three', 'note')
        .then(res => {
          expect(res._id).toMatch(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/);
        });
    });
  });
});