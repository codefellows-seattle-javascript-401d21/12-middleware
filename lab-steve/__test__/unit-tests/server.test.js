'use strict';

let server = require('../../lib/server');

describe('Server Tests', () => {
  describe('Start server twice', () => {
    it('should throw an error on if attempting to start twice', () => {
      server.start(process.env.PORT, () => console.log(`Listening on ${process.env.PORT}`));
      server.start(process.env.PORT, err => expect(err).toBeInstanceOf(Error));
      server.stop();
    });
  });
  describe('Server Close when inactive', () => {
    it('should throw an error on attempting to stop the server that is inactive', () => {
      return server.stop(err => expect(err).toBeInstanceOf(Error));
    });
  });
});
