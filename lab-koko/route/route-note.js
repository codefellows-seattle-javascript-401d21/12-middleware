'use strict';

const Note = require('../model/story');
const storage = require('../lib/storage');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');

module.exports = function(router) {
  router.post('/story', bodyParser, (req, res) => {
    let newStory;

    new Note(req.body.book, req.body.description)
      .then(story => newStory = story)
      .then(story => JSON.stringify(story))
      .then(story => storage.create('story', newStory._id, story))
      .then(() => res.status(201).json(newStory))
      .catch(err => errorHandler(err, res));
  });

  router.get('/story/:_id', (req, res) => {
    storage.fetchOne('story', req.params._id)
      .then(buffer => buffer.toString())
      .then(schema => JSON.parse(schema))
      .then(story => res.status(200).json(story))
      .catch(err => errorHandler(err, res));
  });

  router.get('/story', (req, res) => {
    storage.fetchAll('story', req.params.item)
      .then(data => data.map(id => id.split('.')[0]))
      .then(story => res.status(200).json(story))
      .catch(err => errorHandler(err, res));
  });
 
  router.put('/story/:_id', bodyParser, (req, res) => {
    storage.fetchOne('story', req.params._id)
      .then(buffer => buffer.toString())
      .then(json => JSON.parse(json))
      .then(story => ({
        _id: req.params._id,
        book: req.body.book || story.description,
        description: req.body.description || story.description,
      }))
      .then(story => JSON.stringify(story))
      .then(json => storage.update('story', req.params._id, json))
      .then(() => res.sendStatus(204))
      .catch(err => errorHandler(err, res));
  }); 

  router.delete('/story/:_id', (req, res) => {
    storage.destroy('story', req.params._id)
      .then(() => res.sendStatus(204))
      .catch(err => errorHandler(err, res));
  });

};