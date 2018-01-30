'use strict';

const Note = require('../model/note');
const storage = require('../lib/storage');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');

module.exports = function(router) {
  router.post('/note', bodyParser, (req, res) => {
    let newNote;

    new Note(req.body.book, req.body.description)
      .then(note => newNote = note)
      .then(note => JSON.stringify(note))
      .then(note => storage.create('note', newNote._id, note))
      .then(() => res.status(201).json(newNote))
      .catch(err => errorHandler(err, res));
  });

  router.get('/note/:_id', (req, res) => {
    storage.fetchOne('note', req.params._id)
      .then(buffer => buffer.toString())
      .then(schema => JSON.parse(schema))
      .then(note => res.status(200).json(note))
      .catch(err => errorHandler(err, res));
  });

  router.get('/note', (req, res) => {
    storage.fetchAll('note', req.params.item)
      .then(data => data.map(id => id.split('.')[0]))
      .then(note => res.status(200).json(note))
      .catch(err => errorHandler(err, res));
  });
 
  router.put('/note/:_id', bodyParser, (req, res) => {
    storage.fetchOne('note', req.params._id)
      .then(buffer => buffer.toString())
      .then(json => JSON.parse(json))
      .then(note => ({
        _id: req.params._id,
        book: req.body.book || note.description,
        description: req.body.description || note.description,
      }))
      .then(note => JSON.stringify(note))
      .then(json => storage.update('note', req.params._id, json))
      .then(() => res.sendStatus(204))
      .catch(err => errorHandler(err, res));
  }); 

  router.delete('/note/:_id', (req, res) => {
    storage.destroy('note', req.params._id)
      .then(() => res.sendStatus(204))
      .catch(err => errorHandler(err, res));
  });

};