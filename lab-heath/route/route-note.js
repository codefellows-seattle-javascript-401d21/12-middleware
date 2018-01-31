'use strict';

const Note = require('../model/note');
const storage = require('../lib/storage');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');

module.exports = function(router) {
  
  router.post('/', bodyParser, (req, res) => {
    new Note(req.body.title, req.body.content)
      .then(note => storage.create('note', note))
      .then(item => res.status(201).json(item))
      .catch(err => errorHandler(err, res));
  });

  router.get('/:_id', (req, res) => {
    storage.fetchOne('note', req.params._id)
      .then(buffer => buffer.toString())
      .then(json => JSON.parse(json))
      .then(note => res.status(200).json(note))
      .catch(err => errorHandler(err, res));
  });

  router.get('/', (req, res) => {
    storage.fetchAll('note')
      .then(data => data.map(id => id.split('.')[0]))
      .then(note => res.status(200).json(note))
      .catch(err => errorHandler(err, res));
  });

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

  
  router.delete('/:_id', (req, res) => {
    storage.destroy('note', req.params._id)
      .then(() => res.sendStatus(204))
      .catch(err => errorHandler(err, res));
  });

};