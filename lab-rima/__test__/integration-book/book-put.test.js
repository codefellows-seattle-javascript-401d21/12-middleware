'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');


describe('PUT /', () => {

  beforeAll(() => server.start(8888, () => {console.log('Listening on 8888');}));
  afterAll(() => server.stop());

  describe('Valid input', () => {
    let postOne, putOne, getOne;

    // First new book
    // post an existing book to use it in test
    beforeAll(() => {
      return superagent.post(':8888/api/v1/book')
        .send({ title: 'Test', author: 'Testing' })
        .then(res => { postOne = res; });
    });

    // update an existing book to use it in test
    beforeAll(() => {
      return superagent.put(':8888/api/v1/book/' + postOne.body._id)
        .send({ title: 'Update', author: 'Updating' })
        .then(res => { putOne = res; });
    });

    // get an existing book to use it in test
    beforeAll(() => {
      return superagent.get(':8888/api/v1/book/' + postOne.body._id)
        .then(res => { getOne = res; });
    });

    // delete all data
    afterAll(() => {
      return superagent.del(':8888/api/v1/book');
    });

    test(
      'should update title and author when put request is sent with both new data',
      () => {
        expect(getOne.body.title).toEqual('Update');
        expect(getOne.body.author).toEqual('Updating');
    });

    test(
      'should respond with http res status 204',
      () => {
        expect(putOne.status).toBe(204);
    });
  });

  describe('Invalid input', () => {
    let postTwo, putTwo, getTwo;

    // post an existing book to use it in test
    beforeAll(() => {
      return superagent.post(':8888/api/v1/book')
        .send({ title: 'Test2', author: 'Testing2' })
        .then(res => { postTwo = res; });
    });

    // update an existing book to use it in test
/*    beforeAll(() => {
      return superagent.put(':8888/api/v1/book/' + postTwo.body._id)
        .send({ title: 'Update2' })
        .then(res => { putTwo = res; });
    });
*/
    // get an existing book to use it in test
    beforeAll(() => {
      return superagent.get(':8888/api/v1/book/' + postTwo.body._id)
        .then(res => { getTwo = res; });
    });
    
    // delete all data
    afterAll(() => {
      return superagent.del(':8888/api/v1/book');
    });
  });
});
