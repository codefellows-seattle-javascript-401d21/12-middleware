'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');
const storage = require('../../lib/storage');


describe('POST /api/v1/book', () => {

  beforeAll(() => server.start(8888/*process.env.PORT*/, () => {console.log('Listening on 8888');}));
  afterAll(() => server.stop());
  afterAll(() => storage.deleteAll('book'));


  let resOne;
  describe('Valid req/res', () => {

    // create a new book to use it in test
    beforeAll(() => {
      return superagent.post(':8888/api/v1/book')
        .send({title: 'Test', author: 'Testing'})
        .then(res => resOne = res);
    });

    test(
      'should create a new book',
      () => {
        expect(resOne.body.title).toEqual('Test');
        expect(resOne.body.author).toEqual('Testing');
      });

    test(
      'should respond with http res status 201',
      () => {
        expect(resOne.status).toBe(201);
      });

    test(
      'should have an _id property on the response object',
      () => {
        expect(resOne.body).toHaveProperty('_id');
      });
  });

});
