'use strict';

const server = require('../../lib/server');

describe('Server Testing', () => {
  describe('Server start error', () => {
    it('should throw an error when starting the same server twice', () => {
      server.start(process.env.PORT, () => 
        server.start(process.env.PORT, err => expect(err).toBeInstanceOf(Error)));
      
    });
    server.stop();
  });
  it('should throw an error when stopping an already stopped server', () => {
    return server.stop( err => {
      expect(err).toBeInstanceOf(Error);
    });
  });
});
