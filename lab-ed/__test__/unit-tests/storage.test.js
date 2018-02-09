'use strict'

let storage = require('../../lib/storage')

let newNote = {title: 'new', content: 'note', _id:  'abababab-abab-abab-abab-abababababab'}
let update = {title: 'update', content: 'new note', _id:  'abababab-abab-abab-abab-abababababab'}

describe('Storage Module', function() {
  describe('#create', () => {
    it('should create a note object', () => {
      return storage.create('note', newNote)
        .then(note => expect(note).toBeInstanceOf(Object))
    })
  })
  describe('#fetchOne', () => {
    it('should return a note object', () => {
      return storage.fetchOne('note', newNote._id)
        .then(note => {
          note = JSON.parse(note.toString())
          expect(note.content).toBe('note')
        })
    })
  })
  describe('#fetchAll', () => {
    it('should return array of ids', () => {
      return storage.fetchAll('note')
        .then(ids => expect(Array.isArray(ids)).toBeTruthy())
    })
  })
  describe('#update', () => {
    it('should return an updated object', () => {
      return storage.update('note', newNote._id, update)
        .then(note => expect(note.title).toBe('update'))
    })
  })
})
