'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');
require('jest');

describe('GET /api/v1/note', function () {
  beforeAll(() => server.start(process.env.PORT, () => console.log(`Listening on ${process.env.PORT}`)));
  afterAll(() => server.stop());

  let postOne, postTwo, getAll;
  beforeAll(() => {
    return superagent.post(':4000/api/v1/note')
      .send({title: 'hello', content: 'there'})
      .then(res => {
        postOne = res;
        return superagent.post(':4000/api/v1/note')
          .send({title: 'goodbye', content: 'you'})
          .then(res => {
            postTwo = res;
          });
      });
  });

  beforeAll(() => {
    return superagent.get(':4000/api/v1/note')
      .then(res => getAll = res);
  });


  describe('Valid req/res', () => {

    it('should respond with a status of 200', () => {
      expect(getAll.status).toBe(200);
    });
    it('respond with an array of ids', () => {
      getAll.body.map(id => {
        // console.log('id', id);
        expect(id).toMatch(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/);
      });
    });
    it('should contain the two ids of records posted', () => {
      expect(getAll.body).toContain(postOne.body._id);
      expect(getAll.body).toContain(postTwo.body._id);
    });
  });

  describe('Invalid req/res', () => {
    it('should return a status 404 on bad path', () => {
      return superagent.get(':4000/api/v1/doesNotExist')
        .send(this.mockNote)
        .catch(err => {
          expect(err.status).toBe(404);
          expect(err.response.text).toMatch(/path error/i);
        });
    });
  });
});

describe('GET /api/v1/note/:_id', function () {
  beforeAll(() => server.start(process.env.PORT, () => console.log(`Listening on ${process.env.PORT}`)));
  afterAll(() => server.stop());

  let resOne, resTwo, getOne;
  beforeAll(() => {
    return superagent.post(':4000/api/v1/note')
      .send({title: 'hello', content: 'there'})
      .then(res => {
        resOne = res;
        return superagent.post(':4000/api/v1/note')
          .send({title: 'goodbye', content: 'you'})
          .then(res => {
            resTwo = res;
          });
      });
  });

  beforeAll(() => {
    return superagent.get(':4000/api/v1/note/`${resOne.body._id}`')
      .then(res => getOne = res);
  });


  describe('Valid req/res', () => {

    it('should respond with a status of 200', () => {
      expect(getOne.status).toBe(200);
    });

    it('should retrieve the correct record', () => {
      expect(getOne.body).toContain(resOne.body._id);
      expect(getOne.body).toContain(resOne.body.title);
      expect(getOne.body).toContain(resOne.body.content);

    });
  });

  describe('Invalid req/res', () => {
    it('should return a status 404 on bad path', () => {
      return superagent.get(':4000/api/v1/note')
        .send(this.mockNote)
        .catch(err => {
          expect(err.status).toBe(404);
          expect(err.response.text).toMatch(/path error/i);
        });
    });
  });
});
