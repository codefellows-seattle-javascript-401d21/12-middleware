'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');
require('jest');

describe('POST /api/v1/note', function() {
    const API_URL = ':3000/api/v1';
    
    this.mockNote = {title: 'hello', content: 'hello world'};

    beforeAll(() => server.start(process.env.PORT, (err) => console.log(`Listening on ${process.env.PORT}`)));
    afterAll(() => server.stop());

    describe('Valid req/res', () => {
        beforeAll(() => {
            return superagent.post(`${API_URL}/note`)
                .send(this.mockNote)

                .then(res => this.response = res);
        });

        it('should respond with a status of 201', () => {
            expect(this.response.status).toBe(201);
        });
        it('should post a new note with title, content, and _id', () => {
            expect(this.response.body).toHaveProperty('title');
            expect(this.response.body).toHaveProperty('content');
            expect(this.response.body).toHaveProperty('_id');
        });
        it('should respond with a title of "hello" and content of "hello world"', () => {
            expect(this.response.body.title).toEqual('hello');
            expect(this.response.body.content).toEqual('hello world');
        });
    });

    describe('Invalid req/res', () => {
        it('should return a status 404 on bad path', () => {
            return superagent.post(`${API_URL}/doesNotExist`)
                .send(this.mockNote)
                .catch(err => {
                    // console.log(err);
                    expect(err.status).toBe(404);
                    expect(err.response.text).toMatch(/path error/i);
                });
        });
        it('should return a status 400 on bad request body', () => {
            return superagent.post(`${API_URL}/note`)
                .send({})
                .catch(err => expect(err.status).toBe(400));
        });
    });
});
