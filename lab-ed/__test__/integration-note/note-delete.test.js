'use strict'

const server = require('../../lib/server')
const superagent = require('superagent')
require('jest')

describe('DELETE /api/v1/note', function() {
  this.mockNote = {id: '10', title: 'hello', content: 'hello world'}

  beforeAll(() => server.start(process.env.PORT, () => console.log(`Listening on ${process.env.PORT}`)))
  afterAll(() => server.stop())

  describe('POST so we can delete', () => {
    beforeAll(() => {
      return superagent.post(':4000/api/v1/note')
        .send(this.mockNote)
        .then(res => this.response = res)
    })
    describe('DELETE /api/v1/note', () => {
      it('should respond with a status of 204', () => {
        return superagent.delete(`:4000/api/v1/note/${this.response.body._id}`)
          .then(res => {
            expect(res.status).toBe(204)
          })
      })
    })
  })
  
  describe('Invalid req/res', () => {
    it('should return a status 404 on bad path', () => {
      return superagent.delete(':4000/api/v1/doesNotExist')
        .send(this.mockNote)
        .catch(err => {
          expect(err.status).toBe(404)
          expect(err.response.text).toMatch(/path error/i)
        })
    })
  })
})
