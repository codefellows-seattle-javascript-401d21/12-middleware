'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');
require('jest');

describe('PUT /api/v1/note', function() {
  this.mockNote = {name: 'hello', data: 'hello world'};
  this.mockUpdate = {name: 'bill', data: 'kappa'};
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
      return superagent.put(`:4000/api/v1/note/${this.getAll.body[0]}`)
        .send(this.mockUpdate)
        .then(res => this.putRes = res);
    });

    beforeAll(() => {
      return superagent.get(`:4000/api/v1/note/${this.getAll.body[0]}`)
        .then(res => this.getOne = res);
    });

    afterAll(() => {
      return superagent.delete(`:4000/api/v1/note/${this.getAll.body[0]}`);
    });

    it('should respond with a status of 204', () => {
      expect(this.putRes.status).toBe(204);
    });
    it('should keep the structure of the origin object', () => {
      expect(this.getOne.body).toHaveProperty('name');
      expect(this.getOne.body).toHaveProperty('data');
      expect(this.getOne.body).toHaveProperty('_id');
    });
    it('should have the values that we updated', () => {
      expect(this.getOne.body.name).toEqual('bill');
      expect(this.getOne.body.data).toEqual('kappa');
    });
  });

  describe('Invalid req/res', () => {
    it('should return a status 404 on bad path', () => {
      return superagent.put(':4000/api/v1/doesNotExist')
        .send(this.mockUpdate)
        .catch(err => {
          expect(err.status).toBe(404);
          expect(err.response.text).toMatch(/path error/i);
        });
    });
    it('should return a status 400 on an id that does not exist', () => {
      return superagent.put(':4000/api/v1/note/1234')
        .send(this.mockUpdate)
        .catch(err => expect(err.status).toBe(404));
    });
  });
});