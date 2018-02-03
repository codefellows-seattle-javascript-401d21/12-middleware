'use strict';

const storage = require('../../lib/storage');
require('jest');

describe('#storage.', function () {
  describe('storage module input/output', () => {
    let test = { name: 'ooga', city: 'booga', _id: '2c9a777c-9b4a-44f6-b92d-e4f8027b25bc'};
    let testUpdate = { name: 'warga', city: 'blarga', _id: '2c9a777c-9b4a-44f6-b92d-e4f8027b25bc'};
    let testJson = JSON.stringify(test);
    let testJsonUpdate = JSON.stringify(testUpdate);
    storage.create('student', test._id, testJson);

    it('should have created a student object, and be able to fetch that object with ID', () => {
      return storage.fetchOne('student', '2c9a777c-9b4a-44f6-b92d-e4f8027b25bc')
        .then(student => {
          student = JSON.parse(student.toString());
          expect(student.name).toEqual('ooga');
          expect(student.city).toEqual('booga');
        });
    });
    it('should fetch all students and return ids in an array', () => {
      return storage.fetchAll('student')
        .then(students => {
          expect(Array.isArray(students)).toBeTruthy();
          expect(students[0]).toMatch(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/);
        });
    });
    it('should update a student object', () => {
      return storage.update('student', test._id, testJsonUpdate)
        .then(() => {
          return storage.fetchOne('student', '2c9a777c-9b4a-44f6-b92d-e4f8027b25bc')
            .then(student => {
              student = JSON.parse(student.toString());
              expect(student.name).toEqual('warga');
              expect(student.city).toEqual('blarga');
            });
        });
    });
    it('should delete a student object', () => {
      return storage.destroy('student', test._id)
        .then(() => {
          return storage.fetchOne('student', '2c9a777c-9b4a-44f6-b92d-e4f8027b25bc')
            .catch(err => {
              expect(err).not.toBeNull();
            });
        });
    });
  });
});