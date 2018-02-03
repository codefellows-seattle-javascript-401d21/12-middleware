'use strict';

const Note = require('../model/note');
const storage = require('../lib/storage');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');
const debug = require('debug')('http:route-note');

module.exports = function(router) {
  router.post('/note', bodyParser, (req, res) => {
    debug('#router.post start');
    new Note(req.body.title, req.body.content)
      .then(note => storage.create('note', note))
      .then(item => res.status(201).json(item))
      .catch(err => errorHandler(err, res));
  });

  router.get('/note/:_id', (req, res) => {
    debug('#router.get get one start');
    storage.fetchOne('note', req.params._id)
      .then(buffer => buffer.toString())
      .then(json => JSON.parse(json))
      .then(note => res.status(200).json(note))
      .catch(err => errorHandler(err, res));
  });
  
  router.get('/note', (req, res) => {
    debug('#router.get get all start');
    storage.fetchAll('note')
      .then(files => res.status(200).json(files))
      .catch(err => errorHandler(err, res));
  });
 
  router.put('/note/:_id', bodyParser, (req, res) => {    
    debug('#router.put start');
    new Note(req.body.title, req.body.content)
      .then(item => {
        item._id = req.body._id;
        return item;
      })
      .then(newNote => storage.update('note', req.params._id, newNote))
      .then(() => res.sendStatus(204))
      .catch(err => errorHandler(err, res));
  });

  router.delete('/note/:_id', (req, res) => {
    debug('#router.delete start');
    storage.destroy('note', req.params._id)
      .then(() => res.sendStatus(204))
      .catch(err => errorHandler(err, res));

  });

};

// FOR TESTING PURPOSES USE THIS LINE IN TERMINAL
// http POST http://localhost:3000/api/v1/note title="HELLO" content="HELLO CRUEL WORLD"