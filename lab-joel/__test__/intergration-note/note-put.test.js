'use strict';

const server = require('../../lib/server');
const superagent = require('superagent')
require('jest');

describe('PUT /api/v1/note', function () {
  this.mockNote = {title: 'hello', content: 'hello world'};
  this.newMockNote = {title: 'goodbye', content: 'goodbye world'};
  beforeAll(() => server.start(process.env.PORT, () => console.log(`Listening on ${process.env.PORT}`)));
  afterAll(() => server.stop());

  describe('Valid req/res', () => {
    beforeAll(() => {
      return superagent.post(':4000/api/v1/note')
        .send(this.mockNote)
        .then(res => this.response = res)
        .then(() => this.mockNote._id = this.response.body._id);
    });
    test('should respond with a status of 204', () => {
      return superagent.put(`:4000/api/v1/note/${this.response.body._id}`)
        .send(this.newMockNote)
        .then(res => {
          expect(res.status).toBe(204);
        });
    });

    test('should respond with a body title of goodbye', () => {
      return superagent.get(`:4000/api/v1/note/${this.response.body._id}`)
        .then(res => {
          expect(res.body.title).toBe('goodbye');
        });
    });
  });

  describe('Invalid req/res', () => {
    it('should return true', () => expect(true).toBeTruthy());
  });
});
