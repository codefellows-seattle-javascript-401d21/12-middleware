'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');

describe('POST api/v1/note', () => {
  beforeAll(() => server.start(process.env.PORT, (err) => console.log(`Listening on ${process.env.PORT}`)));
  afterAll(() => server.stop());

  this.mockBook = {book: 'hello', description:'hello world'};
  beforeAll(() => {
    return superagent.post(':4000/api/v1/note')
      .send(this.mockBook)
      .then(res => this.response = res);
  });

  describe('valid req/re', () => {
    it('should respond with a status of 201', () => {
      expect(this.response.status).toBe(201);
    });

    it('should post a new note with a book, description, and _id', () => {
      expect(this.response.body).toHaveProperty('book');
      expect(this.response.body).toHaveProperty('description');
      expect(this.response.body).toHaveProperty('_id');
    });

    it('should respond with a book of "hello" and description of "hello world"', () => {
      expect(this.response.body.book).toEqual(this.mockBook.book);
      expect(this.response.body.description).toEqual(this.mockBook.description);

    });
  });

  //   describe('invalid path', () => {
  //     it('should return a status 404 on bad path', () => {
  //       return superagent.post(':4000/api/v1/doesNotExist')
  //         .send(this.mockBook)
  //         .catch(err => {
  //           expect(err.status).toBe(404);
  //           expect(err.response.text).toMatch(/Path Error/); //(/path error/ i) regex check
  //         });
  //     });

  //     it('should retrun a status 400 on bad request body', () => {
  //       return superagent.post('4000/api/v1/note')
  //         .send({})
  //         .catch(err => expect(err.status).toBe(400));
  //     });
  //   });
  // });
  describe('Invalid req/res', () => {
    it('should return a status 404 on bad path', () => {
      return superagent.post(':4000/api/v1/doesNotExist')
        .send(this.mockNote)
        .catch(err => {
          expect(err.res.status).toBe(404);
          // expect(err.response.text).toMatch(/path error/i);
        });
    });
    it('should return a status 400 on bad request body', () => {
      return superagent.post(':4000/api/v1/note')
        .send({})
        .catch(err => expect(err.res.status).toBe(400));
    });
  });
});