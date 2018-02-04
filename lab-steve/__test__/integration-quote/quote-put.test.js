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

    describe('Valid PUT /quote', () => {
      it('should respond with 204 status', () => {
        this.mockQuote.author = 'Tim';
        return superagent.put(`${endpoint}/${this.mockQuote._id}`)
          .send(this.mockQuote)
          .then(res => expect(res.status).toBe(204));
      });

      it('should respond with the updated quote', () => {
        return superagent.get(`${endpoint}/${this.mockQuote._id}`)
          .then(res => expect(JSON.parse(res.text).author).toBe('Tim'));
      });
    });

    describe('Invalid PUT /quote', () => {
      it('should respond with 204 status when a bogus path is requested', () => {
        return superagent.put(`${endpoint}/fakepath`)
          .send({quote: 'Yowzers', author: 'Mike'})
          .catch(err => expect(err.status).toBe(404));
      });

      it('should return a 400 status when no body is sent', () => {
        return superagent.put(`${endpoint}/${this.mockQuote._id}`)
          .catch(err => expect(err.status).toBe(400));
      });
    });
  });
});
