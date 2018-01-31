'use strict';

const Note = require('../../model/note');
require('jest');

let testNote;
new Note('new test note title', 'new test note content')
  .then(genNote => testNote = genNote);

describe('Note Unit Tests', () => {
  describe('Valid input', () => {
    it('Should return a note object', () => {
      expect(testNote).toBeInstanceOf(Note);
    });
    it('Should return an object with note properties', () => {
      expect(testNote).toHaveProperty('title');
      expect(testNote).toHaveProperty('content');
      expect(testNote).toHaveProperty('_id');
    });
    it('The object returned should have the generated testNote properties', () => {
      expect(testNote.title).toBe('new test note title');
      expect(testNote.content).toBe('new test note content');
    });
  });
  describe('Invalid input', () => {
    it('should return an error with no inputs', () => {
      new Note()
        .catch(err => expect(err).toBeInstanceOf(Error));
    });
  });
});