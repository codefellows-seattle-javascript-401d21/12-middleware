'use strict';

const Note = require('../model/note');
const storage = require('../lib/storage');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');
const debug = require('debug')('http:route-note');

module.exports = function(router) {
    router.post('/note', bodyParser, (request, response) => {
        debug('#router.post create');

        let newNote;
        new Note(request.body.title, request.body.content)
            .then(note => newNote = note)
            .then(note => JSON.stringify(note))
            .then(json => storage.create('note', newNote._id, json))
            .then(() => response.status(201).json(newNote))
            .catch(err => errorHandler(err, response));
    });

    router.get('/note:_id', (request, response) => {
        debug('#router.get fetchOne');
        storage.fetchOne('note', request.params._id)
            .then(buffer => buffer.toString())
            .then(note => response.status(200).json(note))
            .catch(err => errorHandler(err, response));
    });

    router.get('/', (request, response) => {
        debug('#router.get fetchAll');
        storage.fetchAll('note')
            .then(paths => {
                console.log('paths', paths);
                return paths.map(p => p.split('.')[0]);
            })
            .then(ids => {
                console.log('ids', ids);
                response.status(200).json(ids);
            })
            .catch(err => errorHandler(err, response));
    });

    router.put('/:_id', bodyParser, (request, response) => {
        debug('#router.put Update');
        storage.fetchOne('note, request.params._id')
            .then(buffer => buffer.toString())
            .then(json => JSON.parse(json))
            .then(note => ({
                _id: request.params._id,
                title: request.body.title || note.title,
                content: request.body.content || note.content 
            }))
            .then(note => JSON.stringify(note))
            .then(json => storage.update('note', request.params._id, json))
            .then(() => response.sendStatus(204))
            .catch(err => errorHandler(err, response));
    });

    router.delete('/note:_id', (request, response) => {
        debug('#router.delete Delete');
        storage.delete('note', request.params._id)
            .then(() => response.sendStatus(204))
            .catch(err => errorHandler(err, response));
    });
};