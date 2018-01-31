'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');

describe('DELETE  api/v1/note', () => {
  beforeAll(() => server.start(process.env.PORT, (err) => console.log(`Listening on ${process.env.PORT}`)));
  afterAll(() => server.stop());
  
  this.postOne = {book:'book', description:'description'};
  this.postTwo = {book:'book2', description:'content2'};
  beforeAll(() => {
    return superagent.post(':4000/api/v1/note')
      .send(this.postOne)
      .then(res => {
        this.responseOne = res;
        return superagent.post(':4000/api/v1/note')
          .send(this.postTwo)
          .then(res => this.responseTwo = res);
      });
  });
  describe('DELETE /api/v1/note', () => {
    it('should return with a status of 204', () => {
      return superagent.delete(`:4000/api/v1/note/${this.responseTwo.body._id}`)
        .then(res => {
          expect(res.status).toBe(204);
        });
    });
    it('should check that the record was deleted', () => {
      return superagent.get(`:4000/api/v1/note/${this.responseTwo.body._id}`)
        .catch(res => {
          expect(res.status).toBe(404);
        });
    });
  });
});