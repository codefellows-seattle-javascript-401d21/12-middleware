'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');

describe('PUT api/v1/note', () => {
  beforeAll(() => server.start(process.env.PORT, (err) => console.log(`Listening on ${process.env.PORT}`)));
  afterAll(() => server.stop());
  
  describe('valid req/res', () => {
    
    let postOne, putOne;
    beforeAll(() => {
      return superagent.post(':4000/api/v1/note')
        .send({book: 'book', description: 'description'})
        .then( res => {
          postOne = res;
          return superagent.put(':4000/api/v1/note')
            .send({book: 'book2', description: 'description 2'})
            .then (res => {
              putOne = res;
            });
        });
    });
    
    it('should respond with a status code of 200', () => {
      console.log(putOne);
      expect(putOne.status).toBe(200);
    });    
    it('should update a record', () => {
      return superagent.get(`:4000/api/v1/note?_id=${putOne.body._id}`)
        .then (res => {
          expect(res.body.description).toEqual('description 2');
          expect(res.body.book).toEqual('book2');
        });
    });
  });
  
  describe('invalid paths', () => {
    it('should respond with an error of 400', () => {
      return superagent.del(':4000/api/v1/note')
        .catch (err => {
          expect(err.status).toBe(404);
        });
    });
  });
});