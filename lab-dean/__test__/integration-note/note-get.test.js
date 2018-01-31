'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');
require('jest');

describe('Route Testing', function() {
  this.mockNote = {title: 'hello', content: 'tim'};

  beforeAll(() => server.start(process.env.PORT, () => console.log(`Listening on ${process.env.PORT}`)));
  afterAll(() => server.stop());

  describe('GET api/v1/note', () => {
    beforeAll(() => {
      return superagent.post(':4000/api/v1/note')
        .send(this.mockNote);
    });

    describe('Valid Requests', () => {
      beforeAll(() => {
        return superagent.get(':4000/api/v1/note')
          .then(res => this.reponse = res);
      });
      it('Should respond with a status of 200', () => {
        expect(this.response.status).toBe(200);
      });
    });
  });
});