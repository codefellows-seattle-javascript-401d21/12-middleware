'use strict';

const Note = require('../model/note');
const storage = require('../lib/storage');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');
const debug = require('debug')('http:route-note');

module.exports = function(router) {
  router.post('/note', bodyParser, (req,res) => {
    debug('router.post');
    new Note(req.body.name, req.body.data)
      .then(note => storage.create('note', note))
      .then(item => res.status(201).json(item))
      .catch(err => errorHandler(err,res));
  });
  router.get('/note/:id', (req, res) => {
    debug('router.get:id');
    storage.fetchOne('note', req.params.id)
      .then(buffer => buffer.toString())
      .then(json => JSON.parse(json))
      .then(note => res.status(200).json(note))
      .catch(err => errorHandler(err, res));
  });
  router.get('/note', (req, res) => {
    debug('router.getall');
    storage.fetchAll('note')
      .then(data => data.map(id => id.split('.')[0]))
      .then(note => res.status(200).json(note))
      .catch(err => errorHandler(err, res));
  });
  router.put('/note/:id', bodyParser, (req, res) => {
    debug('router.put');
    storage.fetchOne('note', req.params.id)
      .then(buffer => buffer.toString())
      .then(json => JSON.parse(json))
      .then(note => ({
        _id: req.params.id,
        name: req.body.name || note.name,
        data: req.body.data || note.data,
      }))
      .then(note => JSON.stringify(note))
      .then(json => storage.update('note', req.params.id, json))
      .then(() => res.sendStatus(204))
      .catch(err => errorHandler(err,res));

  });
  router.delete('/note/:id', (req, res) => {
    debug('router.delete');
    storage.destroy('note', req.params.id)
      .then(() => res.status(204).end())
      .catch(err => errorHandler(err,res));
  });
};