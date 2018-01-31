'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');

describe('PUT api/v1/note', () => {

  beforeAll(() => server.start(process.env.PORT, (err) => console.log(`Listening on ${process.env.PORT}`)));
  afterAll(() => server.stop());

  this.postOne = { book: 'book', description: 'description' };
  this.putOne = { book: 'book2', description: 'description 2' };
  beforeAll(() => {
    return superagent.post(':4000/api/v1/note')
      .send(this.postOne)
      .then(res => {
        this.response = res;
        return superagent.put(`:4000/api/v1/note/${this.response.body._id}`)
          .send(this.putOne)
          .then(res => {
            this.responseTwo = res;
            return superagent.get(`:4000/api/v1/note/${this.response.body._id}`)
              .then(res => this.responseThree = res);
          });
      });
  });

  describe('valid req/res', () => {
    it('should respond with a status code of 204', () => {
      expect(this.responseTwo.status).toBe(204);
    });

    it('should update a record', () => {
      return superagent.get(`:4000/api/v1/note/${this.responseThree.body._id}`)
        .then(res => {
          expect(res.body.description).toEqual('description 2');
          expect(res.body.book).toEqual('book2');
        });
    });

    it('should have return a book with the book, description and _id', () => {
      expect(this.responseThree.body).toHaveProperty('book');
      expect(this.responseThree.body).toHaveProperty('description');
      expect(this.responseThree.body).toHaveProperty('_id');
    });
  });

  describe('invalid paths', () => {
    it('should respond with an error of 404', () => {
      return superagent.put(':4000/api/v1/DoesNotExist')
        .send(this.putOne)
        .catch(err => {
          expect(err.status).toBe(404);
        });
    });
  });
});