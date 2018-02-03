'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');
require('jest');

describe('DELETE /api/v1/note', function() {
  this.mockNote = {title: 'hello', content: 'hello world'};

  beforeAll(() => server.start(process.env.PORT, (err) => console.log(`Listening on ${process.env.PORT}`)));
  afterAll(() => server.stop());

  describe('Valid req/res', () => {
    beforeAll(() => {
      return superagent.post(':4000/api/v1/note')
        .send(this.mockNote)
        .then(res => this.response = res);
    });        

    it('Should respond with a status 200', () => {
      return superagent.del(`:4000/api/v1/note/${this.response.body._id}`)
        .then(res => {
          expect(res.status).toBe(204);
        });
    });
  });

  describe('Invalid req/res', () => {
    it('Should respond with a status 404 if file doesnt exist', () => {
      return superagent.del(`:4000/api/v1/note/badpath`)
        .catch(err => {
          expect(err.status).toBe(404);
        });
    });
  });
});