'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');
require('jest');

describe('DELETE /api/v1/note', function () {
  beforeAll(() => server.start(process.env.PORT, (err) => console.log(`Listening on ${process.env.PORT}`)));
  afterAll(() => server.stop());

  this.mockNote = {title: 'hello', content: 'hello world'};
  let temp;

  beforeAll(() => {
    return superagent.post(':4000/api/v1/note/')
      .send(this.mockNote)
      .then(res => {
        temp = res.body;
        this.response = res;
      })
      .then(() => {
        return superagent.delete(`:4000/api/v1/note/${temp._id}`)
          .then(res => this.resTwo = res);
      });
  });

  describe('Valid req/res', () => {
    it('should respond with a status of 201', () => {
      expect(this.resTwo.status).toBe(204);
    });
    it('should respond with a status of 201', () => {
      expect(this.resTwo.body).toEqual({});
    });
  });

  describe('Invalid req/res', () => {
    it('should return a status 404 on bad path', () => {
      return superagent.delete(':4000/api/v1/doesNotExist')
        .catch(err => {
          expect(err.status).toBe(404);
          expect(err.response.text).toMatch(/path error/i);
        });
    });
    it('should return a status 404 on bad request body', () => {
      return superagent.delete(':4000/api/v1/note')
        .send({})
        .catch(err => expect(err.status).toBe(404));
    });
  });
});