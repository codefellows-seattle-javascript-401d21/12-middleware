'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');


describe('GET api/v1/note', () => {
  beforeAll(() => server.start(process.env.PORT, (err) => console.log(`Listening on ${process.env.PORT}`)));
  afterAll(() => server.stop());
  
  let getOne;

  this.mockBook = {book:'get1', description:'get testing 1'};
  this.mockBook2 = {book:'get2', description:'get testing 2'};
  beforeAll(() => {
    return superagent.post(':4000/api/v1/note')
      .send(this.mockBook)
      .then(res => {this.responseOne = res;
        return superagent.post(':4000/api/v1/note')
          .send(this.mockBook2)
          .then(res => {this.responseTwo = res;
            return superagent.get(':4000/api/v1/note')
              .then(res => getOne = res);
          });
      });
  });
  
  describe('valid req/res', () => {  
    it('should return an array of ids', () => {
      getOne.body.map(id => {
        expect(id).toMatch(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/);
      });
    });
    it('should return a status code of 200', () => {
      expect(getOne.status).toBe(200);
    });
    it('should contain the two ids of records posted', () => {
      expect(getOne.body).toContain(this.responseOne.body._id);
      expect(getOne.body).toContain(this.responseTwo.body._id);
    });
  });
});