'use strict';

const Student = require('../../model/student');
// const debugger = require('debug')('student.test');
require('jest');

describe('#student.test.js', function () {
  describe('testing new Student instances', function() {

    it('should return a promise object instance', () => {
      return new Student('reginald', 'lemonberry')
        .then(student => { //will pass just student object back
          expect(student).toBeInstanceOf(Object);
        });
    });

    it('should have _id, name, and city properties', () => {
      return new Student('reginald', 'lemonberry')
        .then(student => { //will pass just student object back
          expect(student).toHaveProperty('_id');
          expect(student).toHaveProperty('name');
          expect(student).toHaveProperty('city');
        });
    });

    it('should have property values _id of long ass number string, name of reginald, and city of lemonberry', () => {
      return new Student('reginald', 'lemonberry')
        .then(student => { //will pass just student object back
          expect(student._id).toMatch(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/);
          expect(student.name).toEqual('reginald');
          expect(student.city).toEqual('lemonberry');
        });
    });

    it('should reject an Error if missing an argument', () => {
      return new Student('reginald')
        .catch(err => {
          expect(err).not.toBeNull();
        });
    });
  });
});