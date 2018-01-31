'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');
require('jest');

describe('PUT/api/v1/note', () => {

    this.mmockNote = {title: 'hello', content: 'world'};
    
    beforeAll(() => server.start(process.env.PORT, () => console.log(`Listening on ${process.env.PORT}`)));
    afterAll(() => server.stop());

    describe('testing dummy', function() {
        it('should return true', () => expect(true).toBeTruthy());
    });
});