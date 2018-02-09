'use strict'

let storage = require('../../lib/storage')

describe('Storage Module', function() {
  describe('#Create new note', () => {
    it('should create a note object', () => {
      return storage.create('note', {title: 'hello', content: 'world', _id:  'f35cbd73-a94b-4e06-99f6-622d3eb7a9c5'})
        .then(note => expect(note).toBeInstanceOf(Object))
    })
  })
  describe('#FetchOne note', () => {
    it('should return a note object', () => {
      return storage.fetchOne('note', 'f35cbd73-a94b-4e06-99f6-622d3eb7a9c5')
        .then(note => {
          note = JSON.parse(note.toString())
          expect(note.content).toBe('world')
        })
    })
  })
  describe('#FetchAll notes', () => {
    it('should return array of ids', () => {
      return storage.fetchAll('note')
        .then(ids => expect(Array.isArray(ids)).toBeTruthy())
    })
  })
  describe('#Update title', () => {
    it('should return an updated object', () => {
      return storage.update('note', 'f35cbd73-a94b-4e06-99f6-622d3eb7a9c5', {title: 'foo', content: 'bar', _id:  'ff284972-05bb-4d31-a4df-b22fc2302572'})
        .then(note => expect(note.title).toBe('foo'))
    })
  })
})
