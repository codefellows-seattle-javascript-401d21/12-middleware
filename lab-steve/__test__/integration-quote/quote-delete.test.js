'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');

describe('DELETE /api/v1/quote', () => {
  let PORT = process.env.PORT;
  let endpoint = `:${PORT}/api/v1/quote`;
  this.mockQuote = {quote: 'Top of the morning', author: 'Sandy'};
  beforeAll(() => server.start(PORT, () => console.log(`listening on ${PORT}`)));
  afterAll(() => server.stop());
  beforeAll(() => {
    return superagent.post(endpoint)
      .send(this.mockQuote)
      .then(res => this.response = res);
  });

  describe('Valid', () => {
    it('should respond 204 status on successful deletion', () => {
      return superagent.delete(`${endpoint}/${this.response.body._id}`)
        .then(res => expect(res.status).toBe(204));
    });
  });

  describe('Invalid', () => {
    it('should respond with a 404 when a fake path was requested', () => {
      return superagent.delete(`${endpoint}/fakepath`)
        .catch(err => expect(err.status).toBe(404));
    });
  });
});
