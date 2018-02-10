'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');
const storage = require('../../lib/storage');


describe('GET', function() {

  beforeAll(() => server.start(8888, () => console.log('Listening on 8888')));
  afterAll(() => server.stop());
  afterAll(() => storage.deleteAll('book'));

  describe('GET /api/v1/note/:id', function () {

    let postOne, getOne;

    // create a book to use it in test
    beforeAll(() => {
      return superagent.post(':8888/api/v1/book')
        .send({title: 'Test', author: 'Testing'})
        .then(res => postOne = res);
    });
    // get a specific record
    beforeAll(() => {
      return superagent.get(':8888/api/v1/book/' + postOne.body._id)
        .then(res => getOne = res);
    });
    //delete all data
    afterAll(() => {
      return superagent.delete(':8888/api/v1/book');
    });

    describe('Valid input', () => {

      test(
        'should contain id',
        () => {
          expect(getOne.body._id).toEqual(postOne.body._id);
          expect(getOne.body.title).toEqual(postOne.body.title);
          expect(getOne.body.author).toEqual(postOne.body.author);
        });

      test(
        'should return http status 200',
        () => {
          expect(getOne.status).toBe(200);
        });

      test(
        'should contain title and author that has been created in test',
        () => {
          expect(getOne.body.title).toContain(postOne.body.title);
          expect(getOne.body.author).toContain(postOne.body.author);
        });
    });

    describe('Invalid input', () => {
 
      test(
        'should throw an error if schema is invalid',
        () => {
          superagent.get(':8888/api/v1/bo/' + postOne.body._id)
            .ok(res => res.status < 500)
            .catch(err => {
              expect(err.status).toEqual(404);
              expect(err.message).toBe('Path Error. Route not found.');
            });
        });
      test(
        'should throw an error if item does not exist',
        () => {
          superagent.get(':8888/api/v1/book/12345')
            .ok(res => res.status < 500)
            .catch(err => {
              expect(err.status).toEqual(404);
            });
        });
    });

  });

  // getAll
  describe('GET /api/v1/book', () => {
    let postOne, postTwo, getAll;

    // create new books to use them in test
    beforeAll(() => {
      return superagent.post(':8888/api/v1/book')
        .send({title: 'Test', author: 'Testing'})
        .then(res => postOne = res);
    });
    beforeAll(() => {
      return superagent.post(':8888/api/v1/book')
        .send({title: 'test', author: 'testing'})
        .then(res => postTwo = res);
    });
    // get all data
    beforeAll(() => {
      return superagent.get(':8888/api/v1/book')
        .then(res => getAll = res);
    });
    // delete all data
    afterAll(() => {
      return superagent.delete(':8888/api/v1/book');
    });

    describe('Valid input', function() {
      test(
        'should return http status 200',
        () => {
          //expect(getAll.status).toBe(200);
          superagent.get(':8888/api/v1/book').then(res => expect(res.status).toBe(200));
        });

      test(
        'should contain two ids that have been created in test',
        () => {
          let ids = [];
          for(let i = 0; i < getAll.body.length; i++){
            ids.push(getAll.body[i]._id);
          }
          expect(ids.includes(postOne.body._id)).toBeTruthy();
          expect(ids.includes(postTwo.body._id)).toBeTruthy();
        });
    });

    describe('Invalid input', () => {

      test(
        'should throw an error if schema is invalid',
        () => {
          superagent.get(':8888/api/v1/bo')
            .ok(res => res.status < 500)
            .catch(err => {
              expect(err.status).toEqual(404);
              expect(err.message).toBe('Path Error. Route not found.');
            });
        });

    });
  });
});
