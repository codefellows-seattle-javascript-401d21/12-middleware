'use strict';

'use strict';

require('jest');

describe('testing testing', function () {
  it('should return true', () => expect(true).toBeTruthy());
});

//the above code is to make sure we dont get errors when jest is running through all test files that are incomplete

// # const server = require('../../lib/server')
// # require('jest')

// # describe('POST /api/v1/note', function () {
// #   beforeAll(() => server.start(4000, () => console.log(`LISTENING on port 4000`)))
// #   afterAll(()=> server.stop(() => console.log('stopping server')))

// #   describe('Valid req/res', () => {
// #     //test for stuff in here dude
// #   })

// #   describe('Invalid req/res', () => {
// #     it('should return true', () => expect(true).toBeTruthy())
// #   })
// # })