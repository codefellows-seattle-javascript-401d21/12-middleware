'use strict'

const server = require('../../lib/server')
const superagent = require('superagent')
require('jest')

describe('POST /api/v1/note', function () {
  beforeAll(() => server.start(process.env.PORT, (err) => console.log(`Listening on ${process.env.PORT}`)))
  afterAll(() => server.stop())

  describe('Valid req/res', () => {

 beforeAll(() => {
      return superagent.post(':4000/api/v1/note')
        .send({"title":"hello this is the title", "content": "this is the content"})
        .then(res => this.response = res);
    });

    it('put response successful - 201 response', () => {
      expect(this.response.status).toBe(201);
    });

    it('should post a brand new note with title and content', () => {
      expect(this.response.body).toHaveProperty('title');
      expect(this.response.body).toHaveProperty('content');
    });


  })

  describe('Invalid req/res', () => {

    it('should return a status 404 on bad path', () => {
      return superagent.post(':4000/api/v1/badpath')
        .send({"title":"hello this is the title", "content": "this is the content"})
        .catch(err => {
          expect(err.status).toBe(404);
          expect(err.response.text).toMatch(/path error/i);
        });
    });
    it('return 400 status if an empty body is sent', () => {
      return superagent.post(':4000/api/v1/note')
        .send({})
        .catch(err => expect(err.status).toBe(400));
    });


  })
})