'use strict'

const Note = require('../../model/note')

require('jest')



describe('unit test - note model', function () {

  it('take 3 arguments', () => {
    expect(new Note('test arg1','test arg2','test arg3')).toBeInstanceOf(Promise);

  });




})