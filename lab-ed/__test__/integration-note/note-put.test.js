'use strict'

const server = require('../../lib/server')
const superagent = require('superagent')
require('jest')

describe('PUT /api/v1/note', function() {
  this.mockNote = {title: 'hello', content: 'hello world'}

  beforeAll(() => server.start(process.env.PORT, (err) => console.log(`Listening on ${process.env.PORT}`)))
  afterAll(() => server.stop())

  describe('Valid req/res', () => {
  
    beforeAll(() => {
      return superagent.post(':4000/api/v1/note')
        .send(this.mockNote)
        .then(res => {
          this.response = res
        })
    })
    beforeAll(() => {
      return superagent.put(`:4000/api/v1/note/${this.response._id}`)
        .send({title: 'foo', content: 'bar'})
        .then(res => this.response = res)
    })
    it('should return a status code 204 when complete', () => {
      expect(this.response.status).toBe(204)
    })
    it('should have a new title', () => {
      expect(this.response.title).not.toBe('foo')
    })
    it('should be the same id with new title', () => {
      expect(this.response._id).toBe(this.mockNote._id)
    })
  })

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
