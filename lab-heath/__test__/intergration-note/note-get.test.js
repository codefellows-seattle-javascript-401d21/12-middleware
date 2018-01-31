
'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');
require('jest');


describe('GET /api/v1/note', function () {
  beforeAll(() => server.start(process.env.PORT, (err) => console.log(`Listening on ${process.env.PORT}`)));
  afterAll(() => server.stop());

  
  this.mockNote = {title: 'hello', content: 'hello world'};
  this.mockNote2 = {title: 'bye', content: 'everyone'};
  beforeAll(() => {
    return superagent.post(':4000/api/v1/note/')
      .send(this.mockNote)
      .then(() => {
        return superagent.post(':4000/api/v1/note/')
          .send(this.mockNote2)
          .then(res => {
            this.response = res;
          });
      });
  });

  describe('Valid req/res for GET ALL', () => {
    beforeAll(() => {
      return superagent.get(':4000/api/v1/note')
        .then(res => this.response = res);
    });

    it('should respond with a status of 200', () => {
      expect(this.response.status).toBe(200);
    });
    it('should get an array of 2 items and have ids to match', () => {
      expect(this.response.body[0]).toMatch(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/);
      expect(this.response.body[1]).toMatch(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/);
    });
    it('should respond with array lengthn of 2 or more', () => {
      expect(this.response.body.length).toBeGreaterThanOrEqual(2);
    });
  });


  describe('Valid req/res GET ONE', () => {
    let temp;
    beforeAll(() => {
      return superagent.post(':4000/api/v1/note/')
        .send(this.mockNote)
        .then(res => {
          temp = res.body;
          this.response = res;
        })
        .then(() => {
          return superagent.get(`:4000/api/v1/note/${temp._id}`)
            .then(res => this.response = res);
        });
    });

    it('should respond with a status of 200', () => {
      expect(this.response.status).toBe(200);
    });
    it('should get an item back and the title and content to match', () => {
      expect(temp.title).toMatch(/hello/);
      expect(temp.content).toMatch(/hello world/);
    });
    it('should get an item back and have these properties', () => {
      expect(temp).toHaveProperty('title');
      expect(temp).toHaveProperty('content');
      expect(temp).toHaveProperty('_id');
    });
  });

  describe('invalid req/res GET ONE', () => {
    beforeAll(() => {
      return superagent.post(':4000/api/v1/note/')
        .send(this.mockNote)
        .then(res => this.response = res)
        .then(() => {
          return superagent.get(`:4000/api/v1/note/asdf`)
            .catch(err => this.res = err);
        });
    });

    it('should respond with a status of 404', () => {
      expect(this.res.status).toBe(404);
    });
  });

  describe('invalid req/res GET ALL', () => {
    beforeAll(() => {
      return superagent.post(':4000/api/v1/note/')
        .send(this.mockNote)
        .then(res => this.response = res)
        .then(() => {
          return superagent.get(`:4000/api/v1/no`)
            .catch(err => this.res = err);
        });
    });

    it('should respond with a status of 404', () => {
      expect(this.res.status).toBe(404);
    });
  });
});
