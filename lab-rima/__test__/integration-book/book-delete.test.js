'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');


describe('DELETE', () => {

  beforeAll(() => server.start(8888, () => {console.log('Listening on 8888');}));
  afterAll(() => server.stop());

  //delete specific one
  describe('DELETE /api/v1/book/:_id', () => {
    let postOne, postTwo, deleteOne, getOne, getTwo;

    // create two books to use them in test
    beforeAll(() => {
      return superagent.post(':8888/api/v1/book')
        .send({title: 'Test', author: 'Testing'})
        .then(res => postOne = res)
    });

    // create another record
    beforeAll(()  => {
      return superagent.post(':8888/api/v1/book')
        .send({title: 'Test2', author: 'Testing2'})
        .then(res => postTwo = res)
    });
    // delete a record
    beforeAll(() => {
      return superagent.del(':8888/api/v1/book/' + postOne.body._id)
        .then(res => deleteOne = res)
    });
    // try to get a record that has been deleted
    beforeAll(() => {
      return superagent.get(':8888/api/v1/book/' + postOne.body._id)
        .catch(err => getOne = err)
    });
    // try to get a record that should exist
    beforeAll(() => {
      return superagent.get(':8888/api/v1/book/' + postTwo.body._id)
        .then(res => getTwo = res)
    });
    // delete all data
    afterAll(() => {
      return superagent.delete(':8888/api/v1/book');
    });

    describe('Valid input', () => {
      test(
        'should delete one record',
        () => {
          expect(getOne.status).toBe(404);
          //expect(getOne.response.text).toEqual('404, Record does not exist');
      });

      test(
        'should not delete the other records',
        () => {
          expect(getTwo.status).toBe(200);
          expect(getTwo.body.title).toEqual('Test2');
          expect(getTwo.body.author).toEqual('Testing2');
      });

      test(
        'should return http status 200',
        () => {
          expect(deleteOne.status).toBe(200);
      });
    });

    describe('Invalid input', () => {
    });
  });
  //delete all
  describe('DELETE /api/v1/book', () => {
    let postOne, postTwo, deleteAll, getAll;

    // create two books to use them in test
    beforeAll(() => {
      return superagent.post(':8888/api/v1/book')
        .send({title: 'Test', author: 'Testing'})
        .then(res => { postOne = res;});
    });

    // create another record
    beforeAll(()  => {
      return superagent.post(':8888/api/v1/book')
        .send({title: 'Test2', author: 'Testing2'})
        .then(res => postTwo = res);
    });
    // delete a record
    beforeAll(() => {
      return superagent.del(':8888/api/v1/book')
        .then(res => deleteAll = res);
    });
    // try to get all records that has been deleted
    beforeAll(() => {
      return superagent.get(':8888/api/v1/book')
        .catch(err => getAll = err);
    });
    // delete all data
    afterAll(() => {
      return superagent.delete(':8888/api/v1/book');
    });

    describe('Valid input', () => {
      test(
        'should return http status 200',
        () => {
          expect(deleteAll.status).toBe(200);
      });
    });

    describe('Invalid input', () => {
    });
  });
});
