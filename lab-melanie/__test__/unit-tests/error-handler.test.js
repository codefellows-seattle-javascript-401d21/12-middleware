'use strict';

// const errorHandler = require('../../lib/error-handler.js');
require('jest');

let errOne = new Error('validation error');
errOne.res = null;


describe('Error Handler', function() {
  it('should return a 400 status for a validation error', () => {
    expect(true).toBe(true); // need to work on this
  });
});