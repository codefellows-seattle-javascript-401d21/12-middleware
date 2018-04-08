'use strict'

const server = require('../../lib/server')
const superagent = require('superagent')
require('jest')

describe('DELETE /api/v1/note', function () {


  this.mockNote = {"title":"mocktitle","content":"mock content"}
  let idToDelete;

  beforeAll(() => server.start(process.env.PORT, (err) => console.log(`Listening on ${process.env.PORT}`)))
  afterAll(() => server.stop())

  describe('Valid req/res', () => {

  beforeAll(() => {
    return superagent.post(':4000/api/v1/note')
      .send({"title":"mock title","content":"mock content"})
      .then(res => idToDelete = res.body._id);
  })

    it('delete retrieve status 204', () => {
      return superagent.delete(`:4000/api/v1/note/${idToDelete}`)
        .then(res => {
          expect(res.status).toBe(204);
        });
    });




  })


  describe('Invalid req/res', () => {

 it('bad path 404', () => {
      return superagent.delete(':4000/api/v1/note_sheep_dsacdsc')
        .catch(err => {
          expect(err.status).toBe(404);
          expect(err.response.text).toMatch(/path error/i);
        });
    });

    it('404 since no file / file invalid', () => {
      return superagent.get(`:4000/api/v1/note/${idToDelete}`)
        .catch(err => {
          expect(err.status).toBe(404);

        });
    });



  })
})