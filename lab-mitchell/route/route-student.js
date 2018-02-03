'use strict';

const Student = require('../model/student');
const storage = require('../lib/storage');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');
const debug = require('debug')('http:route-student');

module.exports = function(router) {

  //no need for /api/v1/note since that's been established elsewhere
  // BELOW LINE SAYS "when a request hits this enpoint, before you run our callback, pass to the bodyParser middlware"
  router.post('/', bodyParser, (req, res) => { //now getting into our endpoint and callback
    //post request so how do we get body of data or post request? BODY PARSER AYAYYAYAY
    //gotta create note, and note constructor returns promise
    //after creating note, handed off to storage module SO we have to require in storage module above
    let newStudent;

    new Student(req.body.name, req.body.city)
      //due to changes to storage.create(), must do the follow line before .then(student => ...)
      .then(student => newStudent = student) //will just return the value of student
      .then(student => JSON.stringify(student)) //stringifies since we removed that part from the .create() method
      //can also .then(student => storage.create('student', newStudent._id, student)) the json is just to remind us that the entire student item is being passed so that we do the .json(newStudent below)
      .then(json => storage.create('student', newStudent._id, json)) //return value of storage.create is JSON
      //note schema has lower case n in note, unlike last week where it was Note, b/c the directory is named note in data directory not Note
      .then(() => res.status(201).json(newStudent))
      .catch(err => errorHandler(err, res));
  });

  //don't have to worry about distinguishing whether fetchOne or fetchAll, and allows for using /:id (parameterized routes) in express and just use two different .get routes instead
  router.get('/:_id', (req, res) => {
    //whatever is :_id is added as a params on the request object such that req.params._id
    //and if added /note/:_id/something/:cat_id, both _id and cat_id would be params on req
    //no longer making GET request with querystring
    storage.fetchOne('student', req.params._id) //querystring would be req.query._id
      .then(buffer => buffer.toString()) //returns a stringified version of buffer, and that in form of key:value pairs which we know is JSON form, so we can JSON parse to get those separated in following line
      .then(json => JSON.parse(json)) //parses then reparses SO WE CAN SEND CORRECT HEADER WITH IT
      .then(student => res.status(200).json(student)) //parse it out of JSON then flip it back in reponse GO BACK TO VID FOR EXPLANATION
      .catch(err => errorHandler(err, res));
  });

  router.get('/', (req, res) => {
    debug('GET /api/v1/student');
    storage.fetchAll('student')
      .then(paths => {
        return paths.map(p => p.split('.')[0]); //removes the .json from the ids, have to return if doing multi-line in .then()'s
      }) 
      .then(ids => res.status(200).json(ids))
      .catch(err => errorHandler(err, res));
  });

  router.put('/:_id', bodyParser, (req, res) => {
    debug('PUT /api/v1/student');
    storage.fetchOne('student', req.params._id)
      .then(buffer => buffer.toString())
      .then(json => JSON.parse(json)) //to get it into a JS object
      .then(student => ({
        //the way this is structure, ||, allows for updating one or the other not both at the same time
        _id: req.params._id,
        name: req.body.name || student.name, //ensure can send complete or part thing and will update anyways with the ||
        city: req.body.city || student.city,
      })) //parens around {} in arrow function, returning object literal not creating a code block
      .then(student => JSON.stringify(student))
      .then(json => storage.update('student', req.params._id, json))
      .then(() => res.sendStatus(204))
      .catch(err => errorHandler(err, res));
  });


  router.delete('/:_id', (req, res) => {
    debug('DELETE /api/v1/student');
    storage.destroy('student', req.params._id)
      // .then(buffer => buffer.toString())
      // .then(json => JSON.parse(json)) 
      .then(() => res.sendStatus(204)) // removed .json(student)) off then end since not sending something back to client like with GET request
      .catch(err => errorHandler(err, res));
  });
};