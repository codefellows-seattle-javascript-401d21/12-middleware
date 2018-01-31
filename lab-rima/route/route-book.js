'use strict';

const Book = require('../model/book');
const storage = require('../lib/storage');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');
const debug = require('debug')('http:route-book');


module.exports = function(router){

  router.get('/book/:_id', bodyParser, (req, res) => {
    storage.fetchOne('book', req.params._id)
      .then(buffer => buffer.toString())
      .then(json => JSON.parse(json))
      .then(item => res.status(200).json(item))
      .catch(err => errorHandler(err, res));
  });

  router.get('/book', (req, res) => {
    storage.fetchAll('book')
      .then(items => res.status(200).json(items))
      .catch(err => errorHandler(err, res));
  });

  router.post('/book', bodyParser, (req, res) => {
    new Book(req.body.title, req.body.author)
      .then(book => storage.create('book', book))
      .then(item => res.status(201).json(item))
      .catch(err => errorHandler(err, res));
  });

  router.put('/book/:_id', bodyParser, (req, res) => {
    storage.update('book', req.params._id, req.body)
      .then(() => res.status(204).end())
      .catch(err => errorHandler(err, res));
  });

  router.delete('/book/:_id', bodyParser, (req, res) => {
    storage.deleteOne('book', req.params._id)
      .then(() => res.status(200).end())
      .catch(err => {console.log(err.message); errorHandler(err, res)});
  });

  router.delete('/book', (req, res) => {
    storage.deleteAll('book')
      .then(() => res.status(200).end())
      .catch(err => errorHandler(err, res));
  });
};
