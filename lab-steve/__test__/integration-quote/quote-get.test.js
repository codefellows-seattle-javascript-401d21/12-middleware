'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');
require('jest');

describe('POST /api/v1/quote', function () {
  this.endpoint = ':4000/api/v1';
  this.mockQuote = {quote: 'Tis the day', author: 'Steve'};
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

  describe('Valid req/res', () => {
    // First, create a quote
    beforeAll(() => {
      return superagent.post(`${this.endpoint}/quote`)
        .send(this.mockQuote)
        .then(res => this.response = res);
    });
    // Delete that note now
    afterAll(() => superagent.delete(`${this.endpoint}/quote/${this.response.body._id}`));

    it('should respond with a 200 status', () => {
      return superagent.get(`${this.endpoint}/quote/${this.response.body._id}`)
        .then(res => expect(res.status).toBe(200));
    });

    it('should respond with the mock note data', () => {
      return superagent.get(`${this.endpoint}/quote/${this.response.body._id}`)
        .then(res => {
          expect(res.body.quote).toBe(this.mockQuote.quote);
          expect(res.body.author).toBe(this.mockQuote.author);
        });
    });

    it('should respond with the content type json', () => {
      return superagent.get(`${this.endpoint}/quote/${this.response.body._id}`)
        .then(res => {
          expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        });
    });

    it('should fetch all the quote ids with proper format', () => {
      return superagent.get(`${this.endpoint}/quote`)
        .then(res => {
          res.body.map(id => {
            expect(id).toMatch(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/);
          });
        });
    });
  });

  describe('Invalid req/res', () => {
    // First, create a quote
    beforeAll(() => {
      return superagent.post(`${this.endpoint}/quote`)
        .send(this.mockQuote)
        .then(res => this.response = res);
    });
    // Delete that note now
    afterAll(() => superagent.delete(`${this.endpoint}/quote/${this.response.body._id}`));

    it('should return a status 404 on bad path', () => {
      return superagent.get(`${this.endpoint}/fakepath`)
        .catch(err => {
          expect(err.status).toBe(404);
          expect(err.response.text).toMatch(/path error/i);
        });
    });

    it('should return a status 404 on invalid :_id', () => {
      return superagent.get(`${this.endpoint}/quote/blah`)
        .catch(err => {
          expect(err.status).toBe(404);
          expect(err.response.text).toMatch(/enoent/i);
        });
    });
  });
});
