'use strict';

const Note = require('../../model/note');
require('jest');

let test;
new Note('hello', 'world')
  .then(note => test = note);

describe('testing dummy', function () {
  it('Should return a valid note object when provided valid inputs', () => {
    expect(test).toBeInstanceOf(Note);
  });
  it('should post a new note with title, content, and _id', () => {
    expect(test).toHaveProperty('title');
    expect(test).toHaveProperty('content');
    expect(test).toHaveProperty('_id');
  });
  it('should respond with a title of "hello" and content of "world"', () => {
    expect(test.title).toMatch(/hello/);
    expect(test.content).toMatch(/world/);
  });
  it('should throw an error if not provided with valid input', () => {
    new Note()
      .catch(err => {
        expect(err).toContain(/Title and Content required/);
      });
  });
});