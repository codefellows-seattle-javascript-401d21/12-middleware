'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');


describe('GET api/v1/note', () => {
  
  beforeAll(() => server.start(process.env.PORT, (err) => console.log(`Listening on ${process.env.PORT}`)));
  afterAll(() => server.stop());
  
  let getArray;
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
              .then(res => getArray = res);
          });
      });
  });
  
  describe('valid req/res', () => { 
    console.log(getArray); 
    it('should return an array of ids', () => {
      expect(getArray.text).toMatch(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/);
    });

    it('should return a status code of 200', () => {
      expect(getArray.status).toBe(200);
    });
    it('should contain the two ids of records posted', () => {
      expect(getArray.body).toContain(this.responseOne.body._id);
      expect(getArray.body).toContain(this.responseTwo.body._id);
    });

    describe('ivalid paths', () => {
      it('should return a status 404 on bad path', () => {
        beforeAll(() => {
          return superagent.get(':4000/api/v1/DoesNotExist')
            .send(this.mockBook)
            .catch(res => {
              expect(res.status).toBe(404);
              expect(err.res.text).toMatch(/Path Error/i);
            }); 
        });
      });
    });
  });
});
