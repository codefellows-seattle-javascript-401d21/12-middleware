'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');
require('jest');

describe('Route Test', function() {
  this.mockNote = {title: 'hello', content: 'tim'};

  beforeAll(() => server.start(process.env.PORT, () => console.log(`Listening on ${process.env.PORT}`)));
  afterAll(() => server.stop());

  describe('PUT api/v1/note', () => {
    beforeAll(() => {
      return superagent.post(':4000/api/v1/note')
        .send(this.mockNote)
        .then(res => this.response = res)
        .then(() => this.mockNote._id = this.response.body._id);
    });

    it('Should respond with a status of 204 on a valid request.', () => {
      this.mockNote.content = 'tim tim';
      return superagent.put(`:4000/api/v1/note/${mockNote._id}`)
        .send(this.mocknote)
        .then(res => 
          expect(res.status).toBe(204));
    });
  });
});