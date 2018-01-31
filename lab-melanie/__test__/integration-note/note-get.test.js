'use strict';

const server = require('../../lib/server.js');
const superagent = require('superagent');
require('jest');

describe('GET', function() {
  this.mockOne = {title: 'hello', content: 'hello world'};
  this.mockTwo = {title: 'two', content: 'hello again'};
  beforeAll(() => server.start(process.env.PORT, () => console.log(`Listening on ${process.env.PORT}`)));
  afterAll(() => server.stop());

  describe('Valid req/res', () => {
    beforeAll(() => {
      return superagent.post(':4000/api/v1/note')
        .send(this.mockOne)
        .then(res => {
          this.resOne = res;
          return superagent.post(':4000/api/v1/note')
            .send(this.mockTwo)
            .then(res => this.resTwo = res);
        });
    });

    beforeAll(() => {
      return superagent.get(':4000/api/v1/note')
        .then(res => this.getOne = res);
    });
    
    it('should return an array of ids', () => {
      this.getOne.body.map(id => {
        expect(id).toMatch(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/);
      });
    });
    it('should return a status code 200', () => {
      expect(this.getOne.status).toBe(200);
    });
    it('should contain the two ids of records posted', () => {
      expect(this.getOne.body).toContain(this.resOne.body._id);
      expect(this.getOne.body).toContain(this.resTwo.body._id);
    });
  });

  describe('Invalid req/res', () => {
    it('should return a status code 400 without schema', () => {
      return superagent.get(':4000/api/v1/note')
        .send()
        .catch(err => {
          expect(err.status).toBe(404);
        });
    });
    it('should return a 404 given an incorrect path', () => {
      return superagent.get(':4000/api/v1/doesnotexist')
        .send({title: '', content: ''})
        .catch(err => {
          expect(err.status).toBe(404);
        });
    });
  });
});