'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');



describe('POST /api/v1/book', () => {

  beforeAll(() => server.start(8888/*process.env.PORT*/, () => {console.log('Listening on 8888/*${process.env.PORT}`*/');}));
  afterAll(() => server.stop());

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

  describe('Invalid req/res', () => {

    test(
      'should throw an error if schema is invalid',
      () => {
        superagent.post(':8888/api/v1/bo')
          .ok(res => res.status < 500)
          .send({title: 'tt', author: 'au'})
          .catch(err => expect(err.status).toEqual(500));
      });
  });
});
