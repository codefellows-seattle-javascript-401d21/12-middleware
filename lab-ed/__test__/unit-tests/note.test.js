const Note = require('../../model/note')

describe('Note Data Structure Module', function () {
  beforeEach(() => this.note = new Note('foo', 'bar'))

  describe('default properties', () => {
    it('should create a new instance of a note', () => {
      expect(this.note).toBeInstanceOf(Note)
    })
  })
})