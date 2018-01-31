// 'use strict';

// const server = require('../../lib/server');
// const superagent = require('superagent');


// describe('GET api/v1/note', () => {
//   beforeAll(() => server.start(process.env.PORT, (err) => console.log(`Listening on ${process.env.PORT}`)));
//   afterAll(() => server.stop());
  
//   let getOne;

//   describe('valid req/res', () => {
  
//     this.mockBook = {book:'get1', description:'get testing 1'};
//     this.mockBook2 = {book:'get2', description:'get testing 2'};
//     beforeAll(() => {
//       console.log(this.response);
//       return superagent.post(':4000/api/v1/note')
//         .send(this.mockBook)
//         .then(res => this.response = res);
//     });
  
//     beforeAll(() => {
//       return superagent.post(':4000/api/v1/note')
//         .send(this.mockBook2)
//         .then(res => this.response = res);
//     });

//     (() => {
//       return superagent.get(':4000/api/v1/note')
//         .then(res => getOne = res);
//     });
    
//     it('should return an array of ids', () => {
//       getOne.body.map(id => {
//         expect(id).toMatch(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/);
//       });
//     });
//     it('should return a status code of 200', () => {
//       expect(getOne.status).toBe(200);
//     });
//     it('should contain the two ids of records posted', () => {

//       console.log(this.mockBook2);
//       expect(getOne.body).toContain(this.mockBook.body);
//       expect(getOne.body).toContain(this.mockBook2.body);
//     });

//   });
// });