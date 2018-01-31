'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');
require('jest');

describe('GET /api/v1/note', function() {
  this.mockNote = {name: 'hello', data: 'hello world'};

  beforeAll(() => server.start(process.env.PORT, (err) => console.log(`Listening on ${process.env.PORT}`)));
  afterAll(() => server.stop());

  describe('Valid', () => {
    beforeAll(() => {
      return superagent.post(':4000/api/v1/note')
        .send(this.mockNote)
        .then(res => this.response = res);
    });

    beforeAll(() => {
      return superagent.get(':4000/api/v1/note')
        .then(res => this.getAll = res);
    });

    beforeAll(() => {
      return superagent.get(`:4000/api/v1/note/${this.getAll.body[0]}`)
        .then(res => this.getOne = res);
    });

    afterAll(() => {
      return superagent.delete(`:4000/api/v1/note/${this.getAll.body[0]}`);
    });

    it('fetch ALL should respond with a status of 200', () => {
      expect(this.getAll.status).toBe(200);
    });
    it('fetch ONE should respond with a status of 200', () => {
      expect(this.getOne.status).toBe(200);
    });
    it('fetch ONE should have a response body with name, data and _id', () => {
      expect(this.getOne.body).toHaveProperty('name');
      expect(this.getOne.body).toHaveProperty('data');
      expect(this.getOne.body).toHaveProperty('_id');
    });
    it('fetch ALL should respond with an array of ids', () => {
      expect(typeof this.getAll.body).toEqual('object');
      expect(this.getAll.body[0]).toMatch(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/);
    });
  });

  describe('Invalid req/res', () => {
    it('should return a status 404 on bad directory schema', () => {
      return superagent.get(':4000/api/v1/doesNotExist')
        .catch(err => {
          expect(err.status).toBe(404);
          expect(err.response.text).toMatch(/path error/i);
        });
    });
    it('should return a status 404 on bad id request', () => {
      return superagent.get(':4000/api/v1/note/1234')
        .catch(err => expect(err.status).toBe(404));
    });
  });
});