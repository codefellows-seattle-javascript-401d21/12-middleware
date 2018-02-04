'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');
require('jest');

describe('POST /api/v1/quote', function() {
  this.mockQuote = {quote: 'Tis the day', author: 'Steve'};
  this.endpoint = ':4000/api/v1';

  // Start the server
  beforeAll(() => server.start(process.env.PORT, (err) => {
    if (err) {
      console.error(`Error Starting Server: ${err}`);
      return;
    }
    console.log(`Listening on PORT ${process.env.PORT}`);
  }));
  // Stop the server
  afterAll(() => server.stop());

  describe('Valid', () => {
    // First, create a quote
    beforeAll(() => {
      return superagent.post(`${this.endpoint}/quote`)
        .send(this.mockQuote)
        .then(res => this.response = res);
    });
    // Delete that quote now
    afterAll(() => superagent.delete(`${this.endpoint}/quote/${this.response.body._id}`));

    it('should respond with a status of 201', () => {
      expect(this.response.status).toBe(201);
    });

    it('should post a new Quote with quote, author, and _id properties', () => {
      expect(this.response.body).toHaveProperty('quote');
      expect(this.response.body).toHaveProperty('author');
      expect(this.response.body).toHaveProperty('_id');
    });

    it('should respond with a quote of "Tis the day" and author of "Steve"', () => {
      expect(this.response.body.quote).toEqual(this.mockQuote.quote);
      expect(this.response.body.author).toEqual(this.mockQuote.author);
    });
  });

  describe('Invalid', () => {
    // First, create a quote
    beforeAll(() => {
      return superagent.post(`${this.endpoint}/quote`)
        .send(this.mockQuote)
        .then(res => this.response = res);
    });
    // Delete that quote now
    afterAll(() => superagent.delete(`${this.endpoint}/quote/${this.response.body._id}`));

    it('should return a status 404 on bad path', () => {
      return superagent.post(`${this.endpoint}/fakepath`)
        .send(this.mockQuote)
        .catch(err => {
          expect(err.status).toBe(404);
          expect(err.response.text).toMatch(/path error/i);
        });
    });

    it('should return a status 400 on bad request body', () => {
      return superagent.post(`${this.endpoint}/quote`)
        .send({bad: 'data'})
        .catch(err => expect(err.status).toBe(400));
    });
  });
});
