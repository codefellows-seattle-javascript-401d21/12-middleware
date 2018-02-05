'use strict';

const errorHandler = require('../../lib/error-handler');

describe('Error handler module', function() {

  var mockRes = function() {
    this.resStatus = null;
    this.message = null;
    this.status = function(statusNum) {
      this.resStatus = statusNum;
      return this;
    };
    this.send = function(msg) {
      this.msg = msg;
      return this;
    };
  };


  describe('400 validation error', () => {

    test('return a status 400 with validation error', () => {
      let err = new Error('validation eRROR');
      expect(errorHandler(err, new mockRes()).resStatus).toBe(400);
    });

  });

  describe('404 ivalid id', () => {

    test('return a status 404 with invalid id', () => {
      let err = new Error('invalid id');
      expect(errorHandler(err, new mockRes()).resStatus).toBe(404);
    });

  });

  describe('400 path error', () => {

    test('return a status 404 with path error', () => {
      let err = new Error('path error');
      expect(errorHandler(err, new mockRes()).resStatus).toBe(404);
    });

  });

  describe('500 error', () => {

    test('return a status 500 with any other errors', () => {
      let err = new Error('500 Error');
      expect(errorHandler(err, new mockRes()).resStatus).toBe(500);
    });

  });
});
