
# LAB 12: Express Middleware


### Installing and How to use.

To install this program, place fork and 'git clone' this repo to your computer. From the terminal, navigate to  `lab-heath`. once there, install NPM but typing in , `nmp install` and httpie(done with home) after that you need to install uuid, express, body-parser, bluebird `npm install uuid express body-parser bluebird`. for devolper Dependencies are dotenv jest eslint do these with `npm install -D dotenv jest eslint`
you also need to have HTTPIE installed via homebrew `brew install httpie` in the terminal. this will let you do the helpful commands inside of the terminal.



next you need to have these scripts adjusted in your package.json file.

```javascript
 "scripts": {
    "test": "jest -i",
    "test:watch": "jest -i --watchAll",
    "test:debug": "DEBUG=http* jest -i",
    "start:watch": "nodemon index.js",
    "start:debug": "DEBUG=http* nodemon index.js"
  },
  ```

from there, you can go to your terminal and type, 

```javascript
node run start
```
and this will start up your server, if you do `npn run start:watch`, this will let you see it in your localhost in your browser.


### some helpful commands  

these are you basic commands 

to add note to it.
```javascript
http POST http://localhost:3000/api/v1/note title=bigboy content=build
```

this should return this 

```javascript
{
    "_id": "75dce3d4-1304-4f29-b519-6d45f3b681cb",
    "content": "stuff",
    "title": "bigboy"
}
```


to get all your notes.
```javascript
http GET http://localhost:3000/api/v1/note
```
it will get all the notes that in memory and it should look like this. here we have 2 notes passed back to storage and these are the UUID's

```javascript
[
    "90aec508-e1eb-4d6d-84b6-39c80898b624",
    "92ba65cc-49c2-4baa-8d13-2004f661ea54"
]
```

use this to just get one of your notes. you do need to use the ID for it from the get all.(from above)
```javascript
http GET http://localhost:3000/api/v1/note/92ba65cc-49c2-4baa-8d13-2004f661ea54
```
it will get the notes that in the storage file under the notes subfolder and it should look like this.

```javascript
{
    "_id": "92ba65cc-49c2-4baa-8d13-2004f661ea54",
    "content": "build",
    "title": "bigboy"
}
```


to update a note.
```javascript
http PUT http://localhost:3000/api/v1/note/b406ced2-8918-490a-a725-e84d51076226 title=new content=thisisnew
```

now your run a `get one note` and it should look like this

```javascript
{
    "_id": "530723aa-fb64-4e45-8686-aeeb0c2d244a",
    "content": "this is a updated post",
    "title": "thisisnew"
}
```

to delete a note.
```javascript
http DELETE http://localhost:3000/api/v1/note/b406ced2-8918-490a-a725-e84d51076226
```  
and now you should have nothing is you do the GET command again.

## function code for the POST

```javascript
router.post('/', bodyParser, (req, res) => {
    new Note(req.body.title, req.body.content)
      .then(note => storage.create('note', note))
      .then(item => res.status(201).json(item))
      .catch(err => errorHandler(err, res));
  });
  ```
  for the storage side

  ```javascript
storage.create = (schema, item) => {
  let json = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${schema}/${item._id}.json`, json)
    .then(() => item);
};
```

## function code for the GET one

```javascript
router.get('/:_id', (req, res) => {
    storage.fetchOne('note', req.params._id)
      .then(buffer => buffer.toString())
      .then(json => JSON.parse(json))
      .then(note => res.status(200).json(note))
      .catch(err => errorHandler(err, res));
  });
  ```
  for the storage side

  ```javascript
storage.fetchOne = (schema, itemId) => fs.readFileProm(`${__dirname}/../data/${schema}/${itemId}.json`);
```

## function code for the GET all

```javascript
router.get('/', (req, res) => {
    storage.fetchAll('note')
      .then(data => data.map(id => id.split('.')[0]))
      .then(note => res.status(200).json(note))
      .catch(err => errorHandler(err, res));
  });
  ```
  for the storage side

  ```javascript
storage.fetchAll = (schema) => {
  return fs.readdirProm(`${__dirname}/../data/${schema}`);
};
```


## function code for the PUT

```javascript
router.put('/:_id', bodyParser, (req, res) => {
    storage.fetchOne('note', req.params._id)
      .then(buffer => buffer.toString())
      .then(json => JSON.parse(json))
      .then(note => ({
        _id: req.params._id,
        title: req.body.title || note.title,
        content: req.body.content || note.content,
      }))
      .then(note => JSON.stringify(note))
      .then(note => storage.update('note', req.params._id, note))
      .then(item => res.status(204).json(item))
      .catch(err => errorHandler(err, res));
  });
  ```
  for the storage side

  ```javascript
storage.update = (schema, itemId, item) => {
  return fs.writeFileProm(`${__dirname}/../data/${schema}/${itemId}.json`, item);
};
```

## function code for the DELETE

```javascript
router.delete('/:_id', (req, res) => {
    storage.destroy('note', req.params._id)
      .then(() => res.sendStatus(204))
      .catch(err => errorHandler(err, res));
  });
  ```
  for the storage side

  ```javascript
storage.destroy = (schema, itemId) => {
  return fs.unlinkProm(`${__dirname}/../data/${schema}/${itemId}.json`);
};
```

# tests....

test for note-delete.test.js

```javascript
describe('DELETE /api/v1/note', function () {
  beforeAll(() => server.start(process.env.PORT, (err) => console.log(`Listening on ${process.env.PORT}`)));
  afterAll(() => server.stop());

  this.mockNote = {title: 'hello', content: 'hello world'};
  let temp;

  beforeAll(() => {
    return superagent.post(':4000/api/v1/note/')
      .send(this.mockNote)
      .then(res => {
        temp = res.body;
        this.response = res;
      })
      .then(() => {
        return superagent.delete(`:4000/api/v1/note/${temp._id}`)
          .then(res => this.resTwo = res);
      });
  });

  describe('Valid req/res', () => {
    it('should respond with a status of 201', () => {
      expect(this.resTwo.status).toBe(204);
    });
    it('should respond with a status of 201', () => {
      expect(this.resTwo.body).toEqual({});
    });
  });

  describe('Invalid req/res', () => {
    it('should return a status 404 on bad path', () => {
      return superagent.delete(':4000/api/v1/doesNotExist')
        .catch(err => {
          expect(err.status).toBe(404);
          expect(err.response.text).toMatch(/path error/i);
        });
    });
    it('should return a status 404 on bad request body', () => {
      return superagent.delete(':4000/api/v1/note')
        .send({})
        .catch(err => expect(err.status).toBe(404));
    });
  });
});
```

test for note-get.test

```javascript
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
```

test for note-post.test

```javascript
describe('POST /api/v1/note', function() {
  this.mockNote = {title: 'hello', content: 'hello world'};

  beforeAll(() => server.start(process.env.PORT, (err) => console.log(`Listening on ${process.env.PORT}`)));
  afterAll(() => server.stop());


  describe('Valid req/res', () => {
    beforeAll(() => {
      return superagent.post(':4000/api/v1/note')
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
      expect(this.response.body.title).toEqual(this.mockNote.title);
      expect(this.response.body.content).toEqual(this.mockNote.content);
    });
  });

  describe('Invalid req/res', () => {
    it('should return a status 404 on bad path', () => {
      return superagent.post(':4000/api/v1/doesNotExist')
        .send(this.mockNote)
        .catch(err => {
          expect(err.status).toBe(404);
          expect(err.response.text).toMatch(/path error/i);
        });
    });
    it('should return a status 400 on bad request body', () => {
      return superagent.post(':4000/api/v1/note')
        .send({})
        .catch(err => expect(err.status).toBe(400));
    });
  });
});
```

test for note-put.test.js
```javascript
describe('PUT /api/v1/note', function () {
  beforeAll(() => server.start(process.env.PORT, (err) => console.log(`Listening on ${process.env.PORT}`)));
  afterAll(() => server.stop());

  this.mockNote = {title: 'hello', content: 'hello world'};
  this.mockNote2 = {title: 'bye', content: 'everyone'};
  let temp;

  beforeAll(() => {
    return superagent.post(':4000/api/v1/note/')
      .send(this.mockNote)
      .then(res => {
        temp = res.body;
        this.response = res;
      })
      .then(() => {
        return superagent.put(`:4000/api/v1/note/${temp._id}`)
          .send(this.mockNote2)
          .then(res => this.resTwo = res);
      });
  });

  describe('Valid req/res', () => {
    it('should respond with a status of 204', () => {
      expect(this.resTwo.status).toBe(204);
    });
    it('should updated data should not be the orignal data.', () => {
      expect(this.response.body.title).not.toBe(/hello/);
      expect(this.response.body.content).not.toBe(/hello world/);
    });
    it('should get an item back and have these properties', () => {
      expect(this.response.body).toHaveProperty('title');
      expect(this.response.body).toHaveProperty('content');
      expect(this.response.body).toHaveProperty('_id');
    });
  });
  
  describe('invalid req/res PUT', () => {
    beforeAll(() => {
      return superagent.put(`:4000/api/v1/note`)
        .send(this.mockNote2)
        .catch(res => this.resTest = res);
    });

    it('should respond with a status of 404', () => {
      console.log(this.resTest.status);
      expect(this.resTest.status).toBe(404);
    });
  });
});
```

test for error-handler.test
```javascript
describe('error-handler', function() {
  this.validation = new Error('Validation error: Cannot create note, subject or comment missing');
  this.res = { status: function(stat){this.statusCode = stat; return this; }, send: function(msg){this.message  = msg; return this;}};

  this.enoent = new Error('enoent');
  this.path_error = new Error('path error');
  this.fail = new Error('fail');
  it('should respond with a status of 400', () => {
    let errRes = test(this.validation, this.res);
    expect(errRes.statusCode).toEqual(400);
  });
  it('should respond with a status of 404', () => {
    let errRes = test(this.enoent, this.res);
    expect(errRes.statusCode).toEqual(404);
  });
  it('should respond with a status of 404', () => {
    let errRes = test(this.path_error, this.res);
    expect(errRes.statusCode).toEqual(404);
  });
  it('should respond with a status of 500', () => {
    let errRes = test(this.fail, this.res);
    expect(errRes.statusCode).toEqual(500);
  });
});
```

test for note.test.js
```javascript
let test;
new Note('hello', 'world')
  .then(note => test = note);

describe('testing dummy', function () {
  it('Should return a valid note object when provided valid inputs', () => {
    expect(test).toBeInstanceOf(Note);
  });
  it('should post a new note with title, content, and _id', () => {
    expect(test).toHaveProperty('title');
    expect(test).toHaveProperty('content');
    expect(test).toHaveProperty('_id');
  });
  it('should respond with a title of "hello" and content of "world"', () => {
    expect(test.title).toMatch(/hello/);
    expect(test.content).toMatch(/world/);
  });
  it('should throw an error if not provided with valid input', () => {
    new Note()
      .catch(err => {
        expect(err).toContain(/Title and Content required/);
      });
  });
});
```

test storage.test.js
```javascript
let test = { title: 'hello', content: 'world', _id: 1234 };
let test1 = { title: 'big', content: 'star', _id: 4321 };

describe('stroage module', function () {
  describe('get one note', function () {
    storage.create('note', test);
    describe('create a new note', function () {
      it('should create a file and read the note folder to see if its there.', () => {
        expect(fs.readdirSync(`${__dirname}/../../data/Note`)).toContain('1234.json');
      });
    });
  });

  describe('get one note', function () {
    it('Should return a valid note object when provided valid inputs', () => {
      return storage.fetchOne('note', test._id)
        .then(data => {
          data = JSON.parse(data.toString());
          expect(data.title).toBe('hello');
        });
    });
  });

  describe('get all note', function () {
    storage.create('note', test1);
    it('should return a array of ids', () => {
      return storage.fetchAll('note')
        .then(data => {
          expect(Array.isArray(data)).toBe(true);
        });
    });
  });

  describe('to update a note', function () {
    storage.create('note', test);
    it('Should properly update the file given new information', () => {
      let fixed = JSON.stringify(test1);
      storage.update('note', test._id, fixed);
      storage.fetchOne('note', test._id)
        .then(data => {
          data = JSON.parse(data.toString());
          expect(data.title).toBe('big');
        });
    });
  });

  describe('Delete a note', function () {
    storage.create('note', test);
    it('it should delete a note with the passed id in', () => {
      return storage.destroy('note', test._id)
        .then(() => {
          expect(test).not.toContain('hello');
        });
    });
  });
});
```


