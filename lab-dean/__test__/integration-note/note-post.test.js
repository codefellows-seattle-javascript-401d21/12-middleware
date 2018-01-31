'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');
require('jest');

describe('POST /api/v1/note', function() {
  this.mockNote = {title: 'hello', content: 'tim'};

  beforeAll(() => server.start(process.env.PORT, () => console.log(`Listening on ${process.env.PORT}`)));
  afterAll(() => server.stop());

  describe('Valid request and response', () => {
    beforeAll(() => {
      return superagent.post(':4000/api/v1/note')
        .send(this.mockNote)
        .then(res => this.response = res);
    });

    it('Should respond with a status of 201 on a valid request.', () => {
      expect(this.response.status).toBe(201);
    });
    it('Should create a new note with an ID, title, and content field', () => {
      expect(this.response.body).toHaveProperty('title');
      expect(this.response.body).toHaveProperty('content');
      expect(this.response.body).toHaveProperty('_id');
    });
    it('Should respond with a title of "hello" and a body of "tim"', () => {
      expect(this.response.body.title).toEqual(this.mockNote.title);
      expect(this.response.body.content).toEqual(this.mockNote.content);
    });
  });

  describe('Invalid request and response', () => {
    it('Should return a stats of 404 on an invalid request', () => {
      return superagent.post(':4000/api/v1/doesNotExist')
        .send(this.mockNote)
        .catch(err => {
          expect(err.status).toBe(404);
          expect(err.response.text).toMatch(/path error/i);
        });
    });
    it('Should return a status 400 on bad request body', () => {
      return superagent.post(':4000/api/v1/note')
        .send({})
        .catch(err => expect(err.status).toBe(400));
    });
  });
});