'use strict';

const server = require('../../lib/server.js');
const superagent = require('superagent');
require('jest');

describe('PUT', function() {
  this.mockOne = {title: 'hello', content: 'hello world'};
  this.mockTwo = {title: 'put', content: 'yo'};
  beforeAll(() => server.start(process.env.PORT, () => console.log(`Listening on ${process.env.PORT}`)));
  afterAll(() => server.stop());

  describe('Valid req/res', () => {
  
    beforeAll(() => {
      return superagent.post(':4000/api/v1/note')
        .send(this.mockOne)
        .then(res => {
          this.resOne = res;
        });
    });
    beforeAll(() => {
      return superagent.put(`:4000/api/v1/note/${this.resOne.body._id}`)
        .send(this.mockTwo)
        .then(res => this.putOne = res);
    });
    it('should return a status code 204 when complete', () => {
      expect(this.putOne.status).toBe(204);
    });
    it('should have a new title', () => {
      expect(this.putOne.title).not.toBe('hello');
    });
    it('should have the same id', () => {
      expect(this.resOne._id).toBe(this.putOne._id);
    });
  });

  describe('Invalid req/res', () => {
    it('should return a status code 404 without an item', () => {
      return superagent.put(':4000/api/v1/note')
        .send()
        .catch(err => {
          // console.log(err);
          expect(err.status).toBe(404);
        });
    });
    it('should return a 404 given an incorrect path', () => {
      return superagent.get(':4000/api/v1/not')
        .send({title: '', content: ''})
        .catch(err => {
          expect(err.status).toBe(404);
        });
    });
  });
});