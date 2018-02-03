'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');
require('jest');

describe('PUT /api/v1/note', function() {
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
      return superagent.put(`:4000/api/v1/note/${this.response.body._id}`)
        .send({title: 'updated title', content: 'updated content', _id: this.response.body._id})
        .then(res => {
          expect(res.status).toBe(204);
        });
    });
    it('Should respond having the new title and content', () => {
      return superagent.get(`:4000/api/v1/note/${this.response.body._id}`)
        .then(res => {
          expect(res.body.title).toBe('updated title');
          expect(res.body.content).toBe('updated content');
        });
    });
    it('Should respond with a status 200', () => {
      return superagent.put(`:4000/api/v1/note/${this.response.body._id}`)
        .send({title: 'hello', content: 'hello world', _id: this.response.body._id})
        .then(res => {
          expect(res.status).toBe(204);
        });
    });
    it('Should respond having the new title and content', () => {
      return superagent.get(`:4000/api/v1/note/${this.response.body._id}`)
        .then(res => {
          expect(res.body.title).toBe('hello');
          expect(res.body.content).toBe('hello world');
        });
    });
  });

  describe('Invalid req/res', () => {
    beforeAll(() => {
      return superagent.post(':4000/api/v1/note')
        .send(this.mockNote)
        .then(res => this.response = res);
    });


    it('should return a status 404 on bad path', () => {
      return superagent.put(':4000/api/v1/badid')
        .send({title: 'updated title', content: 'updated content', _id: this.response.body._id})
        .catch(err => {
          expect(err.status).toBe(404);
          expect(err.response.text).toMatch(/path error/i);
        });
    });
    it('should return a status 404 on bad request body', () => {
      return superagent.post(`:4000/api/v1/note/${this.response.body._id}`)
        .send({})
        .catch(err => expect(err.status).toBe(404));
    });
  });
});