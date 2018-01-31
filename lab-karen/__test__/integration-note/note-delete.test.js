'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');
require('jest');

describe('DELETE /api/v1/note', function () {
  beforeAll(() => server.start(process.env.PORT, (err) => console.log(`Listening on ${process.env.PORT}`)));
  afterAll(() => server.stop());

  describe('Valid req/res', () => {

  });

  describe('Invalid req/res', () => {
    it('should return true', () => expect(true).toBeTruthy());
  });
});
