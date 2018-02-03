'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');
const errorHandler = require('../../lib/error-handler');
require('jest');

describe('#student-delete.test.js', function () {
  beforeAll(() => server.start(4001, () => console.log(`listening on 4001`)));
  afterAll(() => server.stop(() => console.log('stopping server')));

  describe('Valid request/response', () => {
    beforeAll(() => {
      this.testStudent = { name: 'ooga', city: 'booga' }; //may lift this up into outer describe block so available, more readable even tho testStudent availabe in lower describe block for invalid req/res
      return superagent.post(':4001/api/v1/student')
        .send(this.testStudent)
        .then(res => this.response = res)
        .catch(err => errorHandler(err));
    });

    it('should DELETE a student with ID, respond with status 204', () => {
      return superagent.delete(`:4001/api/v1/student/${this.response.body._id}`)
        .then(res => this.response = res)
        .then(res => {
          expect(res.status).toBe(204);
        })
        .catch(err => errorHandler(err));
    });
  });

  describe('Invalid request/response', () => {
    beforeAll(() => {
      this.testStudent = { name: 'ooga', city: 'booga' }; //may lift this up into outer describe block so available, more readable even tho testStudent availabe in lower describe block for invalid req/res
      return superagent.post(':4001/api/v1/student')
        .send(this.testStudent)
        .then(res => this.response = res)
        .catch(err => errorHandler(err));
    });

    it('should fail to DELETE a student with malformed ID/path, respond with status 404', () => {
      return superagent.delete(`:4001/api/v1/student/2767216481276`)
        .then(res => this.response = res)
        .catch(err => {
          // errorHandler(err);
          expect(err.status).toBe(404);
        });
    });
    it('should fail to DELETE a student with malformed ID/path, respond with error message Not Found', () => {
      return superagent.delete(`:4001/api/v1/student/2767216481276`)
        .then(res => this.response = res)
        .catch(err => {
          // errorHandler(err);
          expect(err.message).toEqual('Not Found');
        });
    });
  });
});