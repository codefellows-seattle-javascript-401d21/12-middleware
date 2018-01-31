'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');
require('jest');

describe('GET /api/v1/note', function() {
  this.mockNote = {title: 'hello', content: 'hello world'};

  beforeAll(() => server.start(process.env.PORT, (err) => console.log(`Listening on ${process.env.PORT}`)));
  afterAll(() => server.stop());

  describe('Valid req/res', () => {
    beforeAll(() => {
      return superagent.post(':4000/api/v1/note')
        .send(this.mockNote);
    });

    beforeAll(() => {
      return superagent.get(':4000/api/v1/note')
        .then(res => this.response = res);
    });

    it('should respond with a status of 200', () => {
      expect(this.response.status).toBe(200);
    });
    it('should respond with a list of notes', () => {
      for(let i in this.response.body) {
        expect(this.response.body[i]).toMatch(/[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}/);
      }
    });
    it('should respond with a single note', () => {
      return superagent.get(`:4000/api/v1/note/${this.response.body[0]}`)
        .then(res => {
          expect(res.body.title).toBe('hello');
          return res;
        })
        .then(res => expect(res.body.content).toBe('hello world'));
    });
  });

  describe('Invalid req/res', () => {
    it('Should respond a not found', () => {
      return superagent.get(`:4000/api/v1/note/badpath`)
        .catch(err => {
          expect(err.response.text).toMatch(/ENOENT/);
        });
    });
    it('Should respond status code 404', () => {
      return superagent.get(`:4000/api/v1/note/badpath`)
        .catch(err => {
          expect(err.status).toBe(404);
        });
    });
  });
});