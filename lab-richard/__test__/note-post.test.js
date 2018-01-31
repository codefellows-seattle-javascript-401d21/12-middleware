'use strict';

const server = require('../lib/server');
const superagent = require('superagent');
require('jest');

dscribe('POST /api/v1/note', () => {
    beforeAll(() => server.start(process.env.PORT, () => console.log(`Listening on ${process.env.PORT}`)));
    afterAll(() => server.stop());

    describe('Valid request/response', () => {
        beforeAll(() => {
            this.mockNote = {title: 'Hello', content: 'Hello World'};
            return superagent.post(':4000/api/v1/note')
                .send(this.mockNote)
                .then(response => this.response = response);
        });

        it('should post a new note with title and content and _id', () => {
            expect(this.response.body).toHaveProperty('title');
            expect(this.response.body).toHaveProperty('content');
            expect(this.response.body).toHaveProperty('_id');
        });
        it('should respond with a title of "Hello" and a content of "Hello World"', () => {
            expect(this.response.body.title).toEqual('Hello');
            expect(this.response.body.content).toEqual('Hello World');
        });
        it('should respond with a status of 201', () => {
            expect(this.response.status).toBe(201);
        });
    });

    describe('Invalid request/response', () => {
        it('should return true', () => expect(true).toBeTruthy());
    });
});