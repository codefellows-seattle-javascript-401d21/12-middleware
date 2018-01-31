'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');
require('jest');

describe('Route Testing', function() {
  this.mockNote = {title: 'hello', content: 'tim'};

  beforeAll(() => server.start(process.env.PORT, (err) => console.log(`Listening on ${process.env.PORT}`)));
  afterAll(() => server.stop());

  describe('Valid request and response', () => {
    beforeAll(() => {
      return superagent.post(':4000/api/v1/note')
        .send(this.mockNote)
        .then(res => this.response = res);
    });

    describe('DELETE api/v1/note', () => {
      it('Should respond with a status of 200', () => {
        return superagent.del(`:4000/api/v1/note/${this.response.body._id}`)
          .then(res => {
            expect(res.status).toBe(204);
          });
      });
    });
  });
});