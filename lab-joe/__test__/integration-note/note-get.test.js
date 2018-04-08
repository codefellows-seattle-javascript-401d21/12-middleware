'use strict'

const server = require('../../lib/server')
const superagent = require('superagent')
require('jest')

describe('POST /api/v1/note', function () {
  beforeAll(() => server.start(process.env.PORT, (err) => console.log(`Listening on ${process.env.PORT}`)))
  afterAll(() => server.stop())

  describe('Valid req/res', () => {

beforeAll(() => {
  return superagent.get(':4000/api/v1/note/238d9561-a6a3-463e-92cd-e87c4353a825').then(res => this.response = res)
})

  it('should respond with a status of 200', () => {
      expect(this.response.status).toBe(200);
    });
    it('should get a response with a title content and _id', () => {
      expect(this.response.body).toHaveProperty('title')
      expect(this.response.body).toHaveProperty('content')
      expect(this.response.body).toHaveProperty('_id')
    });
    it('should respond with title of hello and content of hello world"', () => {
      expect(this.response.body.title).toEqual('hello');
      expect(this.response.body.content).toEqual('hello world');
    });

  })

  describe('Invalid req/res', () => {


  it('404 on bad path', () => {
      return superagent.get(':4000/api/v1/doesNotExist')
        .send({})
        .catch(err => {
          expect(err.status).toBe(404);
        });
    });

    it('404 on invalid file', () => {
      return superagent.post(':4000/api/v1/note/238d9561-a6a3-463e-92cd-e87c4353a82ads')
        .send({"title":"hello","content":"world"})
        .catch(err => {
          expect(err.status).toBe(404);
          expect(err.response.text).toMatch(/path error/i);
        });
    });


  })
})
