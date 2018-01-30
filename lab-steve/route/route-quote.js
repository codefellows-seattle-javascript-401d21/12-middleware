'use strict';

const Quote = require('../model/quote');
const storage = require('../lib/storage');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');

module.exports = function(router) {
  // Create a quote
  router.post('/quote', bodyParser, (req, res) => {
    new Quote(req.body.author, req.body.quote)
      .then(quote => storage.create('quote', quote))
      .then(quote => res.status(201).json(quote))
      .catch(err => errorHandler(err, res));
  });

  // Get a single quote by uuid
  router.get('/quote/:_id', (req, res) => {
    storage.fetchOne('quote', req.params._id)
      .then(buffer => buffer.toString())
      .then(json => JSON.parse(json))
      .then(quote => res.status(200).json(quote))
      .catch(err => errorHandler(err, res));
  });

  // Get all the quotes
  router.get('/quote', (req, res) => {
    storage.fetchAll('quote')
      .then(buffer => buffer.toString())
      .then(str => str.split(','))
      .then(arr => arr.map(e => e.split('.')[0]))
      .then(quotes => res.status(200).json(quotes))
      .catch(err => errorHandler(err, res));
  });

  // Update a quote
  router.put('/quote/:_id', bodyParser, (req, res) => {
    new Quote(req.body.author, req.body.quote)
      .then(quote => {
        quote._id = req.params._id;
        return quote;
      })
      .then(quote => storage.update('quote', quote._id, quote))
      .then(quote => res.status(204).json(quote))
      .catch(err => errorHandler(err, res));
  });

  // Delete a quote
  router.delete('/quote/:_id', (req, res) => {
    storage.destroy('quote', req.params._id)
      .then(() => res.status(204).send())
      .catch(err => errorHandler(err, res));
  });
};
