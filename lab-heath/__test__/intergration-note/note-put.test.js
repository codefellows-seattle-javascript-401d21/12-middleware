'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');
require('jest');

describe('PUT /api/v1/note', function () {
  beforeAll(() => server.start(process.env.PORT, (err) => console.log(`Listening on ${process.env.PORT}`)));
  afterAll(() => server.stop());

  this.mockNote = {title: 'hello', content: 'hello world'};
  this.mockNote2 = {title: 'bye', content: 'everyone'};
  let temp;

  beforeAll(() => {
    return superagent.post(':4000/api/v1/note/')
      .send(this.mockNote)
      .then(res => {
        temp = res.body;
        this.response = res;
      })
      .then(() => {
        return superagent.put(`:4000/api/v1/note/${temp._id}`)
          .send(this.mockNote2)
          .then(res => this.resTwo = res);
      });
  });

  describe('Valid req/res', () => {
    it('should respond with a status of 204', () => {
      expect(this.resTwo.status).toBe(204);
    });
    it('should updated data should not be the orignal data.', () => {
      expect(this.response.body.title).not.toBe(/hello/);
      expect(this.response.body.content).not.toBe(/hello world/);
    });
    it('should get an item back and have these properties', () => {
      expect(this.response.body).toHaveProperty('title');
      expect(this.response.body).toHaveProperty('content');
      expect(this.response.body).toHaveProperty('_id');
    });
  });
  
  describe('invalid req/res PUT', () => {
    beforeAll(() => {
      return superagent.put(`:4000/api/v1/note`)
        .send(this.mockNote2)
        .catch(res => this.resTest = res);
    });

    it('should respond with a status of 404', () => {
      expect(this.resTest.status).toBe(404);
    });
  });
});