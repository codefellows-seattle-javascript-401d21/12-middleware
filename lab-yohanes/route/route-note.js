'use strict';

//require in all files within library
const Note = require('../model/note.js')
const storage = require('../lib/storage.js')
const bodyParser = require('body-parser').json() //stringifiy
const errorHandler = require('../lib/error-handler.js')

module.exports = function (router) {
  router.post('/note', bodyParser, (req, res) => { //creating pathway
    new Note(req.body.title, req.body.content) //this is where reuquireing bodyparser comes to play
      .then(note => storage.create('note', note))
      .then(item => res.status(201).json(item))
      .catch(err => errorHandler(err, res)) //thjis is where requiring error handler file kicks in
  })
  router.get('/note/:_id', (req, res) => {
    storage.fetchOne('note', req.params._id)
      .then(buffer => buffer.toString())
      .then(schema => JSON.parse(schema))
      .then(note => res.status(200).json(note))
      .catch(err => errorHandler(err, res));
  });
  //router.get()
  router.put('/note/:_id', bodyParser, (req, res) => { //update
    new Note(req.body.title, req.body.content) //updateing body content
      .then(note => storage.update('note', note, req.params._id))
      //.then(json => JSON.parse(json)) //parse it. not sure if i need this or not
      //im not sure if this is what i want above based on the assignment clue 
      .then(item => res.status(204).json(item))
      .catch(err => errorHandler(err, res)) //thjis is where requiring error handler file kicks in
  })
  router.delete('/note/:_id', (req, res) => {
    storage.destroy('note', req.params._id) //request paramaters by Id i think
      .then(item => res.status(204).json(item))
  })
}