'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');
require('jest');

describe('POST /api/v1/note', function () {
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

  describe('Valid req/res', () => {
    it('should return true', () => expect(true).toBeTruthy());
  });

  describe('Invalid req/res', () => {
    it('should return true', () => expect(true).toBeTruthy());
  });
});
