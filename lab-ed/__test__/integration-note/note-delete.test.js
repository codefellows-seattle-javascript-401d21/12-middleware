'use strict'

const server = require('../../lib/server')
const superagent = require('superagent')
require('jest')

describe('DELETE /api/v1/note', function() {
  this.mockNote = {id: '10', title: 'hello', content: 'hello world'}

  beforeAll(() => server.start(process.env.PORT, (err) => console.log(`Listening on ${process.env.PORT}`)))
  afterAll(() => server.stop())

  describe('Valid req/res', () => {
    beforeAll(() => {
      return superagent.delete(':4000/api/v1/note/10')
        .send(this.mockNote)
        .then(res => this.response = res)
    })

    it('should respond with a status of 204', () => {
      expect(this.response.status).toBe(204)
    })
  })
  // it('should post a new note with title, content, and _id', () => {
  //   expect(this.response.body).toHaveProperty('title')
  //   expect(this.response.body).toHaveProperty('content')
  //   expect(this.response.body).toHaveProperty('_id')
  // })
  // it('should respond with a title of "hello" and content of "hello world"', () => {
  //   expect(this.response.body.title).toEqual(this.mockNote.title)
  //   expect(this.response.body.content).toEqual(this.mockNote.content)
  // })
  

  describe('Invalid req/res', () => {
    it('should return a status 404 on bad path', () => {
      return superagent.delete(':4000/api/v1/doesNotExist')
        .send(this.mockNote)
        .catch(err => {
          expect(err.status).toBe(404)
          expect(err.response.text).toMatch(/path error/i)
        })
    })
    // it('should return a status 400 on bad request body', () => {
    //   return superagent.delete(':4000/api/v1/note')
    //     .send({})
    //     .catch(err => expect(err.status).toBe(400))
    // })
  })
})
