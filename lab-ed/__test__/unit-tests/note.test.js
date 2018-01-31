'use strict'

const Note = require('../../model/note')
require('jest')

describe('Note Data Structure Module', function () {
  let newNote
  new Note('foo', 'bar')
    .then(note => newNote = note)

  describe('default properties', () => {
    it('should create a new instance of a note', () => {
      expect(newNote).toBeInstanceOf(Note)
    })
  })
  it('should create a new title of foo', () => {
    expect(newNote.title).toEqual('foo')
  })
  it('should create new content of bar', () => {
    expect(newNote.content).toEqual('bar')
  })
})