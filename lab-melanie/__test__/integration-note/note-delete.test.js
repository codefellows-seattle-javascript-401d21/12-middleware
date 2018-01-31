'use strict';

const server = require('../../lib/server.js');
const superagent = require('superagent');
require('jest');

describe('DELETE', function() {
  this.mockNote = {title: 'hello', content: 'hello world'};
  beforeAll(() => server.start(process.env.PORT, () => console.log(`Listening on ${process.env.PORT}`)));
  afterAll(() => server.stop());

  describe('Valid req/res', () => {
    beforeAll(() => {
      return superagent.post(':4000/api/v1/note')
        .send(this.mockNote)
        .then(res => {
          this.response = res;
        });
    });
    beforeAll(() => {
      return superagent.delete(`:4000/api/v1/note/${this.response.body._id}`)
        .then(res => {
          this.delStat = res.status;
        });
    });
    
    it('should return a status code 204', () => {
      expect(this.delStat).toBe(204);
    });
    it('should no longer have a title', () => {
      expect(this.response.title).toBe(undefined);
    });
    it('should no longer have an id', () => {
      expect(this.response._id).toBe(undefined);
    });
  });

  describe('Invalid req/res', () => {
    it('should return a status code 404 with a bad schema', () => {
      return superagent.delete(':4000/api/v1/doesnotexist')
        .send()
        .catch(err => {
          expect(err.status).toBe(404);
        });
    });
    it('should return a status code 404 with a bad request', () => {
      return superagent.delete(':4000/api/v1/note')
        .send({title: '', content: ''})
        .catch(err => {
          expect(err.status).toBe(404);
        });
    });
  });
});