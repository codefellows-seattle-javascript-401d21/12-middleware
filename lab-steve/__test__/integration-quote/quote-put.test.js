'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');

describe('Route Testing', () => {
  let PORT = process.env.PORT;
  let endpoint = `:${PORT}/api/v1/quote`;
  this.mockQuote = { quote: 'Over the hills', author: 'Joe' };
  beforeAll(() => server.start(PORT, () => console.log(`listening on ${PORT}`)));
  afterAll(() => server.stop());

  describe('PUT /quote', () => {
    beforeAll(() => {
      return superagent.post(endpoint)
        .send(this.mockQuote)
        .then(res => this.response = res)
        .then(() => this.mockQuote._id = this.response.body._id);
    });

    describe('Valid Routes/Data', () => {
      it('Should respond with 204 status', () => {
        this.mockQuote.author = 'Tim';
        return superagent.put(`${endpoint}/${this.mockQuote._id}`)
          .send(this.mockQuote)
          .then(res => expect(res.status).toBe(204));
      });

      it('Should respond with the updated quote', () => {
        return superagent.get(`${endpoint}/${this.mockQuote._id}`)
          .then(res => expect(JSON.parse(res.text).author).toBe('Tim'));
      });
    });
  });
});
