'use strict';

//require in all files within library
const Note = require('../model/note.js');
const storage = require('../lib/storage.js');
const bodyParser = require('body-parser').json(); //stringifiy
const errorHandler = require('../lib/error-handler.js');

module.exports = function (router) {
  router.post('/note', bodyParser, (req, res) => { //creating pathway
    let newNote;

    new Note(req.body.title, req.body.content)
    //this is where reuquireing bodyparser comes to play
      .then(note => newNote = note)
      .then(note => JSON.stringify(note))
      .then(note => storage.create('note', newNote._id, note))
      .then(() => res.status(201).json(newNote))
      .catch(err => errorHandler(err, res)); //thjis is where requiring error handler file kicks in
  });
  router.get('/note/:_id', (req, res) => {
    storage.fetchOne('note', req.params._id)
      .then(buffer => buffer.toString())
      .then(schema => JSON.parse(schema))
      .then(note => res.status(200).json(note))
      .catch(err => errorHandler(err, res));
  });
  //router.get()
  router.put('/:_id', bodyParser, (req, res) => { //update
    storage.fetchOne('note', req.params._id)
      .then(buffer => buffer.toString())
      .then(json => JSON.parse(json))
      .then(note => ({ //creating an object literal NOT code block
        _id: req.params._id,
        title: req.body.title || note.title,
        content: req.body.content || note.content,
      }))
      .then(note => JSON.stringify(note))
      .then(json => storage.update('note', req.params._id, json))
      .then(() => res.sendStatus(204))
      .catch(err => errorHandler(err, res)); //thjis is where requiring error handler file kicks in

    //new Note(req.body.title, req.body.content) //updateing body content
    // .then(note => storage.update('note', note, req.params._id))
    // //.then(json => JSON.parse(json)) //parse it. not sure if i need this or not
    // //im not sure if this is what i want above based on the assignment clue
    // .then(item => res.status(204).json(item))
    // .catch(err => errorHandler(err, res)) //thjis is where requiring error handler file kicks in
  });
  router.delete('/note/:_id', (req, res) => {
    storage.destroy('note', req.params._id) //request paramaters by Id i think
      .then(() => res.sendStatus(204)) //try then(item => res.sendStatus(204), item)
      .catch(err => errorHandler(err, res));
  });
};