// 'use strict';

// const server = require('../../lib/server');
// const superagent = require('superagent');

// describe('PUT api/v1/note', () => {
//   beforeAll(() => server.start(process.env.PORT, (err) => console.log(`Listening on ${process.env.PORT}`)));
//   afterAll(() => server.stop());
  
//   this.postOne = {book: 'book', description: 'description'};
//   this.putOne ={book: 'book2', description: 'description 2'};
//   beforeAll(() => {
//     return superagent.post(':4000/api/v1/note')
//       .send(this.postOne)
//       .then( res => {
//         this.postOne = res;
//         return superagent.put(':4000/api/v1/note')
//           .send(this.putOne)
//           .then (res => {
//             this.putOne = res;
//             console.log(this._idpostOne);
//           });
//       });
//   });


//   describe('valid req/res', () => {
//     it('should respond with a status code of 200', () => {
//       console.log(this.putOne);
//       expect(this.putOne.status).toBe(200);
//     }); 

//     it('should update a record', () => {
//       return superagent.get(`:4000/api/v1/note?_id=${this.putOne.body._id}`)
//         .then (res => {
//           expect(res.body.description).toEqual('description 2');
//           expect(res.body.book).toEqual('book2');
//         });
//     });

//   });
  
//   describe('invalid paths', () => {
//     it('should respond with an error of 400', () => {
//       return superagent.del(':4000/api/v1/note')
//         .catch (err => {
//           expect(err.status).toBe(404);
//         });
//     });

//   });
// });