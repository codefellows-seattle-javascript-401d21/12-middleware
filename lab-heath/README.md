
# LAB 11: Single Resource Express API  


### Installing and How to use.

To install this program, place fork and 'git clone' this repo to your computer. From the terminal, navigate to  `lab-heath`. once there, install NPM but typing in , `nmp install` and httpie(done with home) after that you need to install uuid, express, body-parser, bluebird `npm install uuid express body-parser bluebird`. for devolper Dependencies are dotenv jest eslint do these with `npm install -D dotenv jest eslint`
you also need to have HTTPIE installed via homebrew `brew install httpie` in the terminal. this will let you do the helpful commands inside of the terminal.



next you need to have these scripts adjusted in your package.json file.

```javascript
"scripts": {
    "test": "jest -i",
    "lint": "eslint",
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
router.post('/note', bodyParser, (req, res) => {
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
router.get('/note/:_id', (req, res) => {
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
router.get('/note', (req, res) => {
    storage.fetchAll('note')
      .then(data => data.map(id => id.split('.')[0]))
      .then(note => res.status(200).json(note))
      .catch(err => errorHandler(err, res));
  });
  ```
  for the storage side

  ```javascript
storage.fetchAll = (schema) => fs.readdirProm(`${__dirname}/../data/${schema}`);
```


## function code for the PUT

```javascript
 router.put('/note/:_id', bodyParser, (req, res) => {
    new Note(req.body.title, req.body.content)
      .then(note => storage.update('note', req.params._id, note))
      .then(item => res.status(204).json(item))
      .catch(err => errorHandler(err, res));
  });
  ```
  for the storage side

  ```javascript
storage.update = (schema, itemId, item) => {
  let json = JSON.stringify(item);
  return fs.readFileProm(`${__dirname}/../data/${schema}/${itemId}.json`)
    .then(() => {
      fs.writeFileProm(`${__dirname}/../data/${schema}/${itemId}.json`, json);
    });
};
```

## function code for the DELETE

```javascript
storage.destroy = (schema, itemId) => {
  return fs.unlinkProm(`${__dirname}/../data/${schema}/${itemId}.json`);
};
  ```
  for the storage side

  ```javascript
 router.delete('/note/:_id', (req, res) => {
    storage.destroy('note', req.params._id)
      .then(() => res.status(204).end())
      .catch(err => errorHandler(err, res));
  });
```

