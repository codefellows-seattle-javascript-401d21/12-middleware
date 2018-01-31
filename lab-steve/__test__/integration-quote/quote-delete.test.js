'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');
require('jest');

describe('POST /api/v1/quote', function () {
  beforeAll(() => server.start(process.env.PORT, (err) => {
    if (err)
      console.error(`Error Starting Server: ${err}`);
    console.log(`Listening on ${process.env.PORT}`);
  }));
  afterAll(() => server.stop());

  describe('Valid req/res', () => {
    it('should return true', () => expect(true).toBeTruthy());
  });

  describe('Invalid req/res', () => {
    it('should return true', () => expect(true).toBeTruthy());
  });
});
