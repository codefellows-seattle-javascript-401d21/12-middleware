'use strict';

const server = require('../../lib/server');
require('jest');

describe('server testing', function() {
  it('Should return an err starting twice', () => {
    server.start(process.env.PORT, (err) => console.log(`Listening on ${process.env.PORT}`));
    expect(server.start(process.env.PORT, (err) => err)).toBeInstanceOf(Error);
    server.stop();
  });

  it('Should return an err stopping twice', () => {
    server.start(process.env.PORT, (err) => console.log(`Listening on ${process.env.PORT}`));
    server.stop();
    expect(server.stop(err => err)).toBeInstanceOf(Error);
  });
});