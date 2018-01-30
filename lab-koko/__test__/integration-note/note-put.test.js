// 'use strict';

// const server = require('../../lib/server');
// const superagent = require('superagent');

// describe('POST api/v1/note', () => {
//   beforeAll(() => server.start(5003, () => console.log(`Listening on port 5003`)));
//   afterAll(() => server.stop());

//   this.mockNote = {title: 'hello', content:'hello world'};
//   beforeAll(() => {
//     return superagent.post(':5000/api/v1.note')
//       .send(this.mockNote)
//       .then(res => this.response = res);
//   });

//   describe('valid req/re', () => {
//     it('should respond with a status of 201', () => {
//       expect(this.response.status).toBe(201);
//     });

//     it('should post a new note with a title, content, and _id', () => {
//       expect(this.response.body).toHaveProperty('title');
//       expect(this.response.body).toHaveProperty('content');
//       expect(this.response.body).toHaveProperty('_id');
//     });

//     it('should respond with a title of "hello" and content of "hello world"', () => {
//       expect(this.response.body.title).toEqual(this.mockNote.title);
//       expect(this.response.body.content).toEqual(this.mockNote.content);

//     });
//   });

//   describe('invalid path', () => {
//     it('should return a status 404 on bad path', () => {
//       return superagent.post(':5000/api/v1/doesNotExist')
//         .send(this.mockNote)
//         .catch(err => {
//           expect(err.status).toBe(404);
//           expect(err.response.text).toMatch(/Path Error/); //(/path error/ i) regex xhexk
//         });
//     });

//     it('should retrun a status 400 on bad request body', () => {
//       return superagent.post('5000/api/v1/note')
//         .send({})
//         .catch(err => expect(err.status).toBe(400));
//     });
//   });
// });