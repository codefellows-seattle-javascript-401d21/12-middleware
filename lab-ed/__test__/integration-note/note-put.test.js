'use strict'

const server = require('../../lib/server')
const superagent = require('superagent')
require('jest')

describe('PUT /api/v1/note', function() {
  this.mockNote = {title: 'hello', content: 'hello world'}

  beforeAll(() => server.start(process.env.PORT, (err) => console.log(`Listening on ${process.env.PORT}`)))
  afterAll(() => server.stop())

  describe('Invalid req/res', () => {
    it('should return a status 404 on bad path', () => {
      return superagent.put(':4000/api/v1/doesNotExist')
        .send(this.mockNote)
        .catch(err => {
          expect(err.status).toBe(404)
          expect(err.response.text).toMatch(/path error/i)
        })
    })
    it('should return a status 400 on bad request body', () => {
      return superagent.put(':4000/api/v1/note')
        .send({})
        .catch(err => expect(err.status).toBe(404))
    })
  })
})
