'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');
require('jest');

describe('#student-put.test.js', function () {
  beforeAll(() => server.start(4004, () => console.log(`listening on 4004`)));
  afterAll(() => server.stop(() => console.log('stopping server')));

  describe('Valid request/respponse', () => {
    beforeAll(() => {
      this.testStudent = { name: 'ooga', city: 'booga' }; //may lift this up into outer describe block so available, more readable even tho testStudent availabe in lower describe block for invalid req/res
      return superagent.post(':4004/api/v1/student')
        .send(this.testStudent)
        .then(res => this.response = res);
    });

    let testPut = {name: 'warga', city: 'blarga'};

    it('should PUT a new student with name and city, respond with 204', () => {
      return superagent.put(`:4004/api/v1/student/${this.response.body._id}`)
        .send(testPut)
        .then(res => {
          expect(res.status).toBe(204);
        });
    });

    it('should GET the updated student with updated parameter values', () => {
      return superagent.get(`:4004/api/v1/student/${this.response.body._id}`)
        // .send(testPut)
        .then(res => {
          expect(res.body.name).toEqual('warga');
          expect(res.body.city).toEqual('blarga');
        });
    });
  });

  describe('Invalid request/response', () => {
    beforeAll(() => {
      this.testStudent = { name: 'ooga', city: 'booga' }; //may lift this up into outer describe block so available, more readable even tho testStudent availabe in lower describe block for invalid req/res
      return superagent.post(':4004/api/v1/student')
        .send(this.testStudent)
        .then(res => this.response = res);
    });

    it('should return a status 404 on bad path', () => {
      return superagent.put(`:4004/api/v1/student/DNE`)
        // .send(testPut)
        .catch(err => {
          expect(err.status).toBe(404);
        });
    });
    it('should return a status 400 on bad request body', () => {
      return superagent.put(`:4004/api/v1/student/${this.response.body._id}`)
        .send({})
        .catch(err => {
          expect(err.status).toBe(400);
        });
    });
  });
});